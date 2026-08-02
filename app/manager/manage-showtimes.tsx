import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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

const DATE_TABS = ['Today', 'Sat', 'Sun', 'Mon'];
const HALLS = [
  { name: 'Hall 1', times: ['10:30 AM', '1:30 PM', '4:30 PM', '7:30 PM'] },
  { name: 'Hall 2', times: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] },
  { name: 'Hall 3', times: ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'] },
];

export default function ManageShowtimes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    (async () => {
      const movies = await managerService.getMovies();
      setMovie(movies.find((m) => m.id === id) || movies[0] || null);
      setLoading(false);
    })();
  }, [id]);

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Manage Showtimes</Text>
        <View style={{ width: 20 }} />
      </View>

      {loading ? (
        <ActivityIndicator color={COLORS.red} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          {movie && (
            <View style={styles.movieCard}>
              <Image source={movie.posterImage} style={styles.poster} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieMeta}>{movie.genre} · {movie.duration}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{movie.status}</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.dateTabs}>
            {DATE_TABS.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                style={[styles.dateTab, activeTab === index && styles.dateTabActive]}
                onPress={() => setActiveTab(index)}
              >
                <Text style={[styles.dateTabText, activeTab === index && styles.dateTabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {HALLS.map((hall) => (
            <View key={hall.name} style={styles.hallBlock}>
              <View style={styles.hallHeader}>
                <Text style={styles.hallName}>{hall.name}</Text>
                <View style={styles.hallIcons}>
                  <TouchableOpacity onPress={() => Alert.alert('Edit', `Edit ${hall.name} showtimes.`)}>
                    <Text style={styles.icon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete ${hall.name} showtimes?`)}>
                    <Text style={styles.icon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.timeGrid}>
                {hall.times.map((time) => (
                  <View key={time} style={styles.timeChip}>
                    <Text style={styles.timeText}>{time}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/manager/add-showtime')}>
            <Text style={styles.addButtonText}>+ Add Showtime</Text>
          </TouchableOpacity>
        </ScrollView>
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
  body: { paddingHorizontal: 20, paddingBottom: 60 },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkGray,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    alignItems: 'center',
  },
  poster: { width: 60, height: 84, borderRadius: 6, backgroundColor: COLORS.cardGray },
  movieTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  movieMeta: { color: COLORS.lightGray, fontSize: 12, marginTop: 4 },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 6,
  },
  statusText: { color: COLORS.success, fontSize: 11, fontWeight: '700' },
  dateTabs: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  dateTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateTabActive: { backgroundColor: COLORS.red, borderColor: COLORS.red },
  dateTabText: { color: COLORS.lightGray, fontSize: 12, fontWeight: '600' },
  dateTabTextActive: { color: COLORS.white },
  hallBlock: { marginBottom: 18 },
  hallHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  hallName: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  hallIcons: { flexDirection: 'row', gap: 14 },
  icon: { fontSize: 15 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeChip: {
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  timeText: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
  addButton: { backgroundColor: COLORS.red, borderRadius: 6, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  addButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});
