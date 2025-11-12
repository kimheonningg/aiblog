import { useState, useEffect } from "react";
import type { CSSProperties } from "react";

import type { PostGenerateRequest } from "../../types/githubPostData";
import type { PromptLang, PromptTone } from "../../types/promptSettings";

import LanguageSelectBox from "../SelectBox/LanguageSelectBox";
import ToneSelectBox from "../SelectBox/ToneSelectBox";

import { fetchMyPublicRepos } from "../../utils/api/githubRepo";
import { fetchRecentCommits } from "../../utils/api/githubCommit";
import { fetchMyPullRequests } from "../../utils/api/githubPR";

interface PostFormProps {
	onSubmit: (data: PostGenerateRequest) => void;
	loading: boolean;
}

const postFormStyles: Record<string, CSSProperties> = {
	wrap: {
		display: "grid",
		gap: 14,
		padding: 16,
		border: "1px solid var(--pink-200)",
		borderRadius: 12,
		background: "var(--white)",
	},
	row: { display: "grid", gap: 6 },
	label: { fontWeight: 700, color: "var(--gray-800)" },
	select: {
		border: "1px solid var(--gray-300)",
		borderRadius: 8,
		padding: "8px 12px",
		background: "var(--white)",
	},
	selectBoxes: { display: "flex", gap: 20, marginTop: 20 },
	btn: { marginTop: 12 },
};

const PostForm = ({ onSubmit, loading }: PostFormProps) => {
	const [repos, setRepos] = useState<{ full_name: string }[]>([]);
	const [selectedRepo, setSelectedRepo] = useState(
		"boostcampwm-snu-2025/aiblog"
	);
	const [commits, setCommits] = useState<{ id: string; title: string }[]>([]);
	const [prs, setPrs] = useState<{ id: string | number; title: string }[]>([]);
	const [selectedCommit, setSelectedCommit] = useState("");
	const [selectedPR, setSelectedPR] = useState("");
	const [lang, setLang] = useState<PromptLang>("ko");
	const [tone, setTone] = useState<PromptTone>("concise");

	useEffect(() => {
		(async () => {
			try {
				const res = await fetchMyPublicRepos();
				setRepos(res.items || []);
			} catch (e) {
				console.error("Failed to fetch repos:", e);
			}
		})();
	}, []);

	useEffect(() => {
		if (!selectedRepo) return;

		(async () => {
			try {
				const commitsRes = await fetchRecentCommits(selectedRepo);
				const prsRes = await fetchMyPullRequests({
					repoFullName: selectedRepo,
					state: "all",
				});

				setCommits(commitsRes.items || []);
				setPrs(
					(prsRes.items || []).map((pr) => ({
						id: typeof pr.id === "string" ? pr.id : Number(pr.id),
						title: pr.title || pr.body || `PR #${pr.number ?? pr.id}`,
					}))
				);
			} catch (e) {
				console.error("Failed to fetch repo data:", e);
			}
		})();
	}, [selectedRepo]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const data: PostGenerateRequest = {
			repo: selectedRepo,
			commits: selectedCommit ? [selectedCommit] : [],
			prs: selectedPR ? [Number(selectedPR)] : [],
			lang,
			tone,
		};
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit} style={postFormStyles.wrap}>
			<div style={postFormStyles.row}>
				<label style={postFormStyles.label}>Select Repository</label>
				<select
					style={postFormStyles.select}
					value={selectedRepo}
					onChange={(e) => setSelectedRepo(e.target.value)}
				>
					{repos.map((repo) => (
						<option key={repo.full_name} value={repo.full_name}>
							{repo.full_name}
						</option>
					))}
				</select>
			</div>

			<div style={postFormStyles.row}>
				<label style={postFormStyles.label}>Select Commit</label>
				<select
					style={postFormStyles.select}
					value={selectedCommit}
					onChange={(e) => setSelectedCommit(e.target.value)}
					disabled={!commits.length}
				>
					<option value="">
						{commits.length ? "-- Choose commit --" : "No commits available"}
					</option>
					{commits.map((commit) => (
						<option key={commit.id} value={commit.id}>
							{commit.title || commit.id}
						</option>
					))}
				</select>
			</div>

			<div style={postFormStyles.row}>
				<label style={postFormStyles.label}>Select Pull Request</label>
				<select
					style={postFormStyles.select}
					value={selectedPR}
					onChange={(e) => setSelectedPR(e.target.value)}
					disabled={!prs.length}
				>
					<option value="">
						{prs.length ? "-- Choose PR --" : "No pull requests available"}
					</option>
					{prs.map((pr) => (
						<option key={pr.id} value={pr.id}>
							{pr.title || `PR #${pr.id}`}
						</option>
					))}
				</select>
			</div>

			<div style={postFormStyles.selectBoxes}>
				<LanguageSelectBox value={lang} onChange={setLang} />
				<ToneSelectBox value={tone} onChange={setTone} />
			</div>

			<button
				className="btn"
				type="submit"
				style={postFormStyles.btn}
				disabled={loading || !selectedRepo}
			>
				{loading ? "Generating..." : "Generate Post"}
			</button>
		</form>
	);
};

export default PostForm;
