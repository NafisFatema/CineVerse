import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1E1E1E" },
        headerTintColor: "#FFFFFF",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="admindashboard" options={{ headerShown: false }} />
      <Stack.Screen name="movieform" options={{ title: "" }} />
    </Stack>
  );
}
