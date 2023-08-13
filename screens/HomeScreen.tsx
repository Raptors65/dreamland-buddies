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
import calculateStreak from '../helpers/calculate-streak';

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
  }, [sleepData, minimumHours, maximumHours]);

  const streak = calculateStreak(sleepData, minimumHours, maximumHours);
  let streakColor;
  if (streak < 7) {
    streakColor = '#FFFFFF';
  } else if (streak < 28) {
    streakColor = '#C5E8B7';
  } else if (streak < 365) {
    streakColor = '#83D475';
  } else {
    streakColor = '#57C84D';
  }

  return (
    <View style={styles.scrollView}>
      <View style={styles.sleepPointsContainer}>
        <Text style={styles.snoozePointsTitle}>Snooze Points</Text>
        <Text style={styles.sleepPoints}>{creatures.sleepPoints.toLocaleString()}</Text>
      </View>
      <View style={styles.streakContainer}>
        <Text style={styles.streakTitle}>Current Streak</Text>
        <Text style={{...styles.streak, color: streakColor }}>{streak.toLocaleString()}</Text>
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
      <Pressable onPress={() => navigation.navigate('Achievements')}>
        <View style={styles.achievementsView}>
          <Text style={styles.buttonText}>Achievements</Text>
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
  sleepPointsContainer: {
    paddingVertical: 20,
  },
  streakContainer: {
    paddingBottom: 20,
  },
  snoozePointsTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  sleepPoints: {
    color: '#FFFFFF',
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  streakTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  streak: {
    fontSize: 30,
    textAlign: 'center'
  },
  buyCreaturesView: {
    backgroundColor: '#7879FF',
    padding: 10,
    marginBottom: 10
  },
  yourCreaturesView: {
    backgroundColor: '#4949FF',
    padding: 10,
    marginBottom: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  achievementsView: {
    backgroundColor: '#1F1FFF',
    padding: 10,
    marginBottom: 30
  }
});

const HomeScreenContainer = connect((state: CreaturesState, ownProps: NativeStackScreenProps<RootStackParamList, 'Home'>) => ({ ...state, ...ownProps }))(HomeScreen);

export default HomeScreenContainer;
