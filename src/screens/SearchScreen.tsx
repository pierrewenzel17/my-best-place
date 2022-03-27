import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import SearchList from '../components/SearchList';
import { Autocomplete, AutocompleteItem, IndexPath, Input, Select, SelectItem } from '@ui-kitten/components/ui';
import AddressService, { LatLong } from '../services/AddressService';
import PlaceService from '../services/PlaceService';
import { GeoPoint } from 'firebase/firestore';
import Category from '../models/Category';
import Place from '../models/Place';
import { SearchBar } from 'react-native-elements';

function SearchScreen({navigation} : any): JSX.Element {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [adress, setAdress] = useState<string>('');
	const [data, setData] = React.useState<Array<LatLong>>([]);

	const [selectedIndex, setSelectedIndex] = useState<IndexPath | Array<IndexPath>>([]);

	async function onSubmit(): Promise<void> {
		const categories: Array<Category> = groupDisplayValues.map((value: string) => {
			return value as unknown as Category;
		}) as Array<Category>;

		setName(''); setDescription(''); setAdress(''); setData([]); setSelectedIndex([]);
	}

	const groupDisplayValues: Array<string> = selectedIndex.map((index: IndexPath) => {
		return Object.keys(Category)[index.row];
	});

	async function onChangeText(query: string): Promise<void> {
		setAdress(query);
		setData(await AddressService.GetLatLong(query));
	}

	const renderAuto = (item, index): JSX.Element => (
		<AutocompleteItem key={index} title={item.Label} />
	);

	const onSelect = (index: number): void => {
		setAdress(data[index].Label);
	};

	const renderOption = (title: string): JSX.Element => (
		<SelectItem key="{title}" title={title} />
	);
	
	return (
		<View style={styles.container}>
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
				<Autocomplete
					style={styles.space10}
					placeholder='Adresse'
					size='large'
					value={adress}
					onSelect={onSelect}
					onChangeText={(value: string): Promise<void> => onChangeText(value)}>
					{data.map(renderAuto)}
				</Autocomplete>
			</View>
			<SearchList navigation={navigation}/>
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
	},
	space10: {
		marginTop: 5
	},
	researchContainer: {
		width: '100%'
	}
});
