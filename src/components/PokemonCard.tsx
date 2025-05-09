// components/PokemonCard.tsx
import Link from "next/link";
import Image from "next/image";
import { PokemonPreview } from "../../types";

type Props = {
  pokemon: PokemonPreview;
};

export default function PokemonCard({ pokemon }: Props) {
  return (
    <Link
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
  );
}
