import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
}

export default function Index() {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokedex();
  }, []);

  async function fetchPokedex() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20",
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            imageBack: pokemonData.sprites.back_default,
          };
        }),
      );

      setPokedex(pokemonDetails);
    } catch (error) {
      console.log(error);
    }
  }
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <ScrollView style={{ padding: 20, flex: 1 }}>
      {pokedex.map((pokemon: any) => (
        <View
          key={pokemon.name}
          style={{
            alignItems: "center",
            marginBottom: 20,
            borderRadius: 20,
            backgroundColor: "#ebeaea",
            padding: 10,
          }}
        >
          <Text>{pokemon.name}</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 100, height: 100 }}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <Image
              source={{ uri: pokemon.imageBack }}
              style={{ width: 100, height: 100 }}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
