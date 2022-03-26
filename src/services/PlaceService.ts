import {
	addDoc,
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../data/firebase.config';
import collections from '../data/tables';
import Place from '../models/Place';

async function getLocations(): Promise<Array<Place>> {
	const locationsCol = collection(db, 'places');
	const locationsSnapshot = await getDocs(locationsCol);
	const locationList = locationsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
		doc.data()
	);
	return locationList as Array<Place>;
}

async function getById(id: string): Promise<Place> {
	const locationsCol = doc(db, `${collections.places}/${id}`);
	const locationsSnapshot = await getDoc(locationsCol);
	const res = locationsSnapshot.data();
	return res as Place;
}

async function create(location: Place): Promise<void> {
	try {
		const locationsCol = collection(db, collections.places);
		await addDoc(locationsCol, location);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
}

const locationService = {
	getLocations,
	getById,
	create,
};

export default locationService;
