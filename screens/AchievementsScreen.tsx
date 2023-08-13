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
    description: 'Collect two common sleep creatures to prove you\'re building a cozy sleep environment.',
    rarity: 'Common'
  },
  {
    name: 'Snooze Companions',
    description: 'Form a bond with a pair of uncommon sleep creatures and enjoy even more restful nights.',
    rarity: 'Uncommon',
  },
  {
    name: 'Rested Relations',
    description: 'Forge a strong connection with two rare sleep creatures, enhancing your sleep quality.',
    rarity: 'Rare',
  },
  {
    name: 'Dream Control Master',
    description: 'Harness the power of two epic sleep creatures, showcasing your mastery over the dream realm.',
    rarity: 'Epic',
  },
  {
    name: 'Legends of Slumber',
    description: 'Unite two legendary sleep creatures, solidifying your status as a legend in the world of dreams.',
    rarity: 'Legendary'
  },
  {
    name: 'Mythic Dreamweaver',
    description: 'Attain a harmonious pair of mythic sleep creatures, elevating your dream experiences to the mythic realm.',
    rarity: 'Mythic'
  },
  {
    name: 'Divine Dream Guardians',
    description: 'Prove your dedication by acquiring two divine sleep creatures, establishing an unbreakable dream bond.',
    rarity: 'Divine',
  },
  {
    name: 'Celestial Harmony',
    description: 'Achieve perfect harmony with two celestial sleep creatures, reaching the highest echelons of dream mastery.',
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