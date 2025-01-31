import { GITHUB_TOKEN, GOOGLE_API_KEY } from "astro:env/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { type Message, streamText } from "ai";
import type { APIRoute } from "astro";
import { encodingForModel } from "js-tiktoken";

export const prerender = false;

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY,
});

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: "http://localhost:1234/v1",
});

// Configurar el encoder para contar tokens
const encoder = encodingForModel("gpt-4");

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

// Función para filtrar archivos según la pregunta y limitar la cantidad de archivos
function filterFilesByQuestion(
  files: FileDetails[],
  question: string,
  maxFiles: number = 5
): FileDetails[] {
  const keywords = question
    .toLowerCase()
    .split(/\s+/) // Dividir en palabras
    .filter((word) => word.length > 2); // Ignorar palabras muy cortas

  // Filtrar archivos cuyo nombre o contenido coincida con las palabras clave
  const filteredFiles = files.filter((file) => {
    const fileName = file.path.toLowerCase();
    const fileContent = (file.content || "").toLowerCase();
    return keywords.some(
      (keyword) => fileName.includes(keyword) || fileContent.includes(keyword)
    );
  });

  // Limitar la cantidad de archivos
  return filteredFiles.slice(0, maxFiles);
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

    // Filtrar archivos basados en la pregunta y limitar la cantidad de archivos
    const filteredFiles = filterFilesByQuestion(
      repositoryDetails.files,
      userMessage
    );

    // Limitar el contenido de los archivos
    const limitedFiles = limitFileContent(filteredFiles);

    // Reducir el contenido del proyecto al contexto relevante
    const filteredRepositoryDetails = {
      repoTitle: repositoryDetails.repoTitle,
      repoDescription: repositoryDetails.repoDescription,
      files: limitedFiles,
    };

    const contextText = JSON.stringify(filteredRepositoryDetails);

    // Contar tokens en el contexto
    const tokens = encoder.encode(contextText).length;
    console.log(`Tokens en el contexto: ${tokens}`);

    const maxTokens = 4750 + 189; // Máximo de tokens permitidos por llamada

    if (tokens > maxTokens) {
      return new Response(
        `El contexto supera el límite de tokens (${tokens} > ${maxTokens}). Reduzca el tamaño del texto.`,
        { status: 400, statusText: "Limit exceeded" }
      );
    }

    const modelProd = google("gemini-1.5-pro-latest");
    const modelLocal = lmstudio("deepseek-r1-distill-qwen-1.5b");

    const model = import.meta.env.PROD ? modelProd : modelLocal;

    const result = streamText({
      model,
      system: `
      Eres un asistente de IA experto en explicar detalles de repositorios de GitHub.
      Tu objetivo es ayudar al usuario a entender de qué trata el repositorio.
      Responder siempre en español.
      No proporcionas información personal o sensible.
      No proporcionas información que pueda ser utilizada para hackear o dañar sistemas.
      No proporcionas código, archivos del repositorio o información sensible.
      Limítate a responder el mensaje del usuario.
      Si el usuario pregunta sobre un archivo o carpeta, proporciona una breve explicación del contenido del archivo o carpeta, pero no proporciones el contenido.
      Si el usuario pregunta sobre el repositorio en general, proporciona una descripción general del repositorio.
      Aquí está todo el contexto del repositorio:
      ${contextText}
      `,
      messages,
      maxTokens: 512,
      temperature: 0.3,
      maxRetries: 3,
    });

    return result.toDataStreamResponse({
      sendReasoning: true,
    });
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

// Función para obtener todos los archivos y carpetas del repositorio, filtrando solo los archivos deseados
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

    // Filtrar solo los archivos con las extensiones deseadas
    const allowedExtensions = [".ts", ".tsx", ".astro", ".js", ".jsx"];
    const filteredFiles = tree.tree.filter(
      (node: { type: string; path: string }) => {
        return (
          node.type === "blob" &&
          allowedExtensions.some((ext) => node.path.endsWith(ext))
        );
      }
    );

    // Descargar contenido de cada archivo filtrado
    const files = await Promise.all(
      filteredFiles.map(async (node: { path: string }) => {
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

// Función para limitar el contenido de los archivos
function limitFileContent(
  files: FileDetails[],
  maxLines: number = 100
): FileDetails[] {
  return files.map((file) => {
    if (file.content) {
      const lines = file.content.split("\n");
      const limitedContent = lines.slice(0, maxLines).join("\n");
      return { ...file, content: limitedContent };
    }
    return file;
  });
}
