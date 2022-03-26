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
			<Text>Email : {getAuth().currentUser?.email}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={(): void => {
						handleSignOut();
					}}>
					<Text style={styles.buttonText}>Sign Out</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
		borderColor: 'blue',
		borderWidth: 2,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
});
