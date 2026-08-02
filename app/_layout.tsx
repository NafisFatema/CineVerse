import { MoviesProvider } from "@/context/moviecontext";
import { UsersProvider } from "@/context/usercontext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <MoviesProvider>
      <UsersProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
      </UsersProvider>
    </MoviesProvider>
  );
}
