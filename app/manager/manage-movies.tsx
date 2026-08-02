import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { managerService } from '../../services/managerService';
import { Movie } from '../../data/managerMockData';

const COLORS = {
  black: '#141414',
  darkGray: '#1F1F1F',
  cardGray: '#2A2A2A',
  red: '#E50914',
  white: '#FFFFFF',
  lightGray: '#B3B3B3',
  border: '#3A3A3A',
  success: '#2ECC71',
};

export default function ManageMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadMovies = useCallback(async () => {
    setLoading(true);
    const data = await managerService.getMovies();
    setMovies(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [loadMovies])
  );

  const filtered = movies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (movie: Movie) => {
    Alert.alert('Delete Movie', `Remove "${movie.title}" from your listings?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await managerService.removeMovie(movie.id);
          loadMovies();
        },
      },
    ]);
  };

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Manage Movies</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor={COLORS.lightGray}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/manager/add-movie')}>
          <Text style={styles.addButtonText}>+ Add Movie</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={COLORS.red} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No movies found.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardTouchable}
                onPress={() => router.push({ pathname: '/manager/manage-showtimes', params: { id: item.id } })}
              >
                <Image source={item.posterImage} style={styles.poster} />
                <View style={styles.cardInfo}>
                  <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.movieMeta}>{item.genre}</Text>
                  <Text style={styles.movieMeta}>{item.duration}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'Now Showing' ? styles.statusNow : styles.statusSoon,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        item.status === 'Now Showing' ? styles.statusTextNow : styles.statusTextSoon,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Text style={styles.deleteText}>Delete Movie</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.black },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 16,
  },
  back: { color: COLORS.white, fontSize: 26 },
  title: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  searchRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 10 },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButton: { backgroundColor: COLORS.red, borderRadius: 6, paddingHorizontal: 14, justifyContent: 'center' },
  addButtonText: { color: COLORS.white, fontWeight: '700', fontSize: 13 },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  empty: { color: COLORS.lightGray, textAlign: 'center', marginTop: 60 },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkGray,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  cardTouchable: { flexDirection: 'row', flex: 1 },
  poster: { width: 70, height: 100, backgroundColor: COLORS.cardGray },
  cardInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  movieTitle: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  movieMeta: { color: COLORS.lightGray, fontSize: 12, marginTop: 2 },
  statusBadge: { alignSelf: 'flex-start', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 6 },
  statusNow: { backgroundColor: 'rgba(46, 204, 113, 0.15)' },
  statusSoon: { backgroundColor: 'rgba(179, 179, 179, 0.15)' },
  statusText: { fontSize: 11, fontWeight: '700' },
  statusTextNow: { color: COLORS.success },
  statusTextSoon: { color: COLORS.lightGray },
  deleteText: { color: '#FF6B6B', fontSize: 12, fontWeight: '600' },
});
