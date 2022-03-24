import { StyleSheet, View } from 'react-native';
import React from 'react';
import SearchList from '../components/SearchList';

function SearchScreen(): JSX.Element {
	return (
		<View style={styles.container}>
			<SearchList />
		</View>
	);
}

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
