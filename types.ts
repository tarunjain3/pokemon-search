export interface PokemonPreview {
  name: string;
  image: string;
  types: string[];
}



type NamedAPIResource = {
  name: string;
  url: string;
};

type Ability = {
  ability: NamedAPIResource | null;
  is_hidden: boolean;
  slot: number;
};

type PastAbility = {
  abilities: Ability[];
  generation: NamedAPIResource;
};

type Cry = {
  latest: string;
  legacy: string;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

type TypeSlot = {
  slot: number;
  type: NamedAPIResource;
};

export interface PokemonDetail {
  abilities: Ability[];
  base_experience: number;
  cries: Cry;
  forms: NamedAPIResource[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: unknown[];
  species: NamedAPIResource;
  stats: Stat[];
  types: TypeSlot[];
  weight: number;
  sprites: {
    front_default: string;
  };
};


