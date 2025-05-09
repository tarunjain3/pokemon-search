import Link from "next/link";
import { PokemonDetail } from "../../../../types";
import { getPokemonDetails } from "@/api";
import Image from "next/image";

export default async function PokemonDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon: PokemonDetail = await getPokemonDetails(params.name);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex items-center space-x-2">
        <Link href="/" className="text-indigo-600 hover:underline font-medium">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <span className="capitalize text-gray-700">{params.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl mt-6">
        <div className="flex justify-center items-center">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={192}
            height={192}
            className="w-48 h-48 object-contain"
            priority
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold capitalize text-indigo-700 mb-6">
            {pokemon.name}
          </h1>

          <div className="space-y-2 text-md">
            <div className="flex gap-4">
              <div className="text-gray-600 font-semibold">Height:</div>
              <div>{pokemon.height}</div>
            </div>

            <div className="flex gap-4">
              <div className="text-gray-600 font-semibold">Weight:</div>
              <div>{pokemon.weight}</div>
            </div>

            <div className="flex gap-4">
              <div className="text-gray-600 font-semibold">Types:</div>
              <div className="space-x-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm capitalize"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="font-semibold">Abilities:</div>
              <div className="capitalize">
                {pokemon.abilities
                  .map((ability) => ability.ability?.name)
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-semibold">Stats:</div>
              <div className="capitalize">
                {pokemon.stats
                  .map((stat) => stat.stat.name)
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
