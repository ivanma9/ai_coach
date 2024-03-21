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
	const [isInputDisabled, setIsInputDisabled] = useState(false);

	const [isAtBottom, setIsAtBottom] = useState(true);
	const [treeDiffFound, setTreeDiffFound] = useState(false);
	const [conversationId, setConversationId] = useState("-1");
	const [habits, setHabits] = useState([]);
	// treeJsonData[current, new]
	const [treeJsonData, setTreeJsonData] = useState([
		JSON.parse(
			'{"children": [], "data": "Self-Improvement", "data_short": "Self-Improvement"}'
		),
		JSON.parse(
			'{"children": [], "data": "Self-Improvement", "data_short": "Self-Improvement"}'
		),
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
				const firstBotMessage = {
					id: 1, // You can assign a unique ID
					text: "Who do you want to be?",
					sender: MESSAGE.SENDER.BOT,
					timestamp: new Date().toISOString(),
					type: MESSAGE_TYPES.TEXT,
				};

				// const userMessage = {
				// 	id: 2, // You can assign a unique ID
				// 	text: firstMessage,
				// 	sender: MESSAGE.SENDER.USER,
				// 	timestamp: new Date().toISOString(),
				// 	type: MESSAGE_TYPES.TEXT,
				// };
				// const loadMessage = {
				// 	id: 3,
				// 	sender: MESSAGE.SENDER.BOT, // You can set the sender as 'user'
				// 	timestamp: new Date().toISOString(),
				// 	type: MESSAGE_TYPES.LOAD,
				// };

				// Add the user message as the first message in messages
				setMessages([firstBotMessage]);
			})
			.catch((e) => {
				console.log("no first message retrieved");
			});
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				scrollToBottom();
			}
		);

		return () => {
			keyboardDidShowListener.remove();
		};
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

	const sendMessage = async () => {
		setIsInputDisabled(true);
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
		await getAIServer(newMessage);
	};

	const getAIServer = async (messagePayload) => {
		/*
		Hitting server
		*/
		console.log(messagePayload);
		console.log(conversationId);

		const messagePL = {
			user_id: 101,
			conversation_id: conversationId,
			// id: messagePayload.id,
			message: messagePayload.text,
		};
		try {
			console.log(`${API_BASE_URL}/api/conversation/start/modular_with_db`);
			console.log("----Sending over -----", messagePL);

			const response = await fetch(
				`${API_BASE_URL}/api/conversation/start/modular_with_db`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(messagePL),
				}
			);
			if (!response.ok) {
				console.log(response.status);
				throw new Error("Network Error");
			}
			const data = await response.json();

			//sample timer to test loading
			// const delay = (ms) => new Promise((res) => setTimeout(res, ms));
			// await delay(2000);

			// 			// data is server data
			// 			const data = {
			// 				tree: getDataFromLocal(json_data1),
			// 				response: "Konichiwa",
			// 				tree_svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>}

			console.log("DATA from SERVER");
			console.log(data);
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

				// Compute habits from newTreeGraph and the set new trees
				setTreeJsonData(updatedTreeJsonData);
				setHabits(getHabits(newTreeGraph.tree));

				// List of TreeNode tree diffs and New Nodes
				const [treeDiffs, newNodes] = findDiffAndNewNodes(
					currentTreeGraph.tree,
					newTreeGraph.tree
				);
				console.log("diff");
				console.log(treeDiffs.length);

				// test { newNodes }
				console.log("---NEW NODES----", newNodes.length);
				newNodes.forEach((data) => {
					console.log(data);
				});
				setNewTreeNodes(newNodes);
			} else {
				console.log("No Tree found from server");
			} // endif data.tree

			if (data.tree_svg && data.response) {
				//setSvgTextData(data.tree_svg);

				sendBotImage(data.tree_svg, data.response);
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
			if (data.conversation_id) {
				setConversationId(data.conversation_id);
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
			console.log(lastLoadingIndex);
			if (lastLoadingIndex !== undefined) {
				console.log(svgUrl);
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
		setIsInputDisabled(false);
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
			setIsInputDisabled(false);

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
						editable={!isInputDisabled}
					/>
					<TouchableOpacity
						style={styles.send}
						onPress={sendMessage}
						disabled={isInputDisabled}
					>
						<Ionicon
							name={"arrow-up-circle"}
							size={35}
							color={COLORS.ICON_COLOR}
						/>
					</TouchableOpacity>
				</View>
			</View>
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
