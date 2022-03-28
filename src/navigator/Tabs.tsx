import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigation from './Navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tab2Component } from './Tab2';

const Tab = createBottomTabNavigator();



export const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856d6',
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10
                },
                tabBarStyle: {
                    backgroundColor: 'rgba(255,255,255,0.90)',
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios') ? 80 : 60,
                    position: 'absolute',

                }
            }}
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}

        >
            <Tab.Screen
                name="HomeScreen"
                component={Navigation}
                options={{
                    tabBarLabel: "Listado",
                    tabBarIcon: ({ color }) => <Icon name='list-outline' size={20} color={color} />
                }}
            />
            <Tab.Screen
                name="Tab2Component"
                component={Tab2Component}
                options={{
                    tabBarLabel: "Buscar",
                    tabBarIcon: ({ color }) => <Icon name='search-outline' size={20} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}