import { G as GOOGLE_API_KEY, a as GITHUB_TOKEN } from '../../chunks/server_CoMbJF7L.mjs';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY
});
const cache = {};
const CACHE_DURATION_MS = 5 * 60 * 1e3;
function getFromCache(key) {
  const entry = cache[key];
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data;
  }
  return null;
}
function saveToCache(key, data) {
  cache[key] = {
    data,
    expiresAt: Date.now() + CACHE_DURATION_MS
  };
}
function filterFilesByQuestion(files, question) {
  const keywords = question.toLowerCase().split(/\s+/).filter((word) => word.length > 2);
  return files.filter((file) => {
    const fileName = file.path.toLowerCase();
    const fileContent = (file.content || "").toLowerCase();
    return keywords.some(
      (keyword) => fileName.includes(keyword) || fileContent.includes(keyword)
    );
  });
}
const POST = async ({ request }) => {
  const json = await request.json();
  const { messages, repositoryId } = json;
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
    const userMessage = messages.find((msg) => msg.role === "user")?.content || "";
    const filteredFiles = filterFilesByQuestion(
      repositoryDetails.files,
      userMessage
    );
    const filteredRepositoryDetails = {
      repoTitle: repositoryDetails.repoTitle,
      repoDescription: repositoryDetails.repoDescription,
      files: filteredFiles
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
      maxSteps: 5,
      // Numero de pasos para generar la respuesta mientras menos es mejor ya que el modelo es más pequeño
      temperature: 0.5
      // Nivel de aleatoriedad en la respuesta
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(null, { status: 400 });
  }
};
async function fetchRepoDetailsAndFiles(repositoryId) {
  try {
    const repoResponse = await fetch(
      `https://api.github.com/repositories/${repositoryId}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      }
    );
    if (!repoResponse.ok) {
      throw new Error(
        `Error fetching repository details: ${repoResponse.statusText}`
      );
    }
    const repoDetails = await repoResponse.json();
    const files = await fetchRepoFiles(repoDetails.full_name);
    return {
      repoTitle: repoDetails.name,
      repoDescription: repoDetails.description,
      files
    };
  } catch (error) {
    console.error("Error fetching repository details and files:", error);
    throw error;
  }
}
async function fetchRepoFiles(repoFullName) {
  try {
    const treeResponse = await fetch(
      `https://api.github.com/repos/${repoFullName}/git/trees/main?recursive=1`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      }
    );
    if (!treeResponse.ok) {
      throw new Error(
        `Error fetching repository tree: ${treeResponse.statusText}`
      );
    }
    const tree = await treeResponse.json();
    const tsFiles = tree.tree.filter((node) => {
      return node.type === "blob" && (node.path.endsWith(".ts") || node.path.endsWith(".tsx"));
    });
    const files = await Promise.all(
      tsFiles.map(async (node) => {
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
async function fetchFileContent(repoFullName, filePath) {
  try {
    const fileResponse = await fetch(
      `https://api.github.com/repos/${repoFullName}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw"
          // Recibir contenido crudo del archivo
        }
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
