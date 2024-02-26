const TREE_DELAY: Number = 15000;
const BOT_DELAY: Number = 1000;
const DELAY = {
	LOADING: 5000,
};
const COLORS = {
	ICON_COLOR: "#FFFFFFAB",
	LINE_STROKE: "#FFFFFF56",
	TREE_NODE: "#34A0D3E1",
	NEW_NODE: "#34D376E1",

	TEXT: "#FFFFFF",
	USER_TEXT: "#000000",
	FEINT_TEXT: "#b3b3b3",

	BACKGROUND: "#121212FF",
	USER_BUBBLE: "#FFFFFF",
	SURFACE: "#2A2A2A",
	SURFACE1: "#202020",
	SURFACE2: "#2E2E2E",
	SURFACE3: "#3D3D3D",
	SURFACE_30: "#595959",
	PRIMARY: "#2A2A2A",

	STAR: "#C4B000",

	FEINT_LINES: "#b3b3b3",
	BORDER: "#FFFFFF",
	TEST: "#14FF9D91",
};

const TREE_NODE = {
	HEIGHT: 40,
	WIDTH: 10,
	TEXT_COLOR: "#FFFFFF",
	SPREAD: 3, //3.5,
};

const TREE_MAP = {
	CONTENT_WIDTH: 390,
	CONTENT_HEIGHT: 600,
	// CONTENT_WIDTH: 2000,
	// CONTENT_HEIGHT: 1000,
	CONTAINER_WIDTH: 350,
	CONTAINER_HEIGHT: 500,
	LEVEL_HEIGHT: 200, //400,
};

const ROOT_NODE_DATA = "Self-Improvement";

const MESSAGE_TYPES = {
	TEXT: "text",
	IMAGE: "image",
	LOAD: "load",
};

const MESSAGE = {
	IMAGE_WIDTH: ((300 * 2) / 3) * 0.85,
	IMAGE_HEIGHT: ((300 * 2) / 3) * 0.85,
	SENDER: {
		USER: "user",
		BOT: "bot",
	},
};

export {
	TREE_DELAY,
	DELAY,
	COLORS,
	BOT_DELAY,
	TREE_NODE,
	ROOT_NODE_DATA,
	TREE_MAP,
	MESSAGE_TYPES,
	MESSAGE,
};
