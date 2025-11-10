import { ABOUTS_GENERATE_API } from "../../constants/api";
import type { AboutResponse, AboutLang, AboutTone } from "../../types/about";

export async function fetchAbout(params: {
	githubUrl: string;
	lang?: AboutLang;
	tone?: AboutTone;
}): Promise<AboutResponse> {
	const token = import.meta.env.VITE_GITHUB_TOKEN;
	if (!token || token.trim() === "") {
		throw new Error(
			"Missing GitHub token. Set VITE_GITHUB_TOKEN in your .env file."
		);
	}

	const { githubUrl, lang = "ko", tone = "concise" } = params;

	const query = new URLSearchParams({
		github: githubUrl,
		lang,
		tone,
	});

	const res = await fetch(`${ABOUTS_GENERATE_API}?${query.toString()}`, {
		headers: {
			Authorization: `Bearer ${token.trim()}`,
			Accept: "application/json",
		},
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Failed to load about: ${res.status} ${text}`);
	}

	return (await res.json()) as AboutResponse;
}
