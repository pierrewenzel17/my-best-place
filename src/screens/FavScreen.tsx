import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FavList from '../components/FavList';

export default function FavScreen({navigation}: any) {
	return (
		<View style={styles.container}>
			<FavList navigation={navigation}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40
	},
});
