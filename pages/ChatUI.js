import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	Button,
	FlatList,
	Text,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatUI = () => {
	// Messages is a log of all messages sent by user and BOT
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");

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
					};

					// Add the bot response to messages
					setMessages((prevMessages) => [...prevMessages, botResponse]);
				}, 1000); // Simulated delay
			})
			.catch((e) => {
				console.log("no first message retrieved");
			});
	}, []);

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
		<View style={styles.container}>
			<FlatList
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item, index) => index.toString()}
				style={styles.messageList}
			/>
			<KeyboardAvoidingView
				keyboardVerticalOffset="100"
				behavior={Platform.OS === "ios" ? "padding" : "padding"}
				style={styles.inputContainer}
			>
				<TextInput
					style={styles.input}
					value={currentMessage}
					onChangeText={setCurrentMessage}
					placeholder="Type a message..."
					placeholderTextColor="gray"
				/>
				<Button title="Send" onPress={sendMessage} />
			</KeyboardAvoidingView>
		</View>
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
		padding: 8,
		marginVertical: 4,
		// maxWidth: "80%", // Limit message width
		backgroundColor: "black",
		borderRadius: 8,
	},
	inputContainer: {
		flexDirection: "row",
		padding: 10,
		bottom: 30,
	},
	input: {
		flex: 1,
		borderColor: "gray",
		borderWidth: 1,
		marginRight: 10,
		borderRadius: 5,
		padding: 10,
		paddingVertical: 8,
		paddingHorizontal: 16,
		// width: "70%",
		height: 40,
		color: "white",
	},
	message: {
		padding: 10,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "white",
		margin: 5,
	},
});

export default ChatUI;
