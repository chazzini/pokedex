import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function Index() {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    fetchPokedex();
  }, []);

  const ColorByType = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
  };

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
            types: pokemonData.types,
            url: pokemon.url,
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          {pokedex.map((pokemon: any) => (
            <Pressable
              onPress={() => {
                handleSheetChanges(0);
                bottomSheetRef.current?.expand();
                setSelectedPokemon(pokemon);
              }}
              key={pokemon.name}
            >
              <View
                // @ts-ignore
                style={{
                  ...styles.card,
                  backgroundColor:
                    ColorByType[
                      pokemon.types[0].type.name as keyof typeof ColorByType
                    ] + 50,
                }}
              >
                <Text style={styles.name}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Text>
                <Text style={styles.type}>
                  {pokemon.types.map((type: any) => type.type.name).join(", ")}
                </Text>
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
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["25%", "50%"]}
        enablePanDownToClose
        onClose={() => setSelectedPokemon(null)}
        onChange={handleSheetChanges}
        detached
      >
        <BottomSheetView style={{ flex: 1, alignItems: "center" }}>
          {selectedPokemon && (
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {selectedPokemon.name.charAt(0).toUpperCase() +
                  selectedPokemon.name.slice(1)}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Types:{" "}
                {selectedPokemon.types.map((type) => type.type.name).join(", ")}
              </Text>
              <Image
                source={{ uri: selectedPokemon.image }}
                style={{ width: 200, height: 200 }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#ebeaea",
    padding: 10,
  },
  name: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  type: {
    fontSize: 16,
    color: "#6b6b6b",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
