import {
	listRecentCommitsRepo,
	listMyReposRepo,
} from "../repositories/githubRepository.js";
import {
	normalizeCommitItems,
	normalizeRepoItems,
} from "../models/githubModels.js";

export async function listMyReposService(params) {
	const { token, per_page, page, sort, direction } = params;

	const { repos } = await listMyReposRepo({
		token,
		per_page,
		page,
		sort,
		direction,
		visibility: "public", // public repo only
	});

	const items = normalizeRepoItems(repos);
	return { items };
}

export async function listRecentCommitsService(params) {
	const { token, owner, name, since, until, per_page, page } = params;

	const { commits, meta } = await listRecentCommitsRepo({
		token,
		owner,
		name,
		since,
		until,
		per_page,
		page,
	});

	const items = normalizeCommitItems(commits);
	return { items, meta };
}
