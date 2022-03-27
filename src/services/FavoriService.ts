import { getAuth } from 'firebase/auth';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDocs,
	query,
	QueryDocumentSnapshot,
	where,
} from 'firebase/firestore';
import { db } from '../data/firebase.config';
import collections from '../data/tables';
import { Favori, FavoriRead } from '../models/Favori';
import Place from '../models/Place';

async function getFavs(): Promise<Array<FavoriRead>> {
	const q = query(
		collection(db, collections.favorites),
		where('user', '==', getAuth().currentUser?.uid)
	);

	const querySnapshot = await getDocs(q);
	const locationList = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
		return { id: doc.id, fav: doc.data() as Favori } as FavoriRead;
	});
	return locationList;
}

async function create(location: Place): Promise<void> {
	try {
		const fav: Favori = { user: getAuth().currentUser?.uid as string, place: location };
		const locationsCol = collection(db, collections.favorites);
		await addDoc(locationsCol, fav);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
}

async function deleteFav(favori: FavoriRead): Promise<void> {
	const d = doc(db, collections.favorites, favori.id as string);
	await deleteDoc(d);
}

const favService = {
	getFavs,
	create,
	deleteFav,
};

export default favService;
