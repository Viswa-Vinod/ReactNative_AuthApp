import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button, Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
			apiKey: "AIzaSyAcNFIdJGyv85YHSOZzRKk3VUlD-pqr5ko",
			authDomain: "react-todo-app-c0d66.firebaseapp.com",
			databaseURL: "https://react-todo-app-c0d66.firebaseio.com",
			projectId: "react-todo-app-c0d66",
			storageBucket: "react-todo-app-c0d66.appspot.com",
			messagingSenderId: "1011041930344"
		});

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Button onPress={() => firebase.auth().signOut()}>
						Log Out
					</Button>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
		}
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
