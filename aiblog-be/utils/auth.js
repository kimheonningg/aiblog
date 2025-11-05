export function getBearerToken(req) {
	const header = req.header("authorization") || req.header("Authorization");
	if (!header || !header.startsWith("Bearer ")) {
		const err = new Error("Missing Authorization: Bearer <token> header");
		err.status = 401;
		throw err;
	}
	const token = header.slice("Bearer ".length).trim();
	if (!token) {
		const err = new Error("Empty Bearer token");
		err.status = 401;
		throw err;
	}
	return token;
}
