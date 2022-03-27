import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ConnectionScreen from './src/screens/ConnectionScreen';
import Tabs from './src/components/navigation/Tabs';
import DetailsScreen from './src/screens/DetailsScreen';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

const firebaseConfig = {
	apiKey: 'AIzaSyCDUS8unENrebvXXAJzCi0-p2ZQlL6AxnY',
	authDomain: 'my-best-place-3.firebaseapp.com',
	projectId: 'my-best-place-3',
	storageBucket: 'my-best-place-3.appspot.com',
	messagingSenderId: '756566792578',
	appId: '1:756566792578:web:ede72021e45a30e8a8d79b',
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
						<Stack.Screen name='Tabs' component={Tabs} options={{ headerShown: false }} />
						<Stack.Screen name='Details' component={DetailsScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</ApplicationProvider>
		</>
	);
}
