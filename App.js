import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';


const App = () => {
  const Drawer = createDrawerNavigator();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Quiz App" component={HomeScreen} />
        <Drawer.Screen name="Test" component={TestScreen} />
        <Drawer.Screen name="Results" component={ResultsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
