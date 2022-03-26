import { StyleSheet, View } from 'react-native';
import React from 'react';
import NewPlaceForm from '../components/NewPlaceForm';

function AddScreen(): JSX.Element {
	return (
		<View style={styles.container}>
			<NewPlaceForm />
		</View>
	);
}

export default AddScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
