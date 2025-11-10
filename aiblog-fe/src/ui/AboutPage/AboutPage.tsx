import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { MY_GITHUB_URL } from "../../constants/url";

import type { AboutResponse, AboutLang, AboutTone } from "../../types/about";
import { fetchAbout } from "../../utils/api/about";

import AboutCard from "./AboutCard";

const aboutPageStyles: {
	wrap: CSSProperties;
	form: CSSProperties;
	row: CSSProperties;
	label: CSSProperties;
	input: CSSProperties;
	select: CSSProperties;
	btnRow: CSSProperties;
	error: CSSProperties;
	loading: CSSProperties;
} = {
	wrap: { display: "grid", gap: 16 },
	form: {
		display: "grid",
		gap: 10,
		padding: 16,
		border: "1px solid var(--pink-200)",
		borderRadius: 12,
		background: "var(--white)",
	},
	row: { display: "grid", gap: 6 },
	label: { fontWeight: 700, color: "var(--gray-800)", marginLeft: "8px" },
	input: {
		border: "1px solid var(--gray-300)",
		borderRadius: 8,
		padding: "10px 12px",
		outline: "none",
	},
	select: {
		border: "1px solid var(--gray-300)",
		borderRadius: 8,
		padding: "10px 12px",
		outline: "none",
		maxWidth: 220,
	},
	btnRow: { display: "flex", gap: 8, alignItems: "center" },
	error: {
		padding: 12,
		borderRadius: 10,
		border: "1px solid var(--pink-300)",
		background: "var(--pink-50)",
		color: "var(--pink-800)",
	},
	loading: { padding: 12, color: "var(--gray-700)" },
};

const AboutPage = () => {
	const githubUrl = MY_GITHUB_URL;
	const [lang, setLang] = useState<AboutLang>("ko");
	const [tone, setTone] = useState<AboutTone>("concise");

	const [data, setData] = useState<AboutResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const canSubmit = useMemo(() => githubUrl.trim().length > 0, [githubUrl]);

	async function handleGenerate() {
		if (!canSubmit) return;
		setLoading(true);
		setError(null);
		try {
			const res = await fetchAbout({ githubUrl, lang, tone });
			setData(res);
		} catch (e: any) {
			setError(e?.message ?? "Failed to generate about");
			setData(null);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div style={aboutPageStyles.wrap}>
			{error && (
				<div className="card" style={aboutPageStyles.error}>
					{error}
				</div>
			)}
			{loading && !error && (
				<div className="card" style={aboutPageStyles.loading}>
					Loading...
				</div>
			)}
			{!loading && !error && data && <AboutCard data={data} />}
			<div className="card" style={aboutPageStyles.form}>
				<div style={aboutPageStyles.row}>
					<label style={aboutPageStyles.label}>Make New Bio:</label>
					<input
						style={aboutPageStyles.input}
						value={githubUrl}
						disabled={true}
					/>
				</div>

				<div style={aboutPageStyles.btnRow}>
					<div style={{ display: "flex", gap: 8 }}>
						<select
							value={lang}
							onChange={(e) => setLang(e.target.value as any)}
							style={aboutPageStyles.select}
						>
							<option value="ko">Korean</option>
							<option value="en">English</option>
						</select>
						<select
							value={tone}
							onChange={(e) => setTone(e.target.value as any)}
							style={aboutPageStyles.select}
						>
							<option value="concise">Concise</option>
							<option value="friendly">Friendly</option>
							<option value="formal">Formal</option>
						</select>
					</div>

					<button
						className="btn"
						onClick={handleGenerate}
						disabled={!canSubmit || loading}
					>
						{loading ? "Generating..." : "Generate Bio"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
