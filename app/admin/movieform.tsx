import { useMovies } from "@/context/moviecontext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const COLOR_OPTIONS = [
  "#1E3A5F",
  "#2C2C54",
  "#0F3460",
  "#1A1A1A",
  "#6B1E1E",
  "#3C3C1E",
  "#4A1E6B",
  "#1E6B4A",
];

export default function MovieFormScreen() {
  const { movies, addMovie, updateMovie } = useMovies();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [titleError, setTitleError] = useState("");
  const [yearError, setYearError] = useState("");

  useEffect(() => {
    if (!id) return;
    const existingMovie = movies.find((m) => m.id === id);
    if (existingMovie) {
      setTitle(existingMovie.title);
      setYear(String(existingMovie.year));
      setColor(existingMovie.color);
    }
  }, [id]);

  function validate() {
    let valid = true;

    if (!title.trim()) {
      setTitleError("Movie title is required");
      valid = false;
    } else {
      setTitleError("");
    }

    const yearNumber = Number(year);
    if (!year.trim()) {
      setYearError("Release year is required");
      valid = false;
    } else if (
      !Number.isInteger(yearNumber) ||
      yearNumber < 1900 ||
      yearNumber > 2100
    ) {
      setYearError("Enter a valid year (e.g. 2024)");
      valid = false;
    } else {
      setYearError("");
    }

    return valid;
  }

  function handleSave() {
    if (!validate()) return;

    if (isEditMode && id) {
      updateMovie(id, { title: title.trim(), year: Number(year), color });
      Alert.alert("Updated", `"${title.trim()}" has been updated.`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      addMovie({ title: title.trim(), year: Number(year), color });
      Alert.alert("Added", `"${title.trim()}" has been added.`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>
        {isEditMode ? "Edit Movie" : "Add Movie"}
      </Text>

      <Text style={styles.label}>Movie Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Titanic"
        placeholderTextColor="#777"
        value={title}
        onChangeText={setTitle}
      />
      {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

      <Text style={styles.label}>Release Year</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 1997"
        placeholderTextColor="#777"
        value={year}
        onChangeText={setYear}
        keyboardType="number-pad"
        maxLength={4}
      />
      {yearError ? <Text style={styles.errorText}>{yearError}</Text> : null}

      <Text style={styles.label}>Poster Color</Text>
      <Text style={styles.hint}>
        Used as a placeholder until a real poster image is uploaded for this
        movie.
      </Text>
      <View style={styles.colorRow}>
        {COLOR_OPTIONS.map((option) => (
          <Pressable
            key={option}
            onPress={() => setColor(option)}
            style={[
              styles.colorSwatch,
              { backgroundColor: option },
              color === option && styles.colorSwatchSelected,
            ]}
          >
            {color === option && (
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            )}
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
          {isEditMode ? "Save Changes" : "Add Movie"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  content: { padding: 20, paddingBottom: 60 },
  header: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 24,
  },
  label: { color: "#BDBDBD", fontSize: 14, marginBottom: 6 },
  hint: { color: "#777", fontSize: 12, marginBottom: 10 },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: { color: "#FF6B6B", fontSize: 12, marginBottom: 12 },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 30,
  },
  colorSwatch: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorSwatchSelected: { borderColor: "#FFFFFF" },
  saveButton: {
    backgroundColor: "#E50914",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
