import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, List, ListItem } from '@ui-kitten/components';
import Place from '../models/Place';
import PlaceService from '../services/PlaceService';

type Element = {
	item: Place;
	index: number;
};

function SearchList({navigation} : any): JSX.Element {
	const [locations, setLocations] = useState<Array<Place>>([]);

	const renderItemAccessory = (): JSX.Element => <Button size='tiny'>FAVORI</Button>;

	const renderItem = ({ item, index }: Element): JSX.Element => (
		<ListItem
			onPress={() => goToNextScreen(item)}
			title={`${index} ${item.name}`}
			description={`${item.description.substring(0, 100)}`}
			accessoryRight={renderItemAccessory}
		/>
	);

	const goToNextScreen = (item) => {
		navigation.navigate('Details', {
			item : item
		});
	}

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
