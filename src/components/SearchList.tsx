import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, List, ListItem } from '@ui-kitten/components';
import Place from '../models/Place';
import PlaceService from '../services/PlaceService';
import favService from '../services/FavoriService';

type Element = {
	item: Place;
	index: number;
};

function SearchList({ navigation }: any): JSX.Element {
	const [locations, setLocations] = useState<Array<Place>>([]);

	async function addFav(item: Place): Promise<void> {
		await favService.create(item);
	}

	const renderItemAccessory = (item: Place): JSX.Element => (
		<Button size='tiny' onPress={(): Promise<void> => addFav(item)}>
			FAVORI
		</Button>
	);

	const renderItem = ({ item, index }: Element): JSX.Element => (
		<ListItem
			onPress={() => goToNextScreen(item)}
			title={`${index} ${item.name}`}
			description={`${item.description.substring(0, 100)}`}
			accessoryRight={() => renderItemAccessory(item)}
		/>
	);

	const goToNextScreen = (item) => {
		navigation.navigate('Details', {
			item: item,
		});
	};

	useEffect(() => {
		PlaceService.getLocations().then((locations: Array<Place>) => {
			setLocations(locations);
		});
	}, []);

	return <List style={styles.container} data={locations} renderItem={renderItem} />;
}

export default SearchList;

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});
