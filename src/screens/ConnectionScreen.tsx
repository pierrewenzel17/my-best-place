import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { auth } from '../../firebase';

function ConnectionScreen(): JSX.Element {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	function handleSignUp(): void {
		auth()
			.createUserWithEmailEmailAndPassword(email, password)
			.then((userCredentials) => {
				const { user } = userCredentials;
				console.info(user.email);
			})
			.catch((error: Error): void => console.error(error.message));
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior='padding'>
			<Text>My Best Place</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder='Email'
					value={email}
					onChangeText={(text: string): void => setEmail(text)}
					style={styles.input}
				/>
				<TextInput
					placeholder='Mot de passe'
					value={password}
					onChangeText={(text: string): void => setPassword(text)}
					style={styles.input}
					secureTextEntry
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={(): void => {}} style={styles.button}>
					<Text style={styles.buttonText}>Connexion</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={(): void => {
						handleSignUp();
					}}
					style={[styles.button, styles.buttonOutline]}>
					<Text style={styles.buttonOutlineText}>Crée un compte</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: '80%',
	},
	input: {
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	button: {
		backgroundColor: 'blue',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonOutline: {
		backgroundColor: 'white',
		marginTop: 5,
		borderColor: 'blue',
		borderWidth: 2,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
	buttonOutlineText: {
		color: 'blue',
		fontWeight: '700',
		fontSize: 16,
	},
});

export default ConnectionScreen;
