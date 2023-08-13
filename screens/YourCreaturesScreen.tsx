import React, { useEffect, useState } from 'react';
import Creature from '../types/creature';
import { Button, Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

function YourCreaturesScreen({ creatures, dispatch, route }: Props): JSX.Element {
  const [creatureSelected, setCreatureSelected] = useState(0);

  return (
    <>
      <FlatList
        data={creatures.creatures.filter((creature) => creature.owned)}
        nestedScrollEnabled
        numColumns={2}
        contentContainerStyle={styles.creaturesContainer}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => setCreatureSelected(index)}>
            <ImageBackground style={styles.creatureImage} source={require('../assets/phoenix.png')}>
              {creatureSelected === index && (
                <View style={styles.creatureTextContainer}>
                  <Text style={styles.creatureName}>{item.name}</Text>
                  <Text style={styles.creatureText}>{Math.round((Date.now() - item.born) / 1000 / 60 / 60 / 24)} days old</Text>
                </View>
              )}
            </ImageBackground>
          </Pressable>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  creaturesContainer: {
    // display: 'flex',
    // justifyContent: 'flex-start',
    // flexWrap: 'wrap',
    // flexDirection: 'row'
  },
  creatureImage: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#000'
  },
  creatureTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    backgroundColor: '#00000090'
  },
  creatureName: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  creatureText: {
    color: '#FFFFFF',
  }
});

const YourCreaturesScreenContainer = connect((state: CreaturesState, ownProps: NativeStackScreenProps<RootStackParamList, 'Your Creatures'>) =>
  ({ ...state, ...ownProps }))(YourCreaturesScreen);

export default YourCreaturesScreenContainer;