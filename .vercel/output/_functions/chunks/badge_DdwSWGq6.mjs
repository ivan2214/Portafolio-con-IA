import nodePath from 'node:path';
import { a as GITHUB_TOKEN } from './server_CoMbJF7L.mjs';
import fs from 'node:fs/promises';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { cva } from 'class-variance-authority';
import { c as cn } from './utils_B05Dmz_H.mjs';

const MINUTES = 1;
const CACHE_DURATION_MS = MINUTES * 60 * 1e3;
const cache = {};
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

async function assignImageToRepository(repository) {
  const nameToLowerCase = repository.name.toLowerCase();
  const pathRepository = nodePath.join(
    process.cwd(),
    "src",
    "assets",
    "repositories",
    `${nameToLowerCase}.webp`
  );
  try {
    await fs.access(pathRepository);
    repository.image = `/src/assets/repositories/${nameToLowerCase}.webp`;
  } catch (error) {
    console.log("Error al hacer coincidir la imagen del repositorio", error);
  }
  const nameWithoutHyphens = nameToLowerCase.replace(/-/g, " ");
  repository.name = nameWithoutHyphens.charAt(0).toUpperCase() + nameWithoutHyphens.slice(1).toLowerCase();
  console.log("repository", repository);
  return repository;
}
function filterRepositories(repositories) {
  return repositories.filter((repository) => {
    return !repository.name.toLowerCase().includes("wp") && !repository.name.toLowerCase().includes("labo") && !repository.name.toLowerCase().includes("programacion") && !repository.name.toLowerCase().includes("facultad") && !repository.name.toLowerCase().includes("ivan2214") && !repository.name.toLowerCase().includes("zip");
  });
}
async function fetchRepositories() {
  const cacheKey = "github_repositories";
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    console.log("Data from cache", cachedData);
    return cachedData;
  }
  try {
    const response = await fetch(
      "https://api.github.com/user/repos?order=created&sort=asc",
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      }
    );
    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }
    const repositories = await response.json();
    const updatedRepositories = await Promise.all(
      repositories.map(assignImageToRepository)
    );
    console.log("updatedRepositories", updatedRepositories);
    const filteredRepositories = filterRepositories(updatedRepositories);
    saveToCache(cacheKey, filteredRepositories);
    return filteredRepositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return null;
  }
}
async function fetchRepositoryDetails(repositoryId) {
  try {
    const response = await fetch(
      `https://api.github.com/repositories/${repositoryId}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      }
    );
    const repository = await response.json();
    const updatedRepository = await assignImageToRepository(repository);
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${updatedRepository.full_name}/readme`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.html"
        }
      }
    );
    const readme = await readmeResponse.text();
    return {
      ...updatedRepository,
      readme
    };
  } catch (error) {
    console.error("Error fetching repository details:", error);
    return null;
  }
}

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

export { Badge as B, fetchRepositoryDetails as a, fetchRepositories as f };
