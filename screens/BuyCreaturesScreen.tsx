import React, { useEffect } from 'react';
import Creature from '../types/creature';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation-props';

type Props = NativeStackScreenProps<RootStackParamList, 'Buy Creatures'>

function BuyCreaturesScreen({ route }: Props): JSX.Element {
  const { creatures, setCreatures } = route.params;

  return (
    <FlatList
      data={creatures}
      nestedScrollEnabled
      renderItem={({ item }) => (
        <Text style={styles.creatureName}>{item.name}</Text>
      )}
    />
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  creatureName: {
    fontSize: 20,
    color: '#FFFFFF'
  }
});

export default BuyCreaturesScreen;