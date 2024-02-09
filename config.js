// config.js
const protocol = process.env.EXPO_PUBLIC_REACT_APP_API_PROTOCOL || "http";
const host = process.env.EXPO_PUBLIC_REACT_APP_API_HOST || "localhost";
const port = process.env.EXPO_PUBLIC_REACT_APP_API_PORT
	? `:${process.env.EXPO_PUBLIC_REACT_APP_API_PORT}`
	: "";

export const API_BASE_URL = `${protocol}://${host}${port}`;
