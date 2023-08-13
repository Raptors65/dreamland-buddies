import React, { useEffect } from 'react';
import Creature from '../types/creature';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation-props';
import { connect, useDispatch } from 'react-redux';
import { CreaturesState, buyCreature } from '../lib/creaturesReducer';
import { AppDispatch } from '../lib/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Achievements'> & {
  creatures: CreaturesState,
  dispatch: AppDispatch
};

const achievements = [
  {
    name: 'Dreamland Buddies',
    description: 'Collect two common sleep creatures to prove you\'re building a cozy sleep environment.'
  },
  {
    name: 'Snooze Companions',
    description: 'Form a bond with a pair of uncommon sleep creatures and enjoy even more restful nights.'
  },
  {
    name: 'Rested Relations',
    description: 'Forge a strong connection with two rare sleep creatures, enhancing your sleep quality.'
  },
  {
    name: 'Dream Control Master',
    description: 'Harness the power of two epic sleep creatures, showcasing your mastery over the dream realm.'
  },
  {
    name: 'Legends of Slumber',
    description: 'Unite two legendary sleep creatures, solidifying your status as a legend in the world of dreams.'
  },
  {
    name: 'Mythic Dreamweaver',
    description: 'Attain a harmonious pair of mythic sleep creatures, elevating your dream experiences to the mythic realm.'
  },
  {
    name: 'Divine Dream Guardians',
    description: 'Prove your dedication by acquiring two divine sleep creatures, establishing an unbreakable dream bond.'
  },
  {
    name: 'Celestial Harmony',
    description: 'Achieve perfect harmony with two celestial sleep creatures, reaching the highest echelons of dream mastery.'
  },
];

function AchievementsScreen({ creatures, dispatch, route }: Props): JSX.Element {
  return (
    <FlatList
      data={achievements}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.achievementName}>{item.name}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  achievementContainer: {
    
  },
  achievementName: {
    color: '#FFFFFF'
  }
});

const AchievementsScreenContainer = connect((state: CreaturesState, ownProps: NativeStackScreenProps<RootStackParamList, 'Achievements'>) =>
  ({ ...state, ...ownProps }))(AchievementsScreen);

export default AchievementsScreenContainer;