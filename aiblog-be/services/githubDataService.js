import { listRecentCommitsRepo } from "../repositories/githubRepository.js";
import { normalizeCommitItems } from "../models/githubModels.js";

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
