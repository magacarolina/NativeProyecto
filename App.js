import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Menu from './src/screens/menu';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return ( 
    <NavigationContainer>
       <Menu/>
    </NavigationContainer>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
