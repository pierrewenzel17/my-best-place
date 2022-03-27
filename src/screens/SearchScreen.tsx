import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	Button,
	IndexPath,
	Input,
	Select,
	SelectItem,
} from '@ui-kitten/components/ui';
import SearchList from '../components/SearchList';
import PlaceService from '../services/PlaceService';
import Category from '../models/Category';
import Place from '../models/Place';

function SearchScreen({ navigation }: any): JSX.Element {
	const [name, setName] = useState<string>('');
	const [selectedIndex, setSelectedIndex] = useState<IndexPath | Array<IndexPath>>([
		new IndexPath(0),
		new IndexPath(1),
	]);
	const [locations, setLocations] = useState<Array<Place>>([]);

	

	useEffect(() => {
		PlaceService.getLocations().then((locations: Array<Place>) => {
			setLocations(locations);
			console.log("getLocations/searchScreen")
		});
	},[])

	async function onSubmit(): Promise<void> {
		const c = groupDisplayValues.map((value: string) => {
			return value as unknown as Category;
		}) as Array<Category>;

		const res = await PlaceService.recherche(name, groupDisplayValues);
		setLocations(res as Array<Place>);
	}

	const groupDisplayValues: Array<string> = selectedIndex.map((index: IndexPath) => {
		return Object.keys(Category)[index.row];
	});

	const renderOption = (title: string): JSX.Element => <SelectItem key='{title}' title={title} />;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Recherche</Text>
			<View style={styles.researchContainer}>
				<Input
					style={styles.space10}
					placeholder='Nom du lieu'
					value={name}
					size='large'
					onChangeText={(value: string): void => setName(value)}
				/>
				<Select
					style={styles.space10}
					multiSelect
					selectedIndex={selectedIndex}
					value={groupDisplayValues.join(', ')}
					size='large'
					placeholder='Type'
					onSelect={(index: IndexPath | Array<IndexPath>): void => setSelectedIndex(index)}>
					{Object.keys(Category).map(renderOption)}
				</Select>
				<Button style={styles.space20} status='primary' onPress={(): Promise<void> => onSubmit()}>
				Créer
				</Button>
			</View>
			<SearchList navigation={navigation} locations={locations} />
		</View>
	);
}

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	space10: {
		marginTop: 5,
		width: '100%',
	},
	researchContainer: {
		width: '100%',
		alignItems: 'center',
	},
	space20: {
		width: '80%',
		marginTop: 20,
		marginBottom: 20,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 36,
		textAlign: 'center',
		marginBottom: 50,
		marginTop: 50,
	},
});
