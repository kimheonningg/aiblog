export function validateRecentCommitsQuery(query) {
	const out = {
		repo: String(query.repo || "").trim(),
		since: query.since ? new Date(query.since).toISOString() : undefined,
		until: query.until ? new Date(query.until).toISOString() : undefined,
		per_page: query.per_page ? Number(query.per_page) : 20,
		page: query.page ? Number(query.page) : 1,
	};

	if (!out.repo || !out.repo.includes("/")) {
		const err = new Error('Invalid query: repo must be "owner/name"');
		err.status = 400;
		throw err;
	}
	if (Number.isNaN(out.per_page) || out.per_page < 1) out.per_page = 20;
	if (Number.isNaN(out.page) || out.page < 1) out.page = 1;

	if (query.since && Number.isNaN(Date.parse(query.since))) {
		const err = new Error("Invalid query: since must be ISO date string");
		err.status = 400;
		throw err;
	}
	if (query.until && Number.isNaN(Date.parse(query.until))) {
		const err = new Error("Invalid query: until must be ISO date string");
		err.status = 400;
		throw err;
	}

	return out;
}

export function normalizeCommitItems(commits) {
	return (commits || []).map((c) => {
		const sha = c.sha;
		const commit = c.commit || {};
		const author = commit.author || {};
		const message = String(commit.message || "");
		const [title, ...rest] = message.split("\n");
		const body = rest.join("\n").trim();

		return {
			id: sha,
			type: "commit",
			title: title || "(no message)",
			body: body || undefined,
			html_url: c.html_url,
			time: author.date || c.committer?.date || commit?.committer?.date || null,
			stats: undefined,
			author: {
				name: author.name || c.author?.login || undefined,
				avatar_url: c.author?.avatar_url || undefined,
			},
		};
	});
}
