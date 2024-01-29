import { useEffect, useRef, useState, useCallback } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	Button,
	FlatList,
	Text,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FadeOutComponent from "../components/FadeOutComponent";
import TreeGraphComponent from "../components/TreeGraphComponent";

const ChatUI = () => {
	// Messages is a log of all messages sent by user and BOT
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [isAtBottom, setIsAtBottom] = useState(true);
	const [treeDiffFound, setTreeDiffFound] = useState(false);

	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;

	this.scrollViewRefName = useRef();

	useEffect(() => {
		AsyncStorage.getItem("firstMessage")
			.then((firstMessage) => {
				// Create a new message object with sender "user"
				const userMessage = {
					id: 1, // You can assign a unique ID
					text: firstMessage,
					sender: "user",
				};

				// Add the user message as the first message in messages
				setMessages([userMessage]);

				// Simulate a bot response after a delay
				setTimeout(() => {
					const botResponse = {
						id: 2, // You can assign a unique ID
						text: "Bot response", // Replace with your desired bot response
						sender: "bot",
					}; //ALTER TO BOT

					// Add the bot response to messages
					setMessages((prevMessages) => [...prevMessages, botResponse]);
				}, 1000); // Simulated delay
			})
			.catch((e) => {
				console.log("no first message retrieved");
			});

		// JSON parsedData

		let parsedData;
		try {
			parsedData = JSON.parse(JSON.stringify(json_data));
			console.log(parsedData.parameters);
		} catch (e) {
			console.error("Error parsing JSON:", e);
		}
		const treeGraph = new TreeGraph(parsedData);
	}, []);

	useEffect(() => {
		scrollViewRefName.current.scrollToEnd({ animated: true });
	}, [currentMessage]); // add Botreponses as a dependency later

	useEffect(() => {
		if (treeDiffFound) {
			// // Start the animation
			// Animated.timing(fadeAnim, {
			// 	toValue: 1,
			// 	duration: 500,
			// 	useNativeDriver: true,
			// }).start(() => {
			// After the animation ends, hide the image and reset
			setTimeout(() => setTreeDiffFound(false), 4000);
			// });
		}
	}, [treeDiffFound]);

	const handleScroll = (event) => {
		const y = event.nativeEvent.contentOffset.y;
		const contentHeight = event.nativeEvent.contentSize.height;
		const viewHeight = event.nativeEvent.layoutMeasurement.height;
		const isAtBottomNow = y >= contentHeight - viewHeight - 50; // Threshold of 50 pixels
		setIsAtBottom(isAtBottomNow);
	};

	const scrollToBottom = () => {
		scrollViewRefName.current.scrollToEnd({ animated: true });
		setIsAtBottom(true);
	};

	const sendMessage = () => {
		if (currentMessage.trim() === "") {
			return; // Don't send empty messages
		}
		const newMessage = {
			id: messages.length + 1,
			text: currentMessage,
			sender: "user", // You can set the sender as 'user'
			timestamp: new Date().toISOString(),
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);

		if (currentMessage.toLowerCase().includes("poke")) {
			setTreeDiffFound(true);
		}
		setCurrentMessage("");

		// Simulate a BOT AI response (replace with actual logic for responses)
		setTimeout(() => {
			const responseMessage = {
				id: messages.length + 2,
				text: "respo",
				sender: "bot", // You can set the sender as 'bot'
				timestamp: new Date().toISOString(),
			};
			console.log("Response:" + messages.length);
			setMessages((prevMessages) => [...prevMessages, responseMessage]);
		}, 1000); // Simulated delay for response
	};

	const renderMessage = ({ item }) => (
		<View
			style={[
				styles.message,
				{
					alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
					backgroundColor: item.sender === "user" ? "#FFF" : "#000",
				},
			]}
		>
			<Text style={{ color: item.sender === "user" ? "#000" : "#FFF" }}>
				{item.text}
			</Text>
		</View>
	);

	return (
		<KeyboardAvoidingView style={styles.container}>
			<FlatList
				ref={this.scrollViewRefName}
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item, index) => index.toString()}
				style={styles.messageList}
				onScroll={handleScroll}
			/>
			<KeyboardAvoidingView
				keyboardVerticalOffset="100"
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
					/>
					<TouchableOpacity style={styles.send} onPress={sendMessage}>
						<Ionicon name={"arrow-up-circle"} size={35} color="#FFFFFFAB" />
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
			{treeDiffFound && (
				<FadeOutComponent
					component={() => (
						<TreeGraphComponent
							rootNode={treeGraph.tree}
							containerWidth={windowWidth}
							containerHeight={windowHeight}
						/>
					)}
				/>
			)}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "black",
	},
	messageList: {
		flex: 1,
		paddingBottom: 100,
		padding: 8,
		marginVertical: 10,
		// maxWidth: "80%", // Limit message width
		backgroundColor: "light blue",
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
		borderColor: "gray",
		borderWidth: 1,
		marginRight: 10,
		borderRadius: 5,
		padding: 7,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "black",
		height: 40,
		color: "white",
	},
	message: {
		flex: 1,
		padding: 10,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: "white",
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
