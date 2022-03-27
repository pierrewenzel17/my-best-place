import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, List, ListItem } from '@ui-kitten/components';
import Place from '../models/Place';
import PlaceService from '../services/PlaceService';

type Element = {
	item: Place;
	index: number;
};

function FavList({navigation} : any): JSX.Element {

    const [fav, setFav] = useState<Array<Place>>([]);

    const renderItemAccessory = (): JSX.Element => <Button size='tiny'>SUPPRIMER</Button>;

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
		PlaceService.getLocations().then((fav: Array<Place>) => {
			setFav(fav);
		});
	}, []);

    return <List style={styles.container} data={fav} renderItem={renderItem} />;

}

export default FavList;

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});
