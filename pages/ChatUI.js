import {
	View,
	StyleSheet,
	TextInput,
	FlatList,
	Text,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	useWindowDimensions,
	Keyboard,
	Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TreeGraph from "../components/TreeGraph";
import TreeNode from "../components/TreeNode";
import json_data1 from "../data/data4.json";
import { getTreeDiff, findDiffAndNewNodes } from "../helpers/getTreeDiff";
import { getDataFromLocal } from "../helpers/getDataFromLocal";
import { getHabits } from "../helpers/getHabits";
import {
	DELAY,
	COLORS,
	MESSAGE,
	MESSAGE_TYPES,
	ROOT_NODE_DATA,
} from "../helpers/constants";
import { API_BASE_URL } from "../config";
import TreeGraphComponent from "../components/TreeGraphComponent";
import { renderMessage } from "../components/MessageComponents";
const ChatUI = ({ navigation }) => {
	// Messages is a log of all messages sent by user and BOT
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [isAtBottom, setIsAtBottom] = useState(true);
	const [treeDiffFound, setTreeDiffFound] = useState(false);
	// const [treeGraphs, setTreeGraphs] = useState([
	// 	new TreeNode(ROOT_NODE_DATA, []),
	// ]);
	const [habits, setHabits] = useState([]);
	// treeJsonData[current, new]
	const [treeJsonData, setTreeJsonData] = useState([
		JSON.parse('{"children": [], "data": "Self-Improvement"}'),
		JSON.parse('{"children": [], "data": "Self-Improvement"}'),
	]);
	// add a init node or treeJsonData
	const [botTextData, setBotTextData] = useState("");
	const [svgurl, setSvgUrl] = useState("");
	const [newTreeNodes, setNewTreeNodes] = useState([]);

	const scrollViewRefName = useRef();

	useEffect(() => {
		console.log("INITIAL MOUNT.....");
		setHabits([]);

		AsyncStorage.getItem("firstMessage")
			.then((firstMessage) => {
				// Create a new message object with sender "user"
				const userMessage = {
					id: 1, // You can assign a unique ID
					text: firstMessage,
					sender: MESSAGE.SENDER.USER,
					timestamp: new Date().toISOString(),
					type: MESSAGE_TYPES.TEXT,
				};
				const loadMessage = {
					id: 2,
					sender: MESSAGE.SENDER.BOT, // You can set the sender as 'user'
					timestamp: new Date().toISOString(),
					type: MESSAGE_TYPES.LOAD,
				};

				// Add the user message as the first message in messages
				setMessages([userMessage, loadMessage]);

				getAIServer(userMessage);

				// INCLUDE  the tree diffs[[]]
			})
			.catch((e) => {
				console.log("no first message retrieved");
			});

		//Tree Diff function
		// const originalData = getDataFromLocal(json_data1);

		//Change treeJsonData // need to restrict if no changes
		// const currentJsonData = treeJsonData[0];
		// const newJsonData = treeJsonData[1];
		// isJsonString(currentJsonData)
		// 	? console.log("Current tree JSON:", currentJsonData)
		// 	: console.log("BAD JSON", currentJsonData);
		// isJsonString(newJsonData)
		// 	? console.log("New tree JSON:", newJsonData)
		// 	: console.log("BAD JSON", newJsonData);
		// const curParsedData = getDataFromLocal(currentJsonData); remove parsed
		// // const newParsedData = getDataFromLocal(newJsonData);
		// // const treeGraph1 = new TreeGraph(originalData);
		// const currentTreeGraph = new TreeGraph(currentJsonData);
		// const newTreeGraph = new TreeGraph(newJsonData);

		// // List of TreeNode tree diffs
		// const treeDiffs = getTreeDiff(currentTreeGraph.tree, newTreeGraph.tree);
		// console.log("diff");
		// console.log(treeDiffs.length);

		// const isTreeDifferent = treeDiffs && treeDiffs.length > 0;

		// if (isTreeDifferent) {
		// 	console.log("Setting tree graphs...");
		// 	setTreeGraphs(() => [
		// 		currentTreeGraph.tree,
		// 		newTreeGraph.tree,
		// 		...treeDiffs,
		// 	]); // setTreeGraphs to treeDiffs
		// 	setTreeDiffFound(true); // Triggers animation of Fade Tree
		// 	// setShouldBotRespond(true); // Ensures bot should respond after treeDiffFound is False
		// }
		// setTreeDiffFound(true); // Triggers animation of Fade Tree
		// createTreeGraphs();
	}, []);

	useEffect(() => {
		console.log(
			"MESSAGES WERE UPDATED.....",
			messages.length,
			messages[messages.length - 1]
		);
		messages.forEach((msg) => {
			console.log(msg);
		});
		setTimeout(() => {
			scrollToBottom();
		}, 20);
	}, [messages]); // add Botreponses as a dependency later

	useEffect(() => {
		if (botTextData !== "") sendBotResponse();
		scrollToBottom();
	}, [botTextData]);

	// useEffect(() => {
	// 	const currentJsonData = treeJsonData[0];
	// 	const newJsonData = treeJsonData[1];
	// 	isJsonString(currentJsonData)
	// 		? console.log("ReRENDER Current tree JSON:", currentJsonData)
	// 		: console.log("ReRENDER BAD JSON", currentJsonData);
	// 	isJsonString(newJsonData)
	// 		? console.log("ReRENDER New tree JSON:", newJsonData)
	// 		: console.log("ReRENDER BAD JSON", newJsonData);
	// }, [treeGraphs]);

	// This is for waiting to send the bot message based off treeDiffFound
	// useEffect(() => {
	// 	console.log("treeDiffFound has been altered to ", treeDiffFound);
	// 	console.log("shouldBotRespond ->", shouldBotRespond);
	// 	if (treeDiffFound) {
	// 		navigation.navigate("TreeDiff", {
	// 			treeGraphs: treeGraphs,
	// 			newNodes: newTreeNodes,
	// 		});
	// 		setTreeDiffFound(false);
	// 		setNewTreeNodes([]);
	// 	}
	// 	// if (!treeDiffFound && shouldBotRespond) {
	// 	// 	console.log("Starting Time ---------");
	// 	// 	// Wait for 1 second (or any other delay you prefer) before sending the bot response
	// 	// 	const timer = setTimeout(() => {
	// 	// 		setShouldBotRespond(false); // Reset the flag
	// 	// 		sendBotResponse();
	// 	// 	}, BOT_DELAY);

	// 	// 	// Cleanup the timer
	// 	// 	return () => clearTimeout(timer);
	// 	// }
	// }, [treeDiffFound, navigation]);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable
					onPress={() => {
						console.log(habits.length);
						const currentTree = new TreeGraph(treeJsonData[0]);
						const newTree = new TreeGraph(treeJsonData[1]);

						navigation.push("HabitDeckPage", {
							habits: habits,
							tree: newTree.tree,
						});
					}}
					style={styles.headerNext}
				>
					<MaterialIcon
						name={"check"}
						size={35}
						color={COLORS.ICON_COLOR}
						margin={0}
						padding={0}
					/>
				</Pressable>
			),
		});
	}, [habits]);

	const handleScroll = (event) => {
		const y = event.nativeEvent.contentOffset.y;
		const contentHeight = event.nativeEvent.contentSize.height;
		const viewHeight = event.nativeEvent.layoutMeasurement.height;
		const isAtBottomNow = y >= contentHeight - viewHeight - 50; // Threshold of 50 pixels
		setIsAtBottom(isAtBottomNow);
	};
	const isJsonString = (data) => {
		return typeof data === "object" && data !== null;
	};

	const scrollToBottom = () => {
		scrollViewRefName.current.scrollToEnd({ animated: true });
		setIsAtBottom(true);
	};

	const sendMessage = () => {
		if (currentMessage.trim() === "") {
			return; // Don't send empty messages
		}
		Keyboard.dismiss();
		const newMessage = {
			id: messages.length + 1,
			text: currentMessage,
			sender: MESSAGE.SENDER.USER, // You can set the sender as 'user'
			timestamp: new Date().toISOString(),
			type: MESSAGE_TYPES.TEXT,
		};
		const loadMessage = {
			id: messages.length + 2,
			sender: MESSAGE.SENDER.BOT, // You can set the sender as 'user'
			timestamp: new Date().toISOString(),
			type: MESSAGE_TYPES.LOAD,
		};
		setMessages((prevMessages) => [...prevMessages, newMessage, loadMessage]);
		setCurrentMessage(""); //Clears current message

		// SEND a POST to server and get a response
		// variables effected: botTextData and treeJsonData
		getAIServer(newMessage);

		//Tree Diff function
		// const originalData = getDataFromLocal(json_data1);
	};

	const getAIServer = async (messagePayload) => {
		/*
		Hitting server
		*/
		console.log(messagePayload);

		const messagePL = {
			id: messagePayload.id,
			message: messagePayload.text,
		};
		try {
			// console.log(`${API_BASE_URL}/api/conversation/start`);
			// console.log("----Sending over -----", messagePL);

			// const response = await fetch(`${API_BASE_URL}/api/conversation/start`, {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(messagePL),
			// });
			// if (!response.ok) {
			// 	console.log(response.status);
			// 	throw new Error("Network Error");
			// }
			// const data = await response.json();

			//sample timer to test loading
			const delay = (ms) => new Promise((res) => setTimeout(res, ms));
			await delay(2000);

			// data is server data
			const data = {
				tree: getDataFromLocal(json_data1),
				response: "Konichiwa",
				svgurl: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 9.0.0 (20230911.1827)
 -->
<!-- Title: tree Pages: 1 -->
<svg width="432pt" height="432pt"
 viewBox="0.00 0.00 432.00 432.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(0.696774 0.696774) rotate(0) translate(4 616)">
<title>tree</title>
<polygon fill="#2a2a2a" stroke="none" points="-4,4 -4,-616 616,-616 616,4 -4,4"/>
<!-- Develop -->
<g id="node1" class="node">
<title>Develop</title>
<ellipse fill="white" stroke="black" cx="414" cy="-576" rx="36" ry="36"/>
<text text-anchor="middle" x="414" y="-570.95"   font-size="14.00">Develop</text>
</g>
<!-- Better
Shape -->
<g id="node2" class="node">
<title>Better
Shape</title>
<ellipse fill="white" stroke="black" cx="252" cy="-468" rx="36" ry="36"/>
<text text-anchor="middle" x="252" y="-471.2"   font-size="14.00">Better</text>
<text text-anchor="middle" x="252" y="-454.7"   font-size="14.00">Shape</text>
</g>
<!-- Develop&#45;&gt;Better
Shape -->
<g id="edge1" class="edge">
<title>Develop&#45;&gt;Better
Shape</title>
<path fill="none" stroke="#b3b3b3" d="M384.29,-555.56C358.19,-538.48 320.03,-513.51 291.39,-494.77"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="293.62,-492.05 283.34,-489.51 289.79,-497.91 293.62,-492.05"/>
</g>
<!-- Work
Earlier -->
<g id="node13" class="node">
<title>Work
Earlier</title>
<ellipse fill="white" stroke="black" cx="360" cy="-468" rx="36" ry="36"/>
<text text-anchor="middle" x="360" y="-471.2"   font-size="14.00">Work</text>
<text text-anchor="middle" x="360" y="-454.7"   font-size="14.00">Earlier</text>
</g>
<!-- Develop&#45;&gt;Work
Earlier -->
<g id="edge12" class="edge">
<title>Develop&#45;&gt;Work
Earlier</title>
<path fill="none" stroke="#b3b3b3" d="M397.94,-543.48C392.71,-533.22 386.82,-521.66 381.27,-510.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="384.43,-509.25 376.77,-501.93 378.19,-512.43 384.43,-509.25"/>
</g>
<!-- Read
More -->
<g id="node14" class="node">
<title>Read
More</title>
<ellipse fill="white" stroke="black" cx="468" cy="-468" rx="36" ry="36"/>
<text text-anchor="middle" x="468" y="-471.2"   font-size="14.00">Read</text>
<text text-anchor="middle" x="468" y="-454.7"   font-size="14.00">More</text>
</g>
<!-- Develop&#45;&gt;Read
More -->
<g id="edge13" class="edge">
<title>Develop&#45;&gt;Read
More</title>
<path fill="none" stroke="#b3b3b3" d="M430.06,-543.48C435.29,-533.22 441.18,-521.66 446.73,-510.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="449.81,-512.43 451.23,-501.93 443.57,-509.25 449.81,-512.43"/>
</g>
<!-- Get
GED -->
<g id="node15" class="node">
<title>Get
GED</title>
<ellipse fill="white" stroke="black" cx="576" cy="-468" rx="36" ry="36"/>
<text text-anchor="middle" x="576" y="-471.2"   font-size="14.00">Get</text>
<text text-anchor="middle" x="576" y="-454.7"   font-size="14.00">GED</text>
</g>
<!-- Develop&#45;&gt;Get
GED -->
<g id="edge14" class="edge">
<title>Develop&#45;&gt;Get
GED</title>
<path fill="none" stroke="#b3b3b3" d="M443.71,-555.56C469.81,-538.48 507.97,-513.51 536.61,-494.77"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="538.21,-497.91 544.66,-489.51 534.38,-492.05 538.21,-497.91"/>
</g>
<!-- Bulk -->
<g id="node3" class="node">
<title>Bulk</title>
<ellipse fill="white" stroke="black" cx="198" cy="-360" rx="36" ry="36"/>
<text text-anchor="middle" x="198" y="-354.95"   font-size="14.00">Bulk</text>
</g>
<!-- Better
Shape&#45;&gt;Bulk -->
<g id="edge2" class="edge">
<title>Better
Shape&#45;&gt;Bulk</title>
<path fill="none" stroke="#b3b3b3" d="M235.94,-435.48C230.71,-425.22 224.82,-413.66 219.27,-402.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="222.43,-401.25 214.77,-393.93 216.19,-404.43 222.43,-401.25"/>
</g>
<!-- Cut -->
<g id="node12" class="node">
<title>Cut</title>
<ellipse fill="white" stroke="black" cx="306" cy="-360" rx="36" ry="36"/>
<text text-anchor="middle" x="306" y="-354.95"   font-size="14.00">Cut</text>
</g>
<!-- Better
Shape&#45;&gt;Cut -->
<g id="edge11" class="edge">
<title>Better
Shape&#45;&gt;Cut</title>
<path fill="none" stroke="#b3b3b3" d="M268.06,-435.48C273.29,-425.22 279.18,-413.66 284.73,-402.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="287.81,-404.43 289.23,-393.93 281.57,-401.25 287.81,-404.43"/>
</g>
<!-- Bulking
Diet -->
<g id="node4" class="node">
<title>Bulking
Diet</title>
<ellipse fill="white" stroke="black" cx="90" cy="-252" rx="36" ry="36"/>
<text text-anchor="middle" x="90" y="-255.2"   font-size="14.00">Bulking</text>
<text text-anchor="middle" x="90" y="-238.7"   font-size="14.00">Diet</text>
</g>
<!-- Bulk&#45;&gt;Bulking
Diet -->
<g id="edge3" class="edge">
<title>Bulk&#45;&gt;Bulking
Diet</title>
<path fill="none" stroke="#b3b3b3" d="M172.68,-334.15C158.03,-319.77 139.4,-301.49 123.54,-285.92"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="126.21,-283.63 116.62,-279.12 121.3,-288.63 126.21,-283.63"/>
</g>
<!-- Hypertroph.
Training -->
<g id="node7" class="node">
<title>Hypertroph.
Training</title>
<ellipse fill="white" stroke="black" cx="198" cy="-252" rx="36" ry="36"/>
<text text-anchor="middle" x="198" y="-255.2"   font-size="14.00">Hypertroph.</text>
<text text-anchor="middle" x="198" y="-238.7"   font-size="14.00">Training</text>
</g>
<!-- Bulk&#45;&gt;Hypertroph.
Training -->
<g id="edge6" class="edge">
<title>Bulk&#45;&gt;Hypertroph.
Training</title>
<path fill="none" stroke="#b3b3b3" d="M198,-323.7C198,-315.93 198,-307.57 198,-299.43"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="201.5,-299.66 198,-289.66 194.5,-299.66 201.5,-299.66"/>
</g>
<!-- Minimize
Injury -->
<g id="node8" class="node">
<title>Minimize
Injury</title>
<ellipse fill="white" stroke="black" cx="306" cy="-252" rx="36" ry="36"/>
<text text-anchor="middle" x="306" y="-255.2"   font-size="14.00">Minimize</text>
<text text-anchor="middle" x="306" y="-238.7"   font-size="14.00">Injury</text>
</g>
<!-- Bulk&#45;&gt;Minimize
Injury -->
<g id="edge7" class="edge">
<title>Bulk&#45;&gt;Minimize
Injury</title>
<path fill="none" stroke="#b3b3b3" d="M223.32,-334.15C237.97,-319.77 256.6,-301.49 272.46,-285.92"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="274.7,-288.63 279.38,-279.12 269.79,-283.63 274.7,-288.63"/>
</g>
<!-- Calorie
Surplus -->
<g id="node5" class="node">
<title>Calorie
Surplus</title>
<ellipse fill="white" stroke="black" cx="36" cy="-144" rx="36" ry="36"/>
<text text-anchor="middle" x="36" y="-147.2"   font-size="14.00">Calorie</text>
<text text-anchor="middle" x="36" y="-130.7"   font-size="14.00">Surplus</text>
</g>
<!-- Bulking
Diet&#45;&gt;Calorie
Surplus -->
<g id="edge4" class="edge">
<title>Bulking
Diet&#45;&gt;Calorie
Surplus</title>
<path fill="none" stroke="#b3b3b3" d="M73.94,-219.48C68.71,-209.22 62.82,-197.66 57.27,-186.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="60.43,-185.25 52.77,-177.93 54.19,-188.43 60.43,-185.25"/>
</g>
<!-- Eat
Protein -->
<g id="node6" class="node">
<title>Eat
Protein</title>
<ellipse fill="white" stroke="black" cx="144" cy="-144" rx="36" ry="36"/>
<text text-anchor="middle" x="144" y="-147.2"   font-size="14.00">Eat</text>
<text text-anchor="middle" x="144" y="-130.7"   font-size="14.00">Protein</text>
</g>
<!-- Bulking
Diet&#45;&gt;Eat
Protein -->
<g id="edge5" class="edge">
<title>Bulking
Diet&#45;&gt;Eat
Protein</title>
<path fill="none" stroke="#b3b3b3" d="M106.06,-219.48C111.29,-209.22 117.18,-197.66 122.73,-186.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="125.81,-188.43 127.23,-177.93 119.57,-185.25 125.81,-188.43"/>
</g>
<!-- Recover
Well -->
<g id="node9" class="node">
<title>Recover
Well</title>
<ellipse fill="white" stroke="black" cx="306" cy="-144" rx="36" ry="36"/>
<text text-anchor="middle" x="306" y="-147.2"   font-size="14.00">Recover</text>
<text text-anchor="middle" x="306" y="-130.7"   font-size="14.00">Well</text>
</g>
<!-- Minimize
Injury&#45;&gt;Recover
Well -->
<g id="edge8" class="edge">
<title>Minimize
Injury&#45;&gt;Recover
Well</title>
<path fill="none" stroke="#b3b3b3" d="M306,-215.7C306,-207.93 306,-199.57 306,-191.43"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="309.5,-191.66 306,-181.66 302.5,-191.66 309.5,-191.66"/>
</g>
<!-- Ice
Baths -->
<g id="node10" class="node">
<title>Ice
Baths</title>
<ellipse fill="white" stroke="black" cx="252" cy="-36" rx="36" ry="36"/>
<text text-anchor="middle" x="252" y="-39.2"   font-size="14.00">Ice</text>
<text text-anchor="middle" x="252" y="-22.7"   font-size="14.00">Baths</text>
</g>
<!-- Recover
Well&#45;&gt;Ice
Baths -->
<g id="edge9" class="edge">
<title>Recover
Well&#45;&gt;Ice
Baths</title>
<path fill="none" stroke="#b3b3b3" d="M289.94,-111.48C284.71,-101.22 278.82,-89.66 273.27,-78.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="276.43,-77.25 268.77,-69.93 270.19,-80.43 276.43,-77.25"/>
</g>
<!-- Regularly
Stretch -->
<g id="node11" class="node">
<title>Regularly
Stretch</title>
<ellipse fill="white" stroke="black" cx="360" cy="-36" rx="36" ry="36"/>
<text text-anchor="middle" x="360" y="-39.2"   font-size="14.00">Regularly</text>
<text text-anchor="middle" x="360" y="-22.7"   font-size="14.00">Stretch</text>
</g>
<!-- Recover
Well&#45;&gt;Regularly
Stretch -->
<g id="edge10" class="edge">
<title>Recover
Well&#45;&gt;Regularly
Stretch</title>
<path fill="none" stroke="#b3b3b3" d="M322.06,-111.48C327.29,-101.22 333.18,-89.66 338.73,-78.76"/>
<polygon fill="#b3b3b3" stroke="#b3b3b3" points="341.81,-80.43 343.23,-69.93 335.57,-77.25 341.81,-80.43"/>
</g>
</g>
</svg>
`,
			};

			console.log("DATA from SERVER");
			console.log(data.response);

			// currently logic not in use
			// This is for future when the data is being sent as a tree and frontend
			// determines the change
			if (data.tree) {
				console.log("TREE CHANGING");

				//Updating treeJson
				const updatedTreeJsonData = [treeJsonData[1], data.tree];
				const currentTreeGraph = new TreeGraph(updatedTreeJsonData[0]);
				const newTreeGraph = new TreeGraph(updatedTreeJsonData[1]);

				// Compute habits from newTreeGraph
				setHabits(getHabits(newTreeGraph.tree));

				// List of TreeNode tree diffs and New Nodes
				const [treeDiffs, newNodes] = findDiffAndNewNodes(
					currentTreeGraph.tree,
					newTreeGraph.tree
				);
				// const treeDiffs = getTreeDiff(currentTreeGraph.tree, newTreeGraph.tree);
				setTreeJsonData(updatedTreeJsonData);
				console.log("diff");
				console.log(treeDiffs.length);

				// test { newNodes }
				console.log("---NEW NODES----", newNodes.length);
				newNodes.forEach((data) => {
					console.log(data);
				});
				setNewTreeNodes(newNodes);

				// //setting treeGraphs for those treeDiffs if exists
				// const isTreeDifferent = treeDiffs && treeDiffs.length > 0;
				// if (isTreeDifferent) {
				// 	console.log("Setting tree graphs...");
				// 	setTreeGraphs(() => [
				// 		currentTreeGraph.tree,
				// 		newTreeGraph.tree,
				// 		...treeDiffs,
				// 	]); // setTreeGraphs to treeDiffs
				// 	setTreeDiffFound(true); // Triggers animation of Fade Tree
				// }
			} else {
				console.log("No Tree found from server");
			} // endif data.tree

			if (data.svgurl && data.response) {
				//setSvgTextData(data.svgurl);

				sendBotImage(data.svgurl, data.response);
			} else {
				console.log("No svg");

				//just response
				if (data.response) {
					// setBotTextData(data.response);
					console.log("only response");
					sendBotResponse(data.response);
				} else {
					console.error("No response text found from server");
				}
			}
		} catch (error) {
			console.error("There was a problem fetching the message:", error);
			setBotTextData(
				"There was an error with our server. Please try again at another time."
			);
		}
	};

	const sendBotImage = (svgUrl, botResponse) => {
		console.log("BOT IMAGE---------------------");

		setMessages((prevMessages) => {
			// Clone the previous messages array
			const updatedMessages = [...prevMessages];

			// Find the index of the last loading message
			const lastLoadingIndex = updatedMessages
				.map((message, index) => ({ ...message, index }))
				.filter((message) => message.type === MESSAGE_TYPES.LOAD)
				.map((message) => message.index)
				.pop();

			// Replace the loading message with the bot's response
			if (lastLoadingIndex !== undefined) {
				console.log("load found");
				updatedMessages[lastLoadingIndex] = {
					id: Date.now(),
					sender: MESSAGE.SENDER.BOT,
					timestamp: new Date().toISOString(),
					type: MESSAGE_TYPES.IMAGE,
					svgurl: svgUrl,
				};
			} else {
				// If no loading message was found, just add the bot's response
				console.log("load not found");
				updatedMessages.push({
					id: messages.length + 1,
					sender: MESSAGE.SENDER.BOT,
					timestamp: new Date().toISOString(),
					type: MESSAGE_TYPES.IMAGE,
					svgurl: svgUrl,
				});
				// setSvgUrl("");
			}

			return updatedMessages;
		});

		console.log("Response:" + messages.length);
		// setMessages((prevMessages) => [...prevMessages, imageMessage]);
		sendBotResponse(botResponse);
	};

	const sendBotResponse = (botResponse) => {
		console.log("BOT RESPONSE---------------------");

		setTimeout(() => {
			console.log("2 seconds");
			setMessages((prevMessages) => {
				// Clone the previous messages array
				const updatedMessages = [...prevMessages];

				// Find the index of the last loading message
				const lastLoadingIndex = updatedMessages
					.map((message, index) => ({ ...message, index }))
					.filter((message) => message.type === MESSAGE_TYPES.LOAD)
					.map((message) => message.index)
					.pop();

				// Replace the loading message with the bot's response
				if (lastLoadingIndex !== undefined) {
					updatedMessages[lastLoadingIndex] = {
						id: Date.now(),
						timestamp: new Date().toISOString(),
						sender: MESSAGE.SENDER.BOT,
						type: MESSAGE_TYPES.TEXT,
						text: botResponse,
					};
				} else {
					// If no loading message was found, just add the bot's response
					updatedMessages.push({
						id: messages.length + 1,
						sender: "bot",
						timestamp: new Date().toISOString(),
						type: MESSAGE_TYPES.TEXT,
						text: botResponse,
					});
					setSvgUrl("");
				}

				return updatedMessages;
			});

			// const responseMessage = {
			// 	id: messages.length + 1,
			// 	text: botResponse,
			// 	sender: "bot",
			// 	timestamp: new Date().toISOString(),
			// 	type: MESSAGE_TYPES.TEXT,
			// };
			// setBotTextData("");

			// console.log("Response:" + messages.length);
			// setMessages((prevMessages) => [...prevMessages, responseMessage]);
		}, 2000);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			keyboardVerticalOffset={100}
			behavior={Platform.OS === "ios" ? "padding" : "padding"}
			onLayout={scrollToBottom}
		>
			<FlatList
				showsVerticalScrollIndicator={true}
				ref={scrollViewRefName}
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item, index) => index.toString()}
				style={styles.messageList}
				onScroll={handleScroll}
			/>
			<View style={styles.inputContainer}>
				<View style={styles.iconDiv}>
					{!isAtBottom && (
						<TouchableOpacity style={styles.icon} onPress={scrollToBottom}>
							<AntIcon name="downcircleo" size={30} color={COLORS.ICON_COLOR} />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.inputSubContainer}>
					<TextInput
						style={styles.input}
						value={currentMessage}
						onChangeText={setCurrentMessage}
						placeholder="Type a message..."
						placeholderTextColor="gray"
						// onFocus={scrollToBottom}
					/>
					<TouchableOpacity style={styles.send} onPress={sendMessage}>
						<Ionicon
							name={"arrow-up-circle"}
							size={35}
							color={COLORS.ICON_COLOR}
						/>
					</TouchableOpacity>
				</View>
			</View>
			{/* {treeDiffFound && (
		<View style={styles.container}>
			<FlatList
				ref={this.scrollViewRefName}
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item, index) => index.toString()}
				style={styles.messageList}
				onScroll={handleScroll}
			/>
			<KeyboardAvoidingView
				keyboardVerticalOffset={100}
				behavior={Platform.OS === "ios" ? "padding" : "padding"}
				style={styles.inputContainer}
			>
				<View style={styles.iconDiv}>
					{!isAtBottom && (
						<TouchableOpacity style={styles.icon} onPress={scrollToBottom}>
							<AntIcon name="downcircleo" size={30} color="#FFFFFFAB" />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.inputSubContainer}>
					<TextInput
						style={styles.input}
						value={currentMessage}
						onChangeText={setCurrentMessage}
						placeholder="Type a message..."
						placeholderTextColor="gray"
						onTextInput={scrollToBottom}
					/>
					<TouchableOpacity style={styles.send} onPress={sendMessage}>
						<Ionicon
							name={"arrow-up-circle"}
							size={35}
							color={COLORS.ICON_COLOR}
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
			{treeDiffFound && (
				<View
					style={styles.treeDiffContainer}
					onLayout={() => {
						console.log("Length", treeGraphs.length);
						console.log("Mount: ", treeGraphs);
						console.log(treeGraphs[currentTreeIndex]);
						// console.log(treeGraphs[currentTreeIndex]);
					}}
				>
					<FadeOutComponent
						onLayout={() => {
							console.log("FADE onLayout---#", currentTreeIndex);
						}}
						key={`fadeOut-${currentTreeIndex}`}
						component={() => (
							<TreeGraphComponent
								rootNode={treeGraphs[currentTreeIndex]}
								containerWidth={windowWidth}
								containerHeight={windowHeight}
							/>
						)}
						index={currentTreeIndex}
						onFadeComplete={onFadeComplete}
					/>
				</View>
			)}
		</View>
			)} */}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: COLORS.BACKGROUND,
	},
	messageList: {
		flex: 1,
		paddingBottom: 100,
		padding: 8,
		marginVertical: 10,
		borderRadius: 8,
	},
	inputContainer: {
		marginTop: 10,
		padding: 10,
		bottom: 30,
		left: 0,
		right: 0,
		// backgroundColor: "lightyellow", //test
	},
	inputSubContainer: {
		flexDirection: "row",
	},
	input: {
		flex: 1,
		borderColor: COLORS.FEINT_LINES,
		borderWidth: 1,
		marginRight: 10,
		borderRadius: 5,
		padding: 7,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: COLORS.BACKGROUND,
		height: 40,
		color: COLORS.TEXT,
	},
	message: {
		flex: 1,
		padding: 10,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: COLORS.FEINT_LINES,
		marginBottom: 10,
	},
	iconDiv: {
		position: "relative",
		paddingBottom: 8,
	},
	icon: {
		position: "absolute",
		zIndex: 1,
		bottom: 10,
		right: "50%",
	},
	headerNext: {
		flexDirection: "row",
		alignItems: "center",
	},
	send: {
		justifyContent: "center",
	},
});

export default ChatUI;
