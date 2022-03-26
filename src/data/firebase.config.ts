import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

export const config = {
	apiKey: 'AIzaSyC1bI05_zMeudEqBsGszIiB3p9l0jplrtA',
	authDomain: 'my-best-place-206b5.firebaseapp.com',
	projectId: 'my-best-place-206b5',
	storageBucket: 'my-best-place-206b5.appspot.com',
	messagingSenderId: '705503791195',
	appId: '1:705503791195:web:201d2596efb1c83878177e',
};

export const app: FirebaseApp = initializeApp(config);

export const db: Firestore = getFirestore(app);
