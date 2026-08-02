import SearchBar from "@/components/searchbar";
import { useUsers } from "@/context/usercontext";
import { MockUser } from "@/data/users";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ROLE_LABELS: Record<MockUser["role"], string> = {
  admin: "Admin",
  manager: "Manager",
  registered: "Registered User",
};

const ROLE_COLORS: Record<MockUser["role"], string> = {
  admin: "#E50914",
  manager: "#F4A62A",
  registered: "#4F8EF7",
};

export default function AdminManageUsersScreen() {
  const { users, deleteUser } = useUsers();
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      user.email.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function handleDeleteUser(user: MockUser) {
    if (user.role === "admin") {
      Alert.alert("Not Allowed", "You can't delete an Admin account.");
      return;
    }

    Alert.alert("Remove User", `Remove ${user.name} (${user.email})?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => deleteUser(user.email),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Manage Users</Text>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search by name or email..."
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.email}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <View
              style={[
                styles.roleBadge,
                { backgroundColor: `${ROLE_COLORS[item.role]}22` },
              ]}
            >
              <Text
                style={[styles.roleText, { color: ROLE_COLORS[item.role] }]}
              >
                {ROLE_LABELS[item.role]}
              </Text>
            </View>
            <Pressable
              onPress={() => handleDeleteUser(item)}
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
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  rowText: { flex: 1 },
  userName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  userEmail: { color: "#9A9AA8", fontSize: 12, marginTop: 2 },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  roleText: { fontSize: 11, fontWeight: "700" },
  iconButton: { padding: 6 },
});
