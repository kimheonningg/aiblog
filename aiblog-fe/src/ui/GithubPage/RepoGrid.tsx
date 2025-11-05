import type { CSSProperties } from "react";
import type { RepoItem } from "../../types/githubData";
import RepoCard from "./RepoCard";

interface RepoGridProps {
	repos: RepoItem[];
}

const repoGridStyles: {
	empty: CSSProperties;
	grid: CSSProperties;
} = {
	empty: {
		padding: 24,
		textAlign: "center",
		color: "var(--gray-700)",
	},
	grid: {
		display: "flex",
		flexDirection: "column",
		gap: 12,
	},
};

const RepoGrid = ({ repos }: RepoGridProps) => {
	if (!repos?.length) {
		return (
			<div className="card" style={repoGridStyles.empty}>
				공개 레포지토리가 없습니다.
			</div>
		);
	}

	return (
		<div style={repoGridStyles.grid}>
			{repos.map((r) => (
				<RepoCard key={r.id} repo={r} />
			))}
		</div>
	);
};

export default RepoGrid;
