import path from "node:path";
// githubApi.ts
import { GITHUB_TOKEN } from "astro:env/server";
import type { Repository } from "@/types";
import { getFromCache, saveToCache } from "./cache";

import fs from "node:fs/promises";

async function assignImageToRepository(
	repository: Repository,
): Promise<Repository> {
	const nameToLowerCase = repository.name.toLowerCase();

	const pathRepository = path.join(
		process.cwd(),
		"src",
		"assets",
		"repositories",
		`${nameToLowerCase}.webp`,
	);

	try {
		await fs.access(pathRepository); // Verifica si el archivo existe
		repository.image = `/src/assets/repositories/${nameToLowerCase}.webp`;
	} catch (error) {
		// Si el archivo no existe, no se hace nada
	}

	const nameWithoutHyphens = nameToLowerCase.replace(/-/g, " ");
	repository.name =
		nameWithoutHyphens.charAt(0).toUpperCase() +
		nameWithoutHyphens.slice(1).toLowerCase();

	return repository;
}

function filterRepositories(repositories: Repository[]): Repository[] {
	return repositories.filter((repository) => {
		return (
			!repository.name.toLowerCase().includes("wp") &&
			!repository.name.toLowerCase().includes("labo") &&
			!repository.name.toLowerCase().includes("programacion") &&
			!repository.name.toLowerCase().includes("facultad") &&
			!repository.name.toLowerCase().includes("ivan2214") &&
			!repository.name.toLowerCase().includes("zip")
		);
	});
}

export async function fetchRepositories(): Promise<Repository[] | null> {
	const cacheKey = "github_repositories";
	const cachedData = getFromCache(cacheKey);

	if (cachedData) {
		console.log("Data from cache");
		return cachedData;
	}

	try {
		const response = await fetch(
			"https://api.github.com/user/repos?order=created&sort=asc",
			{
				headers: {
					Authorization: `token ${GITHUB_TOKEN}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(`GitHub API responded with status: ${response.status}`);
		}

		const repositories: Repository[] = await response.json();
		const updatedRepositories = await Promise.all(
			repositories.map(assignImageToRepository),
		);
		const filteredRepositories = filterRepositories(updatedRepositories);

		saveToCache(cacheKey, filteredRepositories);
		return filteredRepositories;
	} catch (error) {
		console.error("Error fetching repositories:", error);
		return null;
	}
}

export async function fetchRepositoryDetails(
	repositoryId: number,
): Promise<Repository | null> {
	try {
		const response = await fetch(
			`https://api.github.com/repositories/${repositoryId}`,
			{
				headers: {
					Authorization: `token ${GITHUB_TOKEN}`,
				},
			},
		);

		const repository: Repository = await response.json();
		const updatedRepository = await assignImageToRepository(repository);

		// Fetch README content
		const readmeResponse = await fetch(
			`https://api.github.com/repos/${updatedRepository.full_name}/readme`,
			{
				headers: {
					Authorization: `token ${GITHUB_TOKEN}`,
					Accept: "application/vnd.github.v3.html",
				},
			},
		);

		const readme = await readmeResponse.text();

		return {
			...updatedRepository,
			readme,
		};
	} catch (error) {
		console.error("Error fetching repository details:", error);
		return null;
	}
}
