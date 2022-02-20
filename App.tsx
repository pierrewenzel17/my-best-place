import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ConnectionScreen from './src/screens/ConnectionScreen';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<ApplicationProvider {...eva} theme={eva.dark}>
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
	);
}
