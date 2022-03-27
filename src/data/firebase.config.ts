import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

export const config = {
	apiKey: 'AIzaSyCDUS8unENrebvXXAJzCi0-p2ZQlL6AxnY',
	authDomain: 'my-best-place-3.firebaseapp.com',
	projectId: 'my-best-place-3',
	storageBucket: 'my-best-place-3.appspot.com',
	messagingSenderId: '756566792578',
	appId: '1:756566792578:web:ede72021e45a30e8a8d79b',
};

export const app: FirebaseApp = initializeApp(config);

export const db: Firestore = getFirestore(app);
