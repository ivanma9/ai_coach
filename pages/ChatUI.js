import { useEffect, useRef, useState, useNavigation } from "react";
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
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TreeGraph from "../components/TreeGraph";
import TreeNode from "../components/TreeNode";
import json_data1 from "../data/data4.json";
import { getTreeDiff, findDiffAndNewNodes } from "../helpers/getTreeDiff";
import { getDataFromLocal } from "../helpers/getDataFromLocal";
import { getHabits } from "../helpers/getHabits";
import { COLORS, ROOT_NODE_DATA } from "../helpers/constants";
import { API_BASE_URL } from "../config";

const ChatUI = ({ navigation }) => {
	// Messages is a log of all messages sent by user and BOT
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [isAtBottom, setIsAtBottom] = useState(true);
	const [treeDiffFound, setTreeDiffFound] = useState(false);
	const [treeGraphs, setTreeGraphs] = useState([
		new TreeNode(ROOT_NODE_DATA, []),
	]);
	const [habits, setHabits] = useState([]);
	const [shouldBotRespond, setShouldBotRespond] = useState(false);
	// treeJsonData[current, new]
	const [treeJsonData, setTreeJsonData] = useState([
		JSON.parse('{"children": [], "data": "Self-Improvement"}'),
		JSON.parse('{"children": [], "data": "Self-Improvement"}'),
	]);
	// add a init node or treeJsonData
	const [botTextData, setBotTextData] = useState("");
	const [newTreeNodes, setNewTreeNodes] = useState([]);

	this.scrollViewRefName = useRef();

	useEffect(() => {
		console.log("INITIAL MOUNT.....");
		setHabits([]);

		AsyncStorage.getItem("firstMessage")
			.then((firstMessage) => {
				// Create a new message object with sender "user"
				const userMessage = {
					id: 1, // You can assign a unique ID
					text: firstMessage,
					sender: "user",
					timestamp: new Date().toISOString(),
				};

				// Add the user message as the first message in messages
				setMessages([userMessage]);

				//TODO: SEND a POST to server
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
		if (!isAtBottom) scrollToBottom();
	}, [messages]); // add Botreponses as a dependency later

	useEffect(() => {
		if (botTextData !== "") sendBotResponse();
		scrollToBottom();
	}, [botTextData]);

	useEffect(() => {
		const currentJsonData = treeJsonData[0];
		const newJsonData = treeJsonData[1];
		isJsonString(currentJsonData)
			? console.log("ReRENDER Current tree JSON:", currentJsonData)
			: console.log("ReRENDER BAD JSON", currentJsonData);
		isJsonString(newJsonData)
			? console.log("ReRENDER New tree JSON:", newJsonData)
			: console.log("ReRENDER BAD JSON", newJsonData);
	}, [treeGraphs]);

	// This is for waiting to send the bot message
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
				<TouchableOpacity
					onPress={() => {
						console.log(habits.length);
						const currentTree = new TreeGraph(treeJsonData[0]);

						navigation.push("HabitDeckPage", {
							habits: habits,
							tree: currentTree.tree,
						});
					}}
				>
					<Text style={{ color: COLORS.TEXT }}>Next</Text>
				</TouchableOpacity>
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
		scrollViewRefName.current.scrollToEnd();
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
			sender: "user", // You can set the sender as 'user'
			timestamp: new Date().toISOString(),
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setCurrentMessage(""); //Clears current message

		// SEND a POST to server and get a response
		// variables effected: botTextData and treeJsonData
		getAIServer(newMessage);

		//Tree Diff function
		// const originalData = getDataFromLocal(json_data1);
	};

	const getAIServer = async (messagePayload) => {
		const messagePL = {
			id: messagePayload.id,
			message: messagePayload.text,
		};
		try {
			console.log(`${API_BASE_URL}/api/conversation/start`);
			console.log("----Sending over -----", messagePL.id, messagePL.message);
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

			const data = {
				tree: getDataFromLocal(json_data1),
				response: "Konichiwa",
			};

			console.log("DATA from SERVER");
			console.log(data.response);
			console.log(JSON.stringify(data.tree));
			if (data.tree) {
				console.log("TREE CHANGING");

				const updatedTreeJsonData = [treeJsonData[1], data.tree];
				const currentTreeGraph = new TreeGraph(updatedTreeJsonData[0]);
				const newTreeGraph = new TreeGraph(updatedTreeJsonData[1]);

				// Compute habits from newTreeGraph
				setHabits(getHabits(newTreeGraph.tree));

				// List of TreeNode tree diffs
				const [treeDiffs, newNodes] = findDiffAndNewNodes(
					currentTreeGraph.tree,
					newTreeGraph.tree
				);

				console.log("---NEW NODES----", newNodes.length);
				newNodes.forEach((data) => {
					console.log(data);
				});

				setNewTreeNodes(newNodes);

				// const treeDiffs = getTreeDiff(currentTreeGraph.tree, newTreeGraph.tree);
				setTreeJsonData(updatedTreeJsonData);

				console.log("diff");
				console.log(treeDiffs.length);

				const isTreeDifferent = treeDiffs && treeDiffs.length > 0;

				if (isTreeDifferent) {
					console.log("Setting tree graphs...");
					setTreeGraphs(() => [
						currentTreeGraph.tree,
						newTreeGraph.tree,
						...treeDiffs,
					]); // setTreeGraphs to treeDiffs
					setTreeDiffFound(true); // Triggers animation of Fade Tree
					// setShouldBotRespond(true); // Ensures bot should respond after treeDiffFound is False
				}
			} else {
				console.error("No Tree found from server");
			}
			if (data.response) setBotTextData(data.response);
			else {
				console.error("No response text found from server");
			}
		} catch (error) {
			console.error("There was a problem fetching the message:", error);
			setBotTextData(
				"There was an error with our server. Please try again at another time."
			);
		}
	};

	const sendBotResponse = () => {
		// Simulate a BOT AI response (replace with actual logic for responses)
		// TODO: Add AIBOT response
		console.log("BOT RESPONSE---------------------");

		const responseMessage = {
			id: messages.length + 1,
			text: botTextData,
			sender: "bot", // You can set the sender as 'bot'
			timestamp: new Date().toISOString(),
		};
		console.log("Response:" + messages.length);
		setMessages((prevMessages) => [...prevMessages, responseMessage]);
	};

	const renderMessage = ({ item }) => (
		<View
			style={[
				styles.message,
				{
					alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
					backgroundColor:
						item.sender === "user" ? COLORS.USER_BUBBLE : COLORS.SURFACE,
				},
			]}
		>
			<Text
				style={{
					color: item.sender === "user" ? COLORS.USER_TEXT : COLORS.TEXT,
				}}
			>
				{item.text}
			</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				showsVerticalScrollIndicator={true}
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
		</View>
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
	send: {
		justifyContent: "center",
	},
});

export default ChatUI;
