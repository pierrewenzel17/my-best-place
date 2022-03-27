import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	IndexPath,
	Input,
	Modal,
	Select,
	SelectItem,
	Card,
} from '@ui-kitten/components';
import { GeoPoint } from 'firebase/firestore';
import Place from '../models/Place';
import Category from '../models/Category';
import AddressService, { LatLong } from '../services/AddressService';
import PlaceService from '../services/PlaceService';

function NewPlaceForm(): JSX.Element {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [adresse, setAdresse] = useState<string>('');
	const [data, setData] = React.useState<Array<LatLong>>([]);
	const [visible, setVisible] = React.useState<boolean>(false);

	const [selectedIndex, setSelectedIndex] = useState<IndexPath | Array<IndexPath>>([]);

	async function onSubmit(): Promise<void> {
		const categories: Array<Category> = groupDisplayValues.map((value: string) => {
			return value as unknown as Category;
		}) as Array<Category>;
		const position: GeoPoint = { latitude: data[0].Latiture, longitude: data[0].Longiture };
		const place: Place = { name, description, categories, position, adresse };
		PlaceService.create(place);

		setName('');
		setDescription('');
		setAdresse('');
		setData([]);
		setSelectedIndex([]);
		setVisible(true)
	}

	const groupDisplayValues: Array<string> = selectedIndex.map((index: IndexPath) => {
		return Object.keys(Category)[index.row];
	});

	async function onChangeText(query: string): Promise<void> {
		setAdresse(query);
		setData(await AddressService.GetLatLong(query));
	}

	const renderAuto = (item, index): JSX.Element => (
		<AutocompleteItem key={index} title={item.Label} />
	);

	const onSelect = (index: number): void => {
		setAdresse(data[index].Label);
	};

	//const renderOption = (title: string): JSX.Element => <SelectItem title={title} />;

	const renderOption = (title: string): JSX.Element => <SelectItem key='{title}' title={title} />;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Nouveau lieu</Text>
			<Input
				style={styles.space10}
				placeholder='Nom du lieu'
				value={name}
				size='large'
				onChangeText={(value: string): void => setName(value)}
			/>
			<Input
				style={styles.space10}
				multiline
				value={description}
				textStyle={{ minHeight: 64 }}
				placeholder='Description'
				onChangeText={(value: string): void => setDescription(value)}
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
				value={adresse}
				onSelect={onSelect}
				onChangeText={(value: string): Promise<void> => onChangeText(value)}>
				{data.map(renderAuto)}
			</Autocomplete>

			<Button style={styles.space20} status='primary' onPress={(): Promise<void> => onSubmit()}>
				Créer
			</Button>

			<Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text>La place est crée 😻</Text>
        </Card>
      </Modal>
		</View>
	);
}

export default NewPlaceForm;

const styles = StyleSheet.create({
	container: {
		width: '80%',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 36,
		textAlign: 'center',
		marginBottom: 50,
	},
	space10: {
		marginTop: 10,
	},
	space20: {
		marginTop: 20,
	},
	backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
