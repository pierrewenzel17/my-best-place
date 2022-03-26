import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	IndexPath,
	Input,
	Select,
	SelectItem,
} from '@ui-kitten/components';
import { GeoPoint } from 'firebase/firestore';
import Place from '../models/Place';
import Category from '../models/Category';
import AddressService, { LatLong } from '../services/AddressService';
import PlaceService from '../services/PlaceService';

function NewPlaceForm(): JSX.Element {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [adress, setAdress] = useState<string>('');
	const [data, setData] = React.useState<Array<LatLong>>([]);

	const [selectedIndex, setSelectedIndex] = useState<IndexPath | Array<IndexPath>>([]);

	async function onSubmit(): Promise<void> {
		const categories: Array<Category> = groupDisplayValues.map((value: string) => {
			return value as unknown as Category;
		}) as Array<Category>;
		const position: GeoPoint = { latitude: data[0].Latiture, longitude: data[0].Longiture };
		const place: Place = { name, description, categories, position };
		PlaceService.create(place);
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

	const renderOption = (title: string): JSX.Element => <SelectItem title={title} />;

	return (
		<View style={styles.container}>
			<Text>Nouveau lieu :</Text>
			<Input
				placeholder='Nom du lieu'
				value={name}
				size='large'
				onChangeText={(value: string): void => setName(value)}
			/>
			<Input
				multiline
				value={description}
				textStyle={{ minHeight: 64 }}
				placeholder='Description'
				onChangeText={(value: string): void => setDescription(value)}
			/>
			<Select
				multiSelect
				selectedIndex={selectedIndex}
				value={groupDisplayValues.join(', ')}
				size='large'
				placeholder='Tags'
				onSelect={(index: IndexPath | Array<IndexPath>): void => setSelectedIndex(index)}>
				{Object.keys(Category).map(renderOption)}
			</Select>
			<Autocomplete
				placeholder='Adresse'
				size='large'
				value={adress}
				onSelect={onSelect}
				onChangeText={(value: string): Promise<void> => onChangeText(value)}>
				{data.map(renderAuto)}
			</Autocomplete>

			<Button status='primary' onPress={(): Promise<void> => onSubmit()}>
				Crée
			</Button>
		</View>
	);
}

export default NewPlaceForm;

const styles = StyleSheet.create({
	container: {
		width: '80%',
	},
});
