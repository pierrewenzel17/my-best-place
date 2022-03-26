/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	getAuth,
	createUserWithEmailAndPassword,
	UserCredential,
	signInWithEmailAndPassword,
	User,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { Button, Icon, Input, Text } from '@ui-kitten/components';

type Props = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	navigation: any;
};

function ConnectionScreen({ navigation }: Props): JSX.Element {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

	const toggleSecureEntry = (): void => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderInputIcon = (props: any): JSX.Element => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
		</TouchableWithoutFeedback>
	);

	useEffect(() => {
		getAuth().onAuthStateChanged((user: User | null): void => {
			if (user) {
				navigation.navigate('Tabs');
			}
		});
	}, []);

	function handleSignUp(): void {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential: UserCredential) => {
				// Signed in
				const { user } = userCredential;
				console.log(user.email);
			})
			.catch((error: FirebaseError) => {
				console.log(error.message);
			});
	}

	function handleSignIn(): void {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential: UserCredential) => {
				// Signed in
				const { user } = userCredential;
				console.log(user.email);
				// ...
			})
			.catch((error: FirebaseError) => {
				console.log(error.message);
			});
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior='padding'>
			<Text style={styles.text} category='h2' status='primary'>
				My Best Place
			</Text>
			<View style={styles.inputContainer}>
				<Input
					placeholder='Email'
					value={email}
					onChangeText={(text: string): void => setEmail(text)}
					style={styles.input}
					size='large'
				/>
				<Input
					size='large'
					style={styles.input}
					placeholder='Mot de passe'
					value={password}
					secureTextEntry={secureTextEntry}
					onChangeText={(text: string): void => setPassword(text)}
					accessoryRight={renderInputIcon}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					onPress={(): void => {
						handleSignIn();
					}}
					appearance='filled'
					size='large'>
					Connexion
				</Button>
				<Button
					style={styles.button}
					onPress={(): void => {
						handleSignUp();
					}}
					appearance='outline'
					size='large'>
					Crée un compte
				</Button>
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
		borderRadius: 10,
		marginBottom: 5,
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	button: {
		width: '100%',
		borderRadius: 10,
		marginBottom: 5,
	},
	text: {
		marginBottom: 100,
	},
});

export default ConnectionScreen;
