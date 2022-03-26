import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, List, ListItem } from '@ui-kitten/components';
import Place from '../models/Place';
import PlaceService from '../services/PlaceService';

type Element = {
	item: Place;
	index: number;
};

function SearchList(): JSX.Element {
	const [locations, setLocations] = useState<Array<Place>>([]);

	const renderItemAccessory = (): JSX.Element => <Button size='tiny'>FOLLOW</Button>;

	const renderItem = ({ item, index }: Element): JSX.Element => (
		<ListItem
			title={`${index} ${item.name}`}
			description={`${item.description}`}
			accessoryRight={renderItemAccessory}
		/>
	);

	useEffect(() => {
		PlaceService.getLocations().then((locations: Array<Place>) => {
			setLocations(locations);
		});
	}, [locations]);

	return <List style={styles.container} data={locations} renderItem={renderItem} />;
}

export default SearchList;

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});
