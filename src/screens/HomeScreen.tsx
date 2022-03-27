import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import SearchList from '../components/SearchList';
import PlaceService from '../services/PlaceService';
import Place from '../models/Place';

function HomeScreen({ navigation }: any): JSX.Element {
	const [locations, setLocations] = useState<Array<Place>>([]);
	const [mapRegion, setMapRegion] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.2,
		longitudeDelta: 0.05,
	});

	function addMarkers() {
		return locations.map((e, k) => (
			<Marker
				key={k}
				coordinate={{
					latitude: e.position.latitude,
					longitude: e.position.longitude,
				}}
				title={e.name}
			/>
		));
	}

	useEffect(() => {
		PlaceService.getLocations().then((locations: Array<Place>) => {
			setLocations(locations);
			console.log("getLocations/homeScreen")
		});

		(async () => {
			await Location.requestForegroundPermissionsAsync();
			const currentLocation = await Location.getCurrentPositionAsync({});
			setMapRegion({
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.001,
			});
		})();
	}, [])

	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} region={mapRegion}>
				{addMarkers()}
			</MapView>
			<View style={styles.places}>
				<SearchList navigation={navigation} locations={locations} />
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
