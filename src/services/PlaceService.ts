import {
	addDoc,
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	QueryDocumentSnapshot,
	where,
} from 'firebase/firestore';
import { db } from '../data/firebase.config';
import collections from '../data/tables';
import Category from '../models/Category';
import Place from '../models/Place';

async function getLocations(): Promise<Array<Place>> {
	const locationsCol = collection(db, collections.places);
	const locationsSnapshot = await getDocs(locationsCol);
	const locationList = locationsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
		doc.data()
	);
	console.log("getLocations");
	return locationList as Array<Place>;
}

async function recherche(name: string, categ: Array<Category>): Promise<Array<Place>> {
	const q = query(
		collection(db, collections.favorites),
		where('user', '==', name),
		where('categories', 'in', categ)
	);
	const locationsSnapshot = await getDocs(q);
	const locationList = locationsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
		doc.data()
	);
	return locationList as Array<Place>;
}

async function getById(id: string): Promise<Place> {
	const locationsCol = doc(db, `${collections.places}/${id}`);
	const locationsSnapshot = await getDoc(locationsCol);
	const res = locationsSnapshot.data();
	console.log("getById");
	return res as Place;
}

async function create(location: Place): Promise<void> {
	try {
		const locationsCol = collection(db, collections.places);
		console.log("create");
		await addDoc(locationsCol, location);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
}

const locationService = {
	getLocations,
	getById,
	recherche,
	create,
};

export default locationService;
