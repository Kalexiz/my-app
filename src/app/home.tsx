import { Artist } from "@/types/artist";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { getMusicData } from '@/services/api-client';
import ArtistList from '@/components/ArtistList';

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    getMusicData()
      .then(data => {
        if (active) setArtists(data);
      })
      .catch(() => {
        if (active) setError("No se pudo cargar la música. Revisa tu conexión.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [attempt]);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator accessibilityLabel="Cargando música" /> : error ? (
        <View>
          <Text>{error}</Text>
          <Button title="Reintentar" onPress={() => {
            setLoading(true);
            setError("");
            setAttempt(attempt + 1);
          }} />
        </View>
      ) : <ArtistList artists={artists} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
