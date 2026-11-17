import { Artist } from "@/types/artist";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import ArtistBox from "./ArtistBox";

export default function ArtistList({ artists }: { artists: Artist[] }) {
  const router = useRouter();

  const handlePress = (artist: Artist) => router.push({
    pathname: "/detail",
    params: { id: artist.id, name: artist.name, image: artist.image },
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No hay artistas disponibles</Text>}
        renderItem={({ item }) => <TouchableOpacity
        testID={`artist-box-${item.name}`}
        onPress={() => handlePress(item)}
      >
      <ArtistBox artist={item} />
      </TouchableOpacity>}
      />
    </View>
  );
}
