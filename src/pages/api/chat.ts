import { GITHUB_TOKEN, GOOGLE_API_KEY } from "astro:env/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { type Message, streamText } from "ai";
import type { APIRoute } from "astro";

export const prerender = false;

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY,
});

interface FileDetails {
  path: string; // Ruta del archivo o carpeta
  content: string | null; // Contenido del archivo o null si es una carpeta
}

interface RepositoryDetails {
  repoTitle: string; // Título del repositorio
  repoDescription: string | null; // Descripción del repositorio (puede ser null)
  files: FileDetails[]; // Lista de archivos y carpetas
}

const cache: { [key: string]: { data: RepositoryDetails; expiresAt: number } } =
  {};
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos

// Función para verificar si el cache está disponible
function getFromCache(key: string) {
  const entry = cache[key];
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data;
  }
  return null;
}

// Función para almacenar datos en el cache
function saveToCache(key: string, data: RepositoryDetails) {
  cache[key] = {
    data,
    expiresAt: Date.now() + CACHE_DURATION_MS,
  };
}

// Función para filtrar archivos según la pregunta
function filterFilesByQuestion(
  files: FileDetails[],
  question: string
): FileDetails[] {
  // Extraer palabras clave de la pregunta
  const keywords = question
    .toLowerCase()
    .split(/\s+/) // Dividir en palabras
    .filter((word) => word.length > 2); // Ignorar palabras muy cortas

  // Filtrar archivos cuyo nombre o contenido coincida con las palabras clave
  return files.filter((file) => {
    const fileName = file.path.toLowerCase();
    const fileContent = (file.content || "").toLowerCase();
    return keywords.some(
      (keyword) => fileName.includes(keyword) || fileContent.includes(keyword)
    );
  });
}

// Handler principal
export const POST: APIRoute = async ({ request }) => {
  const json = await request.json();

  const { messages, repositoryId } = json as {
    messages: Message[];
    repositoryId: number;
  };

  try {
    const cacheKey = `repository_${repositoryId}`;
    let repositoryDetails = getFromCache(cacheKey);

    if (!repositoryDetails) {
      repositoryDetails = await fetchRepoDetailsAndFiles(repositoryId);
      if (!repositoryDetails) {
        return new Response("Repository details not found", { status: 404 });
      }
      saveToCache(cacheKey, repositoryDetails);
    }

    // Obtener la pregunta más reciente
    const userMessage =
      messages.find((msg: Message) => msg.role === "user")?.content || "";

    // Filtrar archivos basados en la pregunta
    const filteredFiles = filterFilesByQuestion(
      repositoryDetails.files,
      userMessage
    );

    // Reducir el contenido del proyecto al contexto relevante
    const filteredRepositoryDetails = {
      repoTitle: repositoryDetails.repoTitle,
      repoDescription: repositoryDetails.repoDescription,
      files: filteredFiles,
    };

    const model = google("gemini-1.5-pro-latest");

    const result = streamText({
      model,
      system: `
          Eres un asistente de IA experto en explicar y analizar códigos y proyectos alojados en GitHub. Responde de forma clara, precisa y concisa. Limita tu respuesta al contexto proporcionado y usa solo la información incluida en: ${JSON.stringify(
            filteredRepositoryDetails
          )}. No hagas suposiciones ni agregues información externa al proyecto. Mantén las respuestas dentro de 60 palabras y utiliza código entre comillas cuando sea necesario, como \`\`\`ts código \`\`\`.
`,
      messages,
      maxSteps: 5, // Numero de pasos para generar la respuesta mientras menos es mejor ya que el modelo es más pequeño
      temperature: 0.5, // Nivel de aleatoriedad en la respuesta
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(null, { status: 400 });
  }
};

// Función principal para obtener detalles del repositorio y su contenido
async function fetchRepoDetailsAndFiles(
  repositoryId: number
): Promise<RepositoryDetails> {
  try {
    // Obtener detalles básicos del repositorio
    const repoResponse = await fetch(
      `https://api.github.com/repositories/${repositoryId}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!repoResponse.ok) {
      throw new Error(
        `Error fetching repository details: ${repoResponse.statusText}`
      );
    }

    const repoDetails = await repoResponse.json();

    // Obtener árbol completo del repositorio
    const files = await fetchRepoFiles(repoDetails.full_name);

    return {
      repoTitle: repoDetails.name,
      repoDescription: repoDetails.description,
      files,
    };
  } catch (error) {
    console.error("Error fetching repository details and files:", error);
    throw error;
  }
}

// Función para obtener todos los archivos y carpetas del repositorio
async function fetchRepoFiles(repoFullName: string) {
  try {
    // Obtener el árbol del repositorio
    const treeResponse = await fetch(
      `https://api.github.com/repos/${repoFullName}/git/trees/main?recursive=1`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!treeResponse.ok) {
      throw new Error(
        `Error fetching repository tree: ${treeResponse.statusText}`
      );
    }

    const tree = await treeResponse.json();

    // Filtrar solo los archivos con extensión .ts o .tsx
    const tsFiles = tree.tree.filter((node: { type: string; path: string }) => {
      return (
        node.type === "blob" &&
        (node.path.endsWith(".ts") || node.path.endsWith(".tsx"))
      );
    });

    // Descargar contenido de cada archivo filtrado
    const files = await Promise.all(
      tsFiles.map(async (node: { path: string }) => {
        const content = await fetchFileContent(repoFullName, node.path);
        return { path: node.path, content };
      })
    );

    return files;
  } catch (error) {
    console.error("Error fetching repository files:", error);
    throw error;
  }
}

// Función para obtener el contenido de un archivo específico
async function fetchFileContent(repoFullName: string, filePath: string) {
  try {
    const fileResponse = await fetch(
      `https://api.github.com/repos/${repoFullName}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw", // Recibir contenido crudo del archivo
        },
      }
    );

    if (!fileResponse.ok) {
      throw new Error(
        `Error fetching file content (${filePath}): ${fileResponse.statusText}`
      );
    }

    return await fileResponse.text();
  } catch (error) {
    console.error(`Error fetching file content (${filePath}):`, error);
    return "Error loading file content.";
  }
}
