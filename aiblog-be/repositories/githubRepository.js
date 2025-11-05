import { makeOctokit } from "../utils/octokit.js";
import { clamp } from "../utils/clamp.js";

export async function listMyReposRepo({
	token,
	per_page = 30,
	page = 1,
	sort = "updated",
	direction = "desc",
	visibility = "public", // public repo only
}) {
	const octokit = makeOctokit(token);

	const res = await octokit.repos.listForAuthenticatedUser({
		per_page: clamp(per_page, 1, 100),
		page,
		sort,
		direction,
		visibility: "public", // public repo only
	});

	return { repos: res.data ?? [] };
}

export async function listRecentCommitsRepo({
	token,
	owner,
	name,
	since,
	until,
	per_page = 20,
	page = 1,
}) {
	const octokit = makeOctokit(token);

	const res = await octokit.repos.listCommits({
		owner,
		repo: name,
		since, // ISO 8601 (optional)
		until, // ISO 8601 (optional)
		per_page: clamp(per_page, 1, 100),
		page,
	});

	// rate limit info
	const rateLimit = res.headers || {};
	const meta = {
		remaining: Number(rateLimit["x-ratelimit-remaining"]),
		limit: Number(rateLimit["x-ratelimit-limit"]),
		reset: Number(rateLimit["x-ratelimit-reset"]),
	};

	return { commits: res.data ?? [], meta };
}
