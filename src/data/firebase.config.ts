import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

export const config = {
	apiKey: "AIzaSyDws0GdA-TS1UaH3SV-t9ZElSP08YP7Rdg",
	authDomain: "my-best-place-2.firebaseapp.com",
	projectId: "my-best-place-2",
	storageBucket: "my-best-place-2.appspot.com",
	messagingSenderId: "719862810779",
	appId: "1:719862810779:web:20220bac85fe3effb79e3e"
};

export const app: FirebaseApp = initializeApp(config);

export const db: Firestore = getFirestore(app);
