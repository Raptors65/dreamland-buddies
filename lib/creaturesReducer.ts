import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Creature from "../types/creature";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CreaturesState {
  sleepPoints: number;
  creatures: Creature[];
}

const initialState: CreaturesState = {
  sleepPoints: 0,
  creatures: [
    {
      name: 'Slumberbug',
      rarity: 'Common',
      type: 'Cozy Insect',
      cost: 100,
      born: 0,
      owned: false,
    },
    {
      name: 'Nap Rat',
      rarity: 'Common',
      type: 'Drowsy Mammal',
      cost: 100,
      born: 0,
      owned: false,
    },
    {
      name: 'Snugglepuff',
      rarity: 'Uncommon',
      type: 'Fluffy Companion',
      cost: 250,
      born: 0,
      owned: false,
    },
    {
      name: 'Napturtle',
      rarity: 'Uncommon',
      type: 'Restful Reptile',
      cost: 250,
      born: 0,
      owned: false,
    },
    {
      name: 'Bedtime Bear',
      rarity: 'Rare',
      type: 'Hibernating Bear',
      cost: 500,
      born: 0,
      owned: false,
    },
    {
      name: 'Restoraunt',
      rarity: 'Rare',
      type: 'Slumbering Elephant',
      cost: 500,
      born: 0,
      owned: false,
    },
    {
      name: 'REMote',
      rarity: 'Epic',
      type: 'Dream Controller',
      cost: 1000,
      born: 0,
      owned: false,
    },
    {
      name: 'Dozebeak',
      rarity: 'Epic',
      type: 'Snoozy Bird',
      cost: 1000,
      born: 0,
      owned: false,
    },
    {
      name: 'Somnolent Sloth',
      rarity: 'Legendary',
      type: 'Sleepy Sloth',
      cost: 2500,
      born: 0,
      owned: false,
    },
    {
      name: 'Snuggle Bear',
      rarity: 'Legendary',
      type: 'Cuddly Guardian Bear',
      cost: 2500,
      born: 0,
      owned: false,
    },
    {
      name: 'Hypno Ray',
      rarity: 'Mythic',
      type: 'Restful Manta Ray',
      cost: 5000,
      born: 0,
      owned: false,
    },
    {
      name: 'Hypnogriff',
      rarity: 'Mythic',
      type: 'Enchanted Dream Steed',
      cost: 5000,
      born: 0,
      owned: false,
    },
    {
      name: 'Siestallion',
      rarity: 'Divine',
      type: 'Dreamweaver Stallion',
      cost: 10000,
      born: 0,
      owned: false,
    },
    {
      name: 'Hypnoserpent',
      rarity: 'Divine',
      type: 'Serene Serpent Guardian',
      cost: 10000,
      born: 0,
      owned: false,
    },
    {
      name: 'Somniphoenix',
      rarity: 'Celestial',
      type: 'Resplendent Dream Phoenix',
      cost: 25000,
      born: 0,
      owned: false,
    }
  ]
};

export const creaturesSlice = createSlice({
  name: 'creatures',
  initialState,
  reducers: {
    buyCreature: (state, action: PayloadAction<number>) => {
      state.creatures[action.payload].owned = true;
      state.creatures[action.payload].born = Date.now();
      state.sleepPoints -= state.creatures[action.payload].cost;
      AsyncStorage.setItem('creatures', JSON.stringify(state));
    },
    setPoints: (state, action: PayloadAction<number>) => {
      state.sleepPoints = action.payload;
    }
  },
});

export const { buyCreature, setPoints } = creaturesSlice.actions;

export default creaturesSlice.reducer;