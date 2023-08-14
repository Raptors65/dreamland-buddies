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
    name: 'Cozy Friends',
    description: 'Befriend two common sleep buddies. You\'re building a cozy sleep environment!',
    rarity: 'Common'
  },
  {
    name: 'Snoozing Companions',
    description: 'Befriend two uncommon sleep buddies. Enjoy even more restful nights with your new sleepy friends.',
    rarity: 'Uncommon',
  },
  {
    name: 'Bedtime Buddies',
    description: 'Befriend two rare sleep buddies. Forge strong connections with them, enhancing your sleep quality.',
    rarity: 'Rare',
  },
  {
    name: 'Dreamweaver',
    description: 'Befriend two epic sleep buddies. Harness the power of two epic sleep buddies to weave sweet dreams.',
    rarity: 'Epic',
  },
  {
    name: 'Siren of Slumber',
    description: 'Befriend two legendary sleep buddies. Solidify your status as a legendary sleeper with these powerful buddies by your side.',
    rarity: 'Legendary'
  },
  {
    name: 'Mythic Realmwalker',
    description: 'Befriend two mythic sleep buddies. Elevate your experiences as you travel through the dream realms.',
    rarity: 'Mythic'
  },
  {
    name: 'Divine Dream Guardians',
    description: 'Befriend two divine sleep buddies. Prove your dedication to the art of slumber and establishing an unbreakable sleep streak with these buddies.',
    rarity: 'Divine',
  },
  {
    name: 'Celestial Dreamer',
    description: 'Befriend two celestial sleep buddies. Reach the highest echelons of dream mastery with the power of the ancient gods of sleep.',
    rarity: 'Celestial'
  },
];

// const rarityIndices = {Common: 0, Uncommon: 1, Rare: 2, Epic: 3, Legendary: 4, Mythic: 5, Divine: 6, Celestial: 7};

function AchievementsScreen({ creatures, dispatch, route }: Props): JSX.Element {
  return (
    <FlatList
      data={achievements}
      renderItem={({ item, index }) => (
        creatures.creatures[index * 2].owned && creatures.creatures[index * 2 + 1].owned ? (
          <View style={styles.achievementContainer}>
            <Image style={styles.achievementImage} source={require('../assets/phoenix.png')} />
            <View style={styles.achievementTextContainer}>
              <Text style={styles.achievementName}>{item.name}</Text>
              <Text style={styles.achievementDescription}>{item.description}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.achievementContainer}>
            <Image style={styles.achievementImage} source={require('../assets/phoenix.png')} />
            <View style={styles.achievementTextContainer}>
              <Text style={styles.lockedName}>{item.name}</Text>
              <Text style={styles.lockedDescription}>Not unlocked yet</Text>
            </View>
          </View>
        )
      )}
    />
  )
}

const styles = StyleSheet.create({
  achievementContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    width: '100%'
  },
  achievementImage: {
    width: 100,
    height: 100
  },
  achievementTextContainer: {
    paddingLeft: 20,
    paddingRight: 100
  },
  achievementName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  achievementDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    flexShrink: 1,
  },
  lockedName: {
    color: '#AAAAAA',
    fontSize: 18,
    flexShrink: 1,
    fontStyle: 'italic'
  },
  lockedDescription: {
    color: '#AAAAAA',
    fontSize: 16,
    flexShrink: 1,
    fontStyle: 'italic',
  }
});

const AchievementsScreenContainer = connect((state: CreaturesState, ownProps: NativeStackScreenProps<RootStackParamList, 'Achievements'>) =>
  ({ ...state, ...ownProps }))(AchievementsScreen);

export default AchievementsScreenContainer;