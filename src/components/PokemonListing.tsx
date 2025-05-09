"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PokemonPreview } from "../../types";
import { getPokemonList, getPokemonTypes } from "@/api";
import Image from "next/image";

export default function HomePage() {
  const [types, setTypes] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [pokemons, setPokemons] = useState<PokemonPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonTypes().then(setTypes);
    getPokemonList().then((data) => {
      setPokemons(data);
      setLoading(false);
    });
  }, []);

  const filtered = pokemons.filter((p) => {
    const matchesName = p.name.includes(search.toLowerCase());
    const matchesType = selectedType ? p.types.includes(selectedType) : true;
    return matchesName && matchesType;
  });

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-10 tracking-tight">
        Pokémon Explorer
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <select
          className="p-3 rounded-lg border w-full md:w-1/4 bg-white text-gray-700 focus:outline-none  focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Pokémon"
          className="p-3 rounded-lg border w-full md:flex-1 bg-white backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Loading Pokémon...
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-red-500 text-lg">No Pokémon found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((pokemon) => (
            <Link
              key={pokemon.name}
              href={`/pokemon/${pokemon.name}`}
              className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition text-center p-5 group hover:-translate-y-1 duration-300"
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={200}
                height={200}
                className="mx-auto object-contain group-hover:scale-110 transition-transform"
              />
              <div className="mt-3 text-xl font-semibold capitalize text-blue-800">
                {pokemon.name}
              </div>
              <div className="text-sm text-gray-600">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs mr-1 capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
