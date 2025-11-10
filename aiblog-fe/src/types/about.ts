export interface AboutGithubSource {
	login?: string;
	name?: string;
	bio?: string;
	company?: string;
	blog?: string;
	location?: string;
	followers?: number;
	following?: number;
	public_repos?: number;
	html_url?: string;
	avatar_url?: string;
}

export interface AboutResponse {
	about: string;
	sources: {
		github?: AboutGithubSource;
	};
}

export type AboutLang = "ko" | "en";
export type AboutTone = "concise" | "friendly" | "formal";
