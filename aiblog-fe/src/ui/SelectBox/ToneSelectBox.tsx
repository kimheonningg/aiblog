import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { PromptTone } from "../../types/promptSettings";

type ToneSelectBoxProps = {
	value: PromptTone;
	onChange: (v: PromptTone) => void;
};

const ToneSelectBox = ({ value, onChange }: ToneSelectBoxProps) => {
	const toneLabel = (t: PromptTone) =>
		t === "concise" ? "Concise" : t === "friendly" ? "Friendly" : "Formal";

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<FormControl size="small" sx={{ minWidth: 160 }}>
				<InputLabel id="tone-label">Tone</InputLabel>
				<Select
					labelId="tone-label"
					label="Tone"
					value={value}
					onChange={(e) => onChange(e.target.value as PromptTone)}
					renderValue={(v) => (
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>{toneLabel(v as PromptTone)}</span>
						</Box>
					)}
				>
					<MenuItem value="concise">
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>Concise</span>
						</Box>
					</MenuItem>
					<MenuItem value="friendly">
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>Friendly</span>
						</Box>
					</MenuItem>
					<MenuItem value="formal">
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>Formal</span>
						</Box>
					</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default ToneSelectBox;
