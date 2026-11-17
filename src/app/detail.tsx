import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Detail() {
  const { id, name, image } = useLocalSearchParams<{
    id?: string | string[];
    name?: string | string[];
    image?: string | string[];
  }>();

  const artistName = (Array.isArray(name) ? name[0] : name) || "Artista";
  const artistImage = (Array.isArray(image) ? image[0] : image) || "";
  const artistId = (Array.isArray(id) ? id[0] : id) || "";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageFrame}>
          {artistImage ? (
            <Image
              accessibilityLabel={`Imagen de ${artistName}`}
              resizeMode="cover"
              source={{ uri: artistImage }}
              style={styles.image}
              testID="artist-image"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>♪</Text>
            </View>
          )}
        </View>
        <Text style={styles.eyebrow}>ARTISTA</Text>
        <Text style={styles.name} accessibilityRole="header">{artistName}</Text>
        {artistId ? <Text style={styles.artistId}>ID: {artistId}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f5f9",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
  imageFrame: {
    width: "100%",
    aspectRatio: 1,
    maxWidth: 320,
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: "#e5eaf3",
    marginBottom: 28,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfe7f5",
  },
  placeholderText: {
    color: "#536b91",
    fontSize: 72,
  },
  eyebrow: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },
  name: {
    color: "#172554",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  artistId: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 10,
  },
});
