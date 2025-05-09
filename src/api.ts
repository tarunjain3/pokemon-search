import { PokemonDetail, PokemonPreview } from "../types";

// Fetch list of Pokémon types
export async function getPokemonTypes(): Promise<string[]> {
    const response = await fetch("https://pokeapi.co/api/v2/type/");
    const data = await response.json();
    // Exclude "shadow" and "unknown" if needed
    return data.results
        .map((type: { name: string }) => type.name)
        .filter((name: string) => name !== "shadow" && name !== "unknown");
}

// Fetch list of Pokémon previews
export async function getPokemonList(limit = 10): Promise<PokemonPreview[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();

    const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
                name: details.name,
                image: details.sprites.front_default,
                types: details.types.map(
                    (t: { slot: number; type: { name: string; url: string } }) => t.type.name
                ),
            }
        })
    );

    return pokemonDetails;
}

// Fetch detailed Pokémon information by name
export async function getPokemonDetails(name: string): Promise<PokemonDetail> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    return data
}
