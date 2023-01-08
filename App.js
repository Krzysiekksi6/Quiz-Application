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
  LogBox,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import RulesScreen from './components/RulesScreen';
import RandomTest from './components/RandomTest'

const App = () => {
  // Declare Navigation Drawer
  const Drawer = createDrawerNavigator();
  const RootStack = createStackNavigator();
  // Close the SplashScreen
  useEffect(() => {
    SplashScreen.hide();
  }, []);



  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Rules"
          component={RulesScreen}
          options={{
            drawerItemStyle: {display: 'none'},
            swipeEnabled: false,
            headerShown: false,
          }}
        />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Test" component={TestScreen} 
        options={{
          drawerItemStyle: {display: 'none'},
          swipeEnabled: false,
          headerShown: false,
        }}
        />
        <Drawer.Screen name="Results" component={ResultsScreen} />
        <Drawer.Screen name="Random Test" component={RandomTest} />
        <Drawer.Screen name="Download Tests" component={ResultsScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="QuizApp"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

{
  /* <RootStack.Screen
name="QuizApp"
component={DrawerNavigator}
options={{headerShown: false}}
/>
<RootStack.Screen
name="Rules"
component={RulesScreen}
options={{headerShown: false}}
/> */
}

{
  /* {getInitialPage() ? (
          <RootStack.Screen name="QuizApp" component={DrawerNavigator} options={{headerShown: false}} />
        ) : (
          <RootStack.Screen name="Rules" component={RulesScreen} options={{headerShown: false}} />
        )} */
}
