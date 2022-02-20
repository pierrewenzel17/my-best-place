// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC1bI05_zMeudEqBsGszIiB3p9l0jplrtA',
	authDomain: 'my-best-place-206b5.firebaseapp.com',
	projectId: 'my-best-place-206b5',
	storageBucket: 'my-best-place-206b5.appspot.com',
	messagingSenderId: '705503791195',
	appId: '1:705503791195:web:201d2596efb1c83878177e',
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
