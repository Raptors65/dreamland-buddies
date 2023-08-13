/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { readSleepData } from '../api/health-connect';
import type { RecordResult } from 'react-native-health-connect/lib/typescript/types';
import SleepGoal from '../components/sleep-goal';
import calculateSleepPoints from '../helpers/calculate-sleep-points';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Creature from '../types/creature';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation-props';
import { connect } from 'react-redux';
import { AppDispatch } from '../lib/store';
import { CreaturesState, setPoints } from '../lib/creaturesReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  creatures: CreaturesState,
  dispatch: AppDispatch
};

function HomeScreen({ navigation, dispatch, creatures }: Props): JSX.Element {
  const [sleepData, setSleepData] = useState<RecordResult<"SleepSession">[]>([]);
  const [minimumHours, setMinimumHours] = useState(7);
  const [maximumHours, setMaximumHours] = useState(9);

  const updateMinimumHours = (newValue: number) => {
    setMinimumHours(newValue);
    AsyncStorage.setItem('minimumHours', newValue.toString());
  };

  const updateMaximumHours = (newValue: number) => {
    setMaximumHours(newValue);
    AsyncStorage.setItem('maximumHours', newValue.toString());
  };

  useEffect(() => {
    readSleepData().then((data) => {
      setSleepData(data);
    });
    AsyncStorage.getItem('minimumHours').then((storedValue) => {
      if (storedValue !== null) {
        setMinimumHours(parseInt(storedValue));
      } else {
        AsyncStorage.setItem('minimumHours', minimumHours.toString());
      }
    });
    AsyncStorage.getItem('maximumHours').then((storedValue) => {
      if (storedValue !== null) {
        setMaximumHours(parseInt(storedValue));
      } else {
        AsyncStorage.setItem('maximumHours', maximumHours.toString());
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setPoints(calculateSleepPoints(sleepData, minimumHours, maximumHours, creatures.creatures)));
  }, [sleepData, minimumHours, maximumHours])

  return (
    <View style={styles.scrollView}>
      <View>
        <Text style={styles.snoozePointsTitle}>Snooze Points</Text>
        <Text style={styles.sleepPoints}>{creatures.sleepPoints}</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('Buy Creatures')}>
        <View style={styles.buyCreaturesView}>
          <Text style={styles.buttonText}>Buy Creatures</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Your Creatures')}>
        <View style={styles.yourCreaturesView}>
          <Text style={styles.buttonText}>Your Creatures</Text>
        </View>
      </Pressable>
      <SleepGoal
        minimumHours={minimumHours}
        setMinimumHours={setMinimumHours}
        maximumHours={maximumHours}
        setMaximumHours={setMaximumHours}
      />
    </View>
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
    fontSize: 30,
    textAlign: 'center'
  },
  sleepPoints: {
    color: '#FFFFFF',
    fontSize: 50,
    textAlign: 'center'
  },
  buyCreaturesView: {
    backgroundColor: '#0055bb',
    padding: 10,
    marginBottom: 10
  },
  yourCreaturesView: {
    backgroundColor: '#0000bb',
    padding: 10,
    marginBottom: 30
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});

const HomeScreenContainer = connect((state: CreaturesState, ownProps: NativeStackScreenProps<RootStackParamList, 'Home'>) => ({ ...state, ...ownProps }))(HomeScreen);

export default HomeScreenContainer;
