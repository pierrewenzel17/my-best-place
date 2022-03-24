/* eslint-disable @typescript-eslint/typedef */

import { deleteApp } from 'firebase/app';

export type LatLong = {
	Latiture: number;
	Longiture: number;
	Label: string;
};

async function GetLatLong(adress: string): Promise<Array<LatLong>> {
	const res = await fetch(
		`https://api-adresse.data.gouv.fr/search/?q=${adress}&type=housenumber&autocomplete=1`,
		{
			method: 'GET',
		}
	).then((res) => res.json());
	let data: Array<LatLong> = [];
	if (res.features !== undefined) {
		data = res.features.map((value) => {
			return {
				Label: value.properties.label,
				Latiture: value.geometry.coordinates[1],
				Longiture: value.geometry.coordinates[0],
			} as LatLong;
		});
	}
	// console.log(res.features[0].properties.label);
	return data;
}

const AddressService = {
	GetLatLong,
};

export default AddressService;
