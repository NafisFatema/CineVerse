import { Movie } from "@/data/movies";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type MovieCardProps = {
  movie: Movie;
  onPress: () => void;
};

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${movie.title}, ${movie.year}`}
    >
      <View style={[styles.posterBox, { backgroundColor: movie.color }]}>
        {movie.poster_url ? (
          <Image
            source={{ uri: movie.poster_url }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            accessibilityLabel={`${movie.title} poster`}
          />
        ) : (
          <View style={styles.placeholderIcon}>
            <Ionicons
              name="film-outline"
              size={30}
              color="rgba(255,255,255,0.5)"
            />
          </View>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
      <Text style={styles.year}>{movie.year}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: "47%", marginBottom: 20 },
  posterBox: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 10,
    marginBottom: 8,
    overflow: "hidden",
  },
  placeholderIcon: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  year: { color: "#9A9AA8", fontSize: 12, marginTop: 2 },
});
