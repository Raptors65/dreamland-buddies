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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

function HomeScreen({ navigation }: Props): JSX.Element {
  const [sleepData, setSleepData] = useState<RecordResult<"SleepSession">[]>([]);
  const [minimumHours, setMinimumHours] = useState(7);
  const [maximumHours, setMaximumHours] = useState(9);
  const [creatures, setCreatures] = useState<Creature[]>([
    {
      name: 'Slumberbug',
      rarity: 'Common',
      type: 'Cozy Insect',
      cost: 100,
      age: 0,
      owned: false,
    },
    {
      name: 'Dozebeak',
      rarity: 'Common',
      type: 'Snoozy Bird',
      cost: 100,
      age: 0,
      owned: false,
    },
    {
      name: 'Snugglepuff',
      rarity: 'Uncommon',
      type: 'Fluffy Companion',
      cost: 250,
      age: 0,
      owned: false,
    },
    {
      name: 'Napturtle',
      rarity: 'Uncommon',
      type: 'Restful Reptile',
      cost: 250,
      age: 0,
      owned: false,
    },
    {
      name: 'Bedtime Bear',
      rarity: 'Rare',
      type: 'Hibernate Bear',
      cost: 500,
      age: 0,
      owned: false,
    },
    {
      name: 'Restoraunt',
      rarity: 'Rare',
      type: 'Slumbering Elephant',
      cost: 500,
      age: 0,
      owned: false,
    },
    {
      name: 'REMote',
      rarity: 'Epic',
      type: 'Dream Controller',
      cost: 1000,
      age: 0,
      owned: false,
    },
    {
      name: 'Somniastral',
      rarity: 'Epic',
      type: 'Astral Dreamwalker',
      cost: 1000,
      age: 0,
      owned: false,
    },
    {
      name: 'Slumberquake',
      rarity: 'Legendary',
      type: 'Slumbering Titan',
      cost: 2500,
      age: 0,
      owned: false,
    },
    {
      name: 'Hypnogriff',
      rarity: 'Legendary',
      type: 'Enchanted Dream Steed',
      cost: 2500,
      age: 0,
      owned: false,
    },
    {
      name: 'Siestallion',
      rarity: 'Mythic',
      type: 'Dreamweaver Stallion',
      cost: 5000,
      age: 0,
      owned: false,
    },
    {
      name: 'Morpheus Rex',
      rarity: 'Mythic',
      type: 'Mythical Sleep King',
      cost: 5000,
      age: 0,
      owned: false,
    },
    {
      name: 'Slumbertide',
      rarity: 'Divine',
      type: 'Oceanic Slumber Spirit',
      cost: 10000,
      age: 0,
      owned: false,
    },
    {
      name: 'Celestial Slumberer',
      rarity: 'Divine',
      type: 'Dreambound Angel',
      cost: 10000,
      age: 0,
      owned: false,
    },
    {
      name: 'Somniphoenix',
      rarity: 'Celestial',
      type: 'Resplendent Dream Phoenix',
      cost: 25000,
      age: 0,
      owned: false,
    },
    {
      name: 'Hypnoserpent',
      rarity: 'Celestial',
      type: 'Serene Serpent Guardian',
      cost: 25000,
      age: 0,
      owned: false,
    },
  ]);

  const updateMinimumHours = (newValue: number) => {
    setMinimumHours(newValue);
    AsyncStorage.setItem('minimumHours', newValue.toString());
  };

  const updateMaximumHours = (newValue: number) => {
    setMaximumHours(newValue);
    AsyncStorage.setItem('maximumHours', newValue.toString());
  };

  const updateCreatures = (newValue: Creature[]) => {
    setCreatures(newValue);
    AsyncStorage.setItem('creatures', JSON.stringify(newValue));
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
    AsyncStorage.getItem('creatures').then((storedValue) => {
      if (storedValue !== null) {
        setCreatures(JSON.parse(storedValue));
      } else {
        AsyncStorage.setItem('creatures', JSON.stringify(creatures));
      }
    });
  }, []);

  let sleepPoints = sleepData === null ? 0 : calculateSleepPoints(sleepData, minimumHours, maximumHours);

  return (
    <View style={styles.scrollView}>
      <View>
        <Text style={styles.snoozePointsTitle}>Snooze Points</Text>
        <Text style={styles.sleepPoints}>{sleepPoints}</Text>
      </View>
      <SleepGoal
        minimumHours={minimumHours}
        setMinimumHours={setMinimumHours}
        maximumHours={maximumHours}
        setMaximumHours={setMaximumHours}
      />
      <Pressable onPress={() => navigation.navigate('Buy Creatures', { creatures, setCreatures })}>
        <View style={styles.buyCreaturesView}>
          <Text style={styles.buttonText}>Buy Creatures</Text>
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.yourCreaturesView}>
          <Text style={styles.buttonText}>Your Creatures</Text>
        </View>
      </Pressable>
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
    fontSize: 30
  },
  sleepPoints: {
    color: '#FFFFFF',
    fontSize: 50
  },
  buyCreaturesView: {
    backgroundColor: '#0055bb',
    width: 200
  },
  yourCreaturesView: {
    backgroundColor: '#0000bb',
    width: 200
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default HomeScreen;
