import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { DataTable } from 'react-native-paper';

function DetailsScreen({ route }: any): JSX.Element {
	const { item } = route.params;

	const [mapRegion, setmapRegion] = useState({
		latitude: item.position.latitude,
		longitude: item.position.longitude,
		latitudeDelta: 0.02,
		longitudeDelta: 0.05,
	});

<<<<<<< HEAD
	function renderCategories() {
		return item.categories.map((item, index) => (
			<DataTable.Row key={index}>
				<DataTable.Cell key={index}>{item}</DataTable.Cell>
			</DataTable.Row>
		));
	}

=======
    function renderCategories() {
        return item.categories.map((item, index) => (
            <DataTable.Row key={index}>
                <DataTable.Cell key={index}>{item}</DataTable.Cell>
            </DataTable.Row>
        ));
    }
    
>>>>>>> dbfa5f7 (suite map)
	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} region={mapRegion}>
				<Marker coordinate={mapRegion} title='Marker' />
			</MapView>
			<View style={styles.places}>
				<Text style={styles.title}>{item.name}</Text>
				<Text style={{ fontSize: 20, marginTop: 10 }}>{item.adresse}</Text>
				<Text style={{ marginTop: 20, marginBottom: 10, fontStyle: 'italic' }}>
					{item.description}
				</Text>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Catégorie</DataTable.Title>
					</DataTable.Header>
					{renderCategories()}
				</DataTable>
			</View>
		</View>
	);
}

export default DetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 200,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 30,
		marginTop: 20,
	},
	map: {
		flex: 1,
		alignSelf: 'stretch',
		height: '100%',
	},
	places: {
		flex: 2,
		marginLeft: 20,
		marginRight: 20,
	},
});
