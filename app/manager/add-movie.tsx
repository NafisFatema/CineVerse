import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import FormField from '../../components/FormField';
import { managerService } from '../../services/managerService';

const COLORS = {
  black: '#141414',
  darkGray: '#1F1F1F',
  red: '#E50914',
  white: '#FFFFFF',
  lightGray: '#B3B3B3',
  border: '#3A3A3A',
};

const GENRES = ['Select genre', 'Action', 'Comedy', 'Drama', 'Thriller', 'Adventure', 'Animation', 'Romance'];
const LANGUAGES = ['Select language', 'English', 'Bangla', 'Hindi', 'Korean'];
const PLACEHOLDER_POSTER = require('../../assets/posters/poster-new.png');

export default function AddMovie() {
  const [title, setTitle] = useState('');
  const [genreIndex, setGenreIndex] = useState(0);
  const [duration, setDuration] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [languageIndex, setLanguageIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [posterUri, setPosterUri] = useState<string | null>(null);

  const handleUploadPoster = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow photo access to upload a poster.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      setPosterUri(result.assets[0].uri);
    }
  };

  const cycleGenre = () => setGenreIndex((i) => (i + 1) % GENRES.length);
  const cycleLanguage = () => setLanguageIndex((i) => (i + 1) % LANGUAGES.length);

  const handleSave = async () => {
    setSaving(true);
    const newMovie = await managerService.addMovie({
      title: title || 'Untitled Movie',
      genre: GENRES[genreIndex] === 'Select genre' ? 'Uncategorized' : GENRES[genreIndex],
      duration: duration || 'N/A',
      releaseDate: releaseDate || 'N/A',
      language: LANGUAGES[languageIndex] === 'Select language' ? 'N/A' : LANGUAGES[languageIndex],
      posterImage: posterUri ? { uri: posterUri } : PLACEHOLDER_POSTER,
      status: 'Coming Soon',
    });
    setSaving(false);
    router.push({ pathname: '/manager/manage-showtimes', params: { id: newMovie.id } });
  };

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Movie</Text>
        <View style={{ width: 20 }} />
      </View>

      <TouchableOpacity style={styles.uploadBox} onPress={handleUploadPoster}>
        <Image
          source={posterUri ? { uri: posterUri } : PLACEHOLDER_POSTER}
          style={styles.uploadPreview}
        />
        <View style={styles.uploadOverlay}>
          <Text style={styles.uploadText}>{posterUri ? 'Tap to change poster' : 'Tap to upload poster'}</Text>
          <Text style={styles.uploadHint}>JPG, PNG (Max 2MB)</Text>
        </View>
      </TouchableOpacity>

      <FormField label="Title" placeholder="Enter movie title" value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Genre</Text>
      <TouchableOpacity style={styles.selectField} onPress={cycleGenre}>
        <Text style={styles.selectText}>{GENRES[genreIndex]}</Text>
        <Text style={styles.selectArrow}>⌄</Text>
      </TouchableOpacity>

      <FormField label="Duration" placeholder="Enter duration (e.g. 2h 30m)" value={duration} onChangeText={setDuration} />
      <FormField label="Release Date" placeholder="Select date" value={releaseDate} onChangeText={setReleaseDate} />

      <Text style={styles.label}>Language</Text>
      <TouchableOpacity style={styles.selectField} onPress={cycleLanguage}>
        <Text style={styles.selectText}>{LANGUAGES[languageIndex]}</Text>
        <Text style={styles.selectArrow}>⌄</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
        <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Movie'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.black },
  container: { paddingHorizontal: 20, paddingTop: 55, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  back: { color: COLORS.white, fontSize: 26 },
  title: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  uploadBox: { alignSelf: 'center', marginBottom: 24 },
  uploadPreview: { width: 160, height: 240, borderRadius: 10, backgroundColor: COLORS.darkGray },
  uploadOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  uploadText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  uploadHint: { color: COLORS.lightGray, fontSize: 10, marginTop: 2 },
  label: { color: COLORS.lightGray, fontSize: 13, marginBottom: 6, fontWeight: '600' },
  selectField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },
  selectText: { color: COLORS.white, fontSize: 15 },
  selectArrow: { color: COLORS.lightGray, fontSize: 16 },
  saveButton: { backgroundColor: COLORS.red, borderRadius: 6, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});
