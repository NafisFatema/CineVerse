import MovieCard from "@/components/moviecard";
import { useMovies } from "@/context/moviecontext";
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

type TabKey = "home" | "watchlist" | "profile";

export default function WelcomeScreen() {
  const { movies } = useMovies();
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  function handleSearchPress() {
    Alert.alert("Search", "Search screen is coming soon.");
  }

  function handleMoviePress(title: string) {
    Alert.alert(title, "Movie detail screen is coming soon.");
  }

  function handleWatchlistPress() {
    setActiveTab("watchlist");
    Alert.alert("Watchlist", "Log in to save movies to your watchlist.");
  }

  function handleProfilePress() {
    setActiveTab("profile");
    router.push("/(auth)/login");
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>CineVerse</Text>

        <View style={styles.headerIcons}>
          <Pressable
            onPress={handleSearchPress}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Search movies"
          >
            <Ionicons name="search" size={22} color="#FFFFFF" />
          </Pressable>

          <Pressable
            onPress={() => router.push("/(auth)/login")}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Log in"
          >
            <Ionicons name="log-in-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {/* Movie grid */}
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item.title)}
          />
        )}
      />

      {/* Bottom tab bar — 3 tabs (Search already lives in the header above) */}
      <View style={styles.tabBar}>
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab("home")}
          accessibilityRole="button"
          accessibilityLabel="Home tab"
        >
          <Ionicons
            name={activeTab === "home" ? "home" : "home-outline"}
            size={22}
            color={activeTab === "home" ? "#E50914" : "#9A9AA8"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "home" && styles.tabLabelActive,
            ]}
          >
            Home
          </Text>
        </Pressable>

        <Pressable
          style={styles.tabItem}
          onPress={handleWatchlistPress}
          accessibilityRole="button"
          accessibilityLabel="Watchlist tab"
        >
          <Ionicons
            name={activeTab === "watchlist" ? "bookmark" : "bookmark-outline"}
            size={22}
            color={activeTab === "watchlist" ? "#E50914" : "#9A9AA8"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "watchlist" && styles.tabLabelActive,
            ]}
          >
            Watchlist
          </Text>
        </Pressable>

        <Pressable
          style={styles.tabItem}
          onPress={handleProfilePress}
          accessibilityRole="button"
          accessibilityLabel="Profile tab"
        >
          <Ionicons
            name={activeTab === "profile" ? "person" : "person-outline"}
            size={22}
            color={activeTab === "profile" ? "#E50914" : "#9A9AA8"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "profile" && styles.tabLabelActive,
            ]}
          >
            Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 55 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  brand: { color: "#E50914", fontSize: 22, fontWeight: "800" },
  headerIcons: { flexDirection: "row", gap: 16 },
  iconButton: { padding: 2 },
  grid: { paddingHorizontal: 20, paddingBottom: 90 },
  row: { justifyContent: "space-between" },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
    paddingTop: 10,
    paddingBottom: 24,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabLabel: { fontSize: 11, color: "#9A9AA8", marginTop: 4 },
  tabLabelActive: { color: "#E50914", fontWeight: "600" },
});
