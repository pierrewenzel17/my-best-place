import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchList from '../components/SearchList';

function HomeScreen({navigation} : any): JSX.Element {
	const [mapRegion, setmapRegion] = useState({
		latitude: 49.897443,
		longitude: 2.290084,
		latitudeDelta: 0.2,
		longitudeDelta: 0.05,
	});

	useEffect(() => {}, [navigation]);

	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} region={mapRegion}>
				<Marker coordinate={mapRegion} title='Marker' />
			</MapView>
			<View style={styles.places}>
				<SearchList navigation={navigation} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	map: {
		flex: 3,
		alignSelf: 'stretch',
		height: '100%',
	},
	places: {
		flex: 2,
	},
});

export default HomeScreen;
