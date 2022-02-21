import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import HomeScreen from './src/screens/HomeScreen';
import ConnectionScreen from './src/screens/ConnectionScreen';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

const firebaseConfig = {
	apiKey: 'AIzaSyC1bI05_zMeudEqBsGszIiB3p9l0jplrtA',
	authDomain: 'my-best-place-206b5.firebaseapp.com',
	projectId: 'my-best-place-206b5',
	storageBucket: 'my-best-place-206b5.appspot.com',
	messagingSenderId: '705503791195',
	appId: '1:705503791195:web:201d2596efb1c83878177e',
};

export default function App(): JSX.Element {
	// Initialize Firebase
	initializeApp(firebaseConfig);
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							options={{ headerShown: false }}
							name='Login'
							component={ConnectionScreen}
						/>
						<Stack.Screen name='Home' component={HomeScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</ApplicationProvider>
		</>
	);
}
