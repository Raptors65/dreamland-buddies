import Creature from "./creature";

export type RootStackParamList = {
  Home: undefined;
  "Buy Creatures": {
    creatures: Creature[],
    setCreatures: React.Dispatch<React.SetStateAction<Creature[]>>
  };
};