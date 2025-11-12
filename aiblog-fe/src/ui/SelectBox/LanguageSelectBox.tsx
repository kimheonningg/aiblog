import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { PromptLang } from "../../types/promptSettings";

type LanguageSelectBoxProps = {
	value: PromptLang;
	onChange: (v: PromptLang) => void;
};

const LanguageSelectBox = ({ value, onChange }: LanguageSelectBoxProps) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<FormControl size="small" sx={{ minWidth: 160 }}>
				<InputLabel id="lang-label">Language</InputLabel>
				<Select
					labelId="lang-label"
					label="Language"
					value={value}
					onChange={(e) => onChange(e.target.value as PromptLang)}
					renderValue={(v) => (
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>{v === "ko" ? "Korean" : "English"}</span>
						</Box>
					)}
				>
					<MenuItem value="ko">
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>Korean</span>
						</Box>
					</MenuItem>
					<MenuItem value="en">
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>English</span>
						</Box>
					</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default LanguageSelectBox;
