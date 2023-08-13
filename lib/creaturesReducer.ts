import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Creature from "../types/creature";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: Creature[] = [
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
];

export const creaturesSlice = createSlice({
  name: 'creatures',
  initialState,
  reducers: {
    buyCreature: (state, action: PayloadAction<number>) => {
      console.log('hi')
      state[action.payload].owned = true;
      AsyncStorage.setItem('creatures', JSON.stringify(state))
    },
  },
});

export const { buyCreature } = creaturesSlice.actions;

export default creaturesSlice.reducer;