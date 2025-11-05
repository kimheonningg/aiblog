import { listRecentCommitsService } from "../services/githubDataService.js";
import { validateRecentCommitsQuery } from "../models/githubModels.js";
import { getBearerToken } from "../utils/auth.js";

export async function getRecentCommits(req, res, next) {
	try {
		const token = getBearerToken(req);
		const query = validateRecentCommitsQuery({
			repo: req.query.repo,
			since: req.query.since,
			until: req.query.until,
			per_page: req.query.per_page,
			page: req.query.page,
		});

		const [owner, name] = query.repo.split("/");

		const result = await listRecentCommitsService({
			token,
			owner,
			name,
			since: query.since,
			until: query.until,
			per_page: query.per_page,
			page: query.page,
		});

		if (result.meta) {
			const { remaining, limit, reset } = result.meta;
			if (remaining != null)
				res.set("x-ratelimit-remaining", String(remaining));
			if (limit != null) res.set("x-ratelimit-limit", String(limit));
			if (reset != null) res.set("x-ratelimit-reset", String(reset));
		}

		res.json({ items: result.items });
	} catch (err) {
		next(err);
	}
}
