import ErrorScreen from "@/components/error-screen";
import SearchBar from "@/components/searchbar";
import { useMovies } from "@/context/moviecontext";
import { Movie } from "@/data/movies";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AdminManageMoviesScreen() {
  const { movies, dispatch, isLoading, error, reload } = useMovies();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    api
      .get<Movie[]>("/movies", { params: { q: debouncedQuery.trim() } })
      .then(({ data }) => setSearchResults(data))
      .catch((err) => {
        console.error(err);
        Alert.alert(
          "Search Error",
          "Could not search movies. Is the server running?",
        );
      })
      .finally(() => setIsSearching(false));
  }, [debouncedQuery]);

  const displayedMovies = searchResults ?? movies;

  function handleAddMovie() {
    router.push("/admin/movieform");
  }

  function handleEditMovie(movie: Movie) {
    router.push({
      pathname: "/admin/movieform",
      params: { id: String(movie.id) },
    });
  }

  function handleDeleteMovie(movie: Movie) {
    Alert.alert("Delete Movie", `Remove "${movie.title}" from CineVerse?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/movies/${movie.id}`);
            dispatch({ type: "REMOVE_MOVIE", payload: movie.id });
          } catch (err) {
            Alert.alert(
              "Error",
              "Could not delete movie. Is the server running?",
            );
          }
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={reload} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Manage Movies</Text>
        <Pressable
          style={styles.addButton}
          onPress={handleAddMovie}
          accessibilityRole="button"
          accessibilityLabel="Add new movie"
          accessibilityHint="Opens the Add Movie form"
        >
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies..."
      />

      {isSearching && (
        <ActivityIndicator style={{ marginBottom: 8 }} color="#E50914" />
      )}

      <FlatList
        data={displayedMovies}
        keyExtractor={(item) => String(item.id)}
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
              accessibilityRole="button"
              accessibilityLabel={`Edit ${item.title}`}
            >
              <Ionicons name="create-outline" size={20} color="#4F8EF7" />
            </Pressable>
            <Pressable
              onPress={() => handleDeleteMovie(item)}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${item.title}`}
              accessibilityHint="Shows a confirmation dialog before deleting"
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
  centerContainer: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { color: "#9A9AA8", marginTop: 12 },
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
