import SearchBar from "@/components/searchbar";
import { useMovies } from "@/context/moviecontext";
import { Movie } from "@/data/movies";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AdminManageMoviesScreen() {
  const { movies, deleteMovie } = useMovies();
  const [query, setQuery] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function handleAddMovie() {
    router.push("/admin/movieform");
  }

  function handleEditMovie(movie: Movie) {
    router.push({ pathname: "/admin/movieform", params: { id: movie.id } });
  }

  function handleDeleteMovie(movie: Movie) {
    Alert.alert("Delete Movie", `Remove "${movie.title}" from CineVerse?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteMovie(movie.id),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Manage Movies</Text>
        <Pressable style={styles.addButton} onPress={handleAddMovie}>
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies..."
      />

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No movies found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={[styles.thumb, { backgroundColor: item.color }]}>
              <Ionicons
                name="film-outline"
                size={18}
                color="rgba(255,255,255,0.6)"
              />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieYear}>{item.year}</Text>
            </View>
            <Pressable
              onPress={() => handleEditMovie(item)}
              style={styles.iconButton}
            >
              <Ionicons name="create-outline" size={20} color="#4F8EF7" />
            </Pressable>
            <Pressable
              onPress={() => handleDeleteMovie(item)}
              style={styles.iconButton}
            >
              <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E50914",
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingBottom: 40 },
  emptyText: { color: "#9A9AA8", textAlign: "center", marginTop: 40 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 10,
    marginBottom: 10,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowText: { flex: 1 },
  movieTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  movieYear: { color: "#9A9AA8", fontSize: 12, marginTop: 2 },
  iconButton: { padding: 6, marginLeft: 4 },
});
