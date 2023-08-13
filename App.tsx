/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { RootStackParamList } from './types/navigation-props';
import BuyCreaturesScreen from './screens/BuyCreaturesScreen';
import { Provider } from 'react-redux';
import { store } from './lib/store';
import YourCreaturesScreen from './screens/YourCreaturesScreen';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={Theme}>
        <StatusBar backgroundColor={Theme.colors.card} barStyle="light-content" />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Buy Creatures" component={BuyCreaturesScreen} />
          <Stack.Screen name="Your Creatures" component={YourCreaturesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    flex: 1
  },
  snoozePointsTitle: {
    color: '#FFFFFF',
    fontSize: 30
  },
  sleepPoints: {
    color: '#FFFFFF',
    fontSize: 50
  },
  text: {
    color: '#FFFFFF',
    fontSize: 50
  }
});

export default App;
