type Creature = {
  name: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Divine' | 'Celestial';
  type: string;
  cost: number;
  age: number;
  owned: boolean;
}

export default Creature;