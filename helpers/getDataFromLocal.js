export const getDataFromLocal = (json_data) => {
	let parsedData;
	try {
		// parsedData = JSON.parse(JSON.stringify(json_data));
		parsedData = json_data;
		console.log(parsedData.parameters);
	} catch (e) {
		console.error("Error parsing JSON:", e);
	}
	return parsedData;
};
