import { makeOctokit } from "../utils/octokit.js";

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

function clamp(n, min, max) {
	const x = Number(n) || min;
	return Math.max(min, Math.min(max, x));
}
