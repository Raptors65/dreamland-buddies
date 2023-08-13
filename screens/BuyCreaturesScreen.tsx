import React, { useEffect } from 'react';
import Creature from '../types/creature';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation-props';
import { connect, useDispatch } from 'react-redux';
import { CreaturesState, buyCreature } from '../lib/creaturesReducer';
import { AppDispatch } from '../lib/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Buy Creatures'> & {
  creatures: CreaturesState,
  dispatch: AppDispatch
};

function BuyCreaturesScreen({ creatures, dispatch, route }: Props): JSX.Element {
  return (
    <>
      <Text style={styles.points}>Snooze Points: {creatures.sleepPoints}</Text>
      <FlatList
        data={creatures.creatures}
        nestedScrollEnabled
        renderItem={({ item, index }) => (
          <View style={styles.creatureContainer}>
            <View style={styles.topCreatureContainer}>
              <View>
                <Text style={styles.creatureName}>{item.name}</Text>
                <Image style={styles.creatureImage} source={require('../assets/phoenix.png')} />
              </View>
              <View>
                <Text style={styles.creatureInfo}>Cost: {item.cost} points</Text>
                <Text style={styles.creatureInfo}>Rarity: {item.rarity}</Text>
                <Text style={styles.ownedInfo}>{item.owned ? 'Owned' : 'Not Owned'}</Text>
              </View>
            </View>
            {!item.owned && <Button disabled={item.cost > creatures.sleepPoints} title="Buy Creature" onPress={() => dispatch(buyCreature(index))} />}
          </View>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  points: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  creatureContainer: {
    // height: 120,
    padding: 20,
    borderColor: '#AAAAAA',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  creatureName: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  creatureImage: {
    width: 100,
    height: 100
  },
  creatureInfo: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right'
  },
  ownedInfo: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right',
    fontStyle: 'italic',
    marginTop: 5
  },
  topCreatureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  }
});

const BuyCreaturesScreenContainer = connect((state: CreaturesState, ownProps: NativeStackScreenProps<RootStackParamList, 'Buy Creatures'>) =>
  ({ ...state, ...ownProps }))(BuyCreaturesScreen);

export default BuyCreaturesScreenContainer;