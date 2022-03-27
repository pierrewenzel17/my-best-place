import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, List, ListItem } from '@ui-kitten/components';
import Place from '../models/Place';
import favService from '../services/FavoriService';
import { FavoriRead } from '../models/Favori';

type Element = {
	item: FavoriRead;
	index: number;
};

function FavList({ navigation }: any): JSX.Element {
	const [fav, setFav] = useState<Array<FavoriRead>>([]);

	async function deleteFavori(favori: FavoriRead): Promise<void> {
		await favService.deleteFav(favori);
		favService.getFavs().then((fav: Array<FavoriRead>) => {
			setFav(fav);
		});
	}

	const renderItemAccessory = (item: FavoriRead): JSX.Element => (
		<Button size='tiny' onPress={(): Promise<void> => deleteFavori(item)}>
			SUPPRIMER
		</Button>
	);

	const renderItem = ({ item, index }: Element): JSX.Element => (
		<ListItem
			onPress={(): void => goToNextScreen(item.fav.place)}
			title={`${index} ${item.fav.place.name}`}
			description={`${item.fav.place.description.substring(0, 100)}`}
			accessoryRight={(): JSX.Element => renderItemAccessory(item)}
		/>
	);

	const goToNextScreen = (item: Place): void => {
		navigation.navigate('Details', {
			item,
		});
	};

	useEffect(() => {
		favService.getFavs().then((fav: Array<FavoriRead>) => {
			setFav(fav);
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Mes Favoris</Text>
			<List style={styles.container} data={fav} renderItem={renderItem} />
		</View>
	);
}

export default FavList;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: 'white',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 36,
		textAlign: 'center',
		marginBottom: 50,
		marginTop: 50,
	},
});
