import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getAuth } from 'firebase/auth';

type Props = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	navigation: any;
};

function SettingsScreen({ navigation }: Props): JSX.Element {
	function handleSignOut(): void {
		getAuth()
			.signOut()
			.then(() => {
				navigation.replace('Login');
			});
	}

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.textBold}>Utilisateur actuel</Text>
				<Text style={styles.text}>{getAuth().currentUser?.email}</Text>
			</View>	
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={(): void => {
						handleSignOut();
					}}>
					<Text style={styles.buttonText}>Se déconnecter</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		width: '60%',
		alignItems: 'center',
		marginTop: 40,
		marginBottom: 40
	},
	button: {
		backgroundColor: 'blue',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		borderColor: 'blue',
		borderWidth: 2,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
	textContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignContent: 'center',
		marginTop: 20
	},
	textBold: {
		fontWeight: 'bold',
		fontSize: 30,
		textAlign: 'center'
	},
	text: {
		fontSize: 15,
		textAlign: 'center',
		marginTop: 20
	}
});
