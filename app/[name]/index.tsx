import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface DetailsProps {
  name?: string;
  url?: string;
}
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
  url: string;
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

//@ts-ignore
const Details = () => {
  const { name, url } = useLocalSearchParams();
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>({
    name: "",
    image: "",
    imageBack: "",
    types: [],
    url: "",
  });

  useEffect(() => {
    fetchPokemonDetails(url as string);
  }, [url]);

  async function fetchPokemonDetails(pokemonUrl: string) {
    try {
      const response = await fetch(pokemonUrl);
      const data = await response.json();
      setPokemonDetails({
        name: data.name,
        image: data.sprites.front_default,
        imageBack: data.sprites.back_default,
        types: data.types,
        url: pokemonUrl,
      });
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  }
  console.log("Pokemon Details:", pokemonDetails);
  console.log("url:", url);
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 10 }}>
        <Stack.Screen
          //@ts-ignore
          options={{
            title: name.charAt(0).toUpperCase() + name.slice(1) + " Details",
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          }}
        />
        <Image
          source={pokemonDetails.image}
          style={{ width: 400, height: 400 }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Text>details: {name}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Details;
