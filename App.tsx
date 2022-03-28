import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text } from 'react-native';
import Navigation from './src/navigator/Navigation';
import { Tabs } from './src/navigator/Tabs';

interface Props {}

function App(props: Props) {
  const {} = props

  return (
    <NavigationContainer>
    <Tabs/>
    </NavigationContainer>
  )
}

export default App
