import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './Navigation';
import SearchScreen from '../screens/SearchScreen';
import PokemonScreen from '../screens/PokemonScreen';

const Tab2 = createStackNavigator<RootStackParams>();

export const Tab2Component = () => {
    return (
        <Tab2.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Tab2.Screen name="SearchScreen" component={SearchScreen} />
            <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
        </Tab2.Navigator>
    );
}