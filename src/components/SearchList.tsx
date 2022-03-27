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

<<<<<<< HEAD
function SearchList({ navigation }: any): JSX.Element {
	const [locations, setLocations] = useState<Array<Place>>([]);
=======
function SearchList({navigation, locations} : any): JSX.Element {
>>>>>>> dbfa5f7 (suite map)

	async function addFav(item: Place): Promise<void> {
		await favService.create(item);
	}

	const renderItemAccessory = (item: Place): JSX.Element => (
		<Button size='tiny' onPress={(): Promise<void> => addFav(item)}>
			FAVORI
		</Button>
	);

	const renderItem = ({ item }: Element): JSX.Element => (
		<ListItem
			onPress={() => goToNextScreen(item)}
			title={`${item.name}`}
			description={`${item.description.substring(0, 100)}`}
			accessoryRight={() => renderItemAccessory(item)}
		/>
	);

	const goToNextScreen = (item) => {
		navigation.navigate('Details', {
			item: item,
		});
	};

	useEffect(() => {}, []);


	return <List style={styles.container} data={locations} renderItem={renderItem} />;
}

export default SearchList;

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});
