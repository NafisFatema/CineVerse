import BackButton from "@/components/backbutton";
import ManageCard from "@/components/managecard";
import StatCard from "@/components/startcard";
import { useMovies } from "@/context/moviecontext";
import { useUsers } from "@/context/usercontext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ManageItem = {
  key: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
};

export default function AdminDashboardScreen() {
  const { movies, isLoading: moviesLoading } = useMovies();
  const { users, isLoading: usersLoading } = useUsers();

  function goTo(label: string) {
    Alert.alert(label, "This screen isn't built yet.");
  }

  const manageItems: ManageItem[] = [
    {
      key: "movies",
      title: "Manage Movies",
      subtitle: `${movies.length} movies listed`,
      icon: "film-outline",
      color: "#E50914",
      onPress: () => router.push("/admin/adminmanagemovies"),
    },
    {
      key: "users",
      title: "Manage Users",
      subtitle: `${users.length} accounts`,
      icon: "people-outline",
      color: "#4F8EF7",
      onPress: () => router.push("/admin/adminmanageusers"),
    },
    {
      key: "cinemas",
      title: "Manage Cinemas",
      subtitle: "Screens, halls & locations",
      icon: "business-outline",
      color: "#F4A62A",
      onPress: () => goTo("Manage Cinemas"),
    },
    {
      key: "showtimes",
      title: "Manage Showtimes",
      subtitle: "Assign movies to cineplexes",
      icon: "time-outline",
      color: "#2AD1B0",
      onPress: () => goTo("Manage Showtimes"),
    },
    {
      key: "reviews",
      title: "Reviews & Ratings",
      subtitle: "Moderate user feedback",
      icon: "star-outline",
      color: "#C084FC",
      onPress: () => goTo("Reviews & Ratings"),
    },
    {
      key: "notifications",
      title: "Notifications",
      subtitle: "Send announcements",
      icon: "notifications-outline",
      color: "#FF7A6B",
      onPress: () => goTo("Notifications"),
    },
    {
      key: "reports",
      title: "Reports",
      subtitle: "Revenue & performance",
      icon: "bar-chart-outline",
      color: "#4ADE80",
      onPress: () => goTo("Reports"),
    },
  ];

  function handleLogout() {
    router.replace("/(auth)/welcome");
  }

  const statsReady = !moviesLoading && !usersLoading;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton />
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.adminName}>Admin</Text>
          </View>
        </View>

        <Pressable
          onPress={handleLogout}
          style={styles.logoutButton}
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Ionicons name="log-out-outline" size={22} color="#FF6B6B" />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        {statsReady ? (
          <>
            <StatCard
              label="Movies"
              value={String(movies.length)}
              icon="film-outline"
              color="#E50914"
            />
            <StatCard
              label="Users"
              value={String(users.length)}
              icon="people-outline"
              color="#4F8EF7"
            />
            <StatCard
              label="Cinemas"
              value="0"
              icon="business-outline"
              color="#F4A62A"
            />
          </>
        ) : (
          <View style={styles.statsLoading}>
            <ActivityIndicator color="#E50914" />
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Manage</Text>
      {manageItems.map((item) => (
        <ManageCard
          key={item.key}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
          color={item.color}
          onPress={item.onPress}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  greeting: { color: "#9A9AA8", fontSize: 13 },
  adminName: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  logoutButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 28, minHeight: 90 },
  statsLoading: { flex: 1, justifyContent: "center", alignItems: "center" },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
});
