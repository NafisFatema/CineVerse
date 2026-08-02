import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function BackButton() {
  function handlePress() {
    // router.canGoBack() tells us whether there's actually a previous
    // screen in history. If there isn't (e.g. app was reloaded directly
    // on this screen), go() would throw the error you saw — so instead
    // we send the user somewhere safe: the Welcome screen.
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/welcome");
    }
  }

  return (
    <Pressable onPress={handlePress} style={styles.button} hitSlop={10}>
      <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
});
