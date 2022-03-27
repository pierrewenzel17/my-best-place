/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import SearchScreen from '../../screens/SearchScreen';
import FavScreen from '../../screens/FavScreen';
import AddScreen from '../../screens/AddScreen';

const Tab = createBottomTabNavigator();

function Tabs(): JSX.Element {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: {
					height: 90,
				},
			}}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					unmountOnBlur: true,
					tabBarIcon: (): JSX.Element => {
						return (
							<View style={styles.iconsBox}>
								<Image
									source={require('../../../assets/icons/map.png')}
									resizeMode='contain'
									style={styles.iconsImage}
								/>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name='search'
				component={SearchScreen}
				options={{
					unmountOnBlur: true,
					tabBarIcon: (): JSX.Element => {
						return (
							<View style={styles.iconsBox}>
								<Image
									source={require('../../../assets/icons/glass-location.png')}
									resizeMode='contain'
									style={styles.iconsImage}
								/>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name='add'
				component={AddScreen}
				options={{
					unmountOnBlur: true,
					tabBarIcon: (): JSX.Element => {
						return (
							<View style={styles.iconsBox}>
								<Image
									source={require('../../../assets/icons/add.png')}
									resizeMode='contain'
									style={styles.iconsImage}
								/>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name='favoris'
				component={FavScreen}
				options={{
					unmountOnBlur: true,
					tabBarIcon: (): JSX.Element => {
						return (
							<View style={styles.iconsBox}>
								<Image
									source={require('../../../assets/icons/star.png')}
									resizeMode='contain'
									style={styles.iconsImage}
								/>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					tabBarIcon: (): JSX.Element => {
						return (
							<View style={styles.iconsBox}>
								<Image
									source={require('../../../assets/icons/gear.png')}
									resizeMode='contain'
									style={styles.iconsImage}
								/>
							</View>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
}

export default Tabs;

const styles = StyleSheet.create({
	iconsBox: {
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		top: 15,
	},
	iconsImage: {
		width: 35,
		height: 35,
		tintColor: '#e32f45',
	},
});
