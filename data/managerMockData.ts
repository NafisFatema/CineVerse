import { ImageSourcePropType } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  releaseDate: string;
  language: string;
  posterImage: ImageSourcePropType;
  status: 'Now Showing' | 'Coming Soon';
}

// Local poster images bundled with the app - no internet needed.
export const initialMovies: Movie[] = [
  {
    id: 'm1',
    title: 'Edge of Tomorrow Night',
    genre: 'Action, Adventure',
    duration: '2h 8m',
    releaseDate: '2026-05-12',
    language: 'English',
    posterImage: require('../assets/posters/poster-1.png'),
    status: 'Now Showing',
  },
  {
    id: 'm2',
    title: 'Silent Harbor',
    genre: 'Thriller',
    duration: '1h 54m',
    releaseDate: '2026-06-01',
    language: 'English',
    posterImage: require('../assets/posters/poster-2.png'),
    status: 'Now Showing',
  },
  {
    id: 'm3',
    title: 'Loveline',
    genre: 'Romance, Drama',
    duration: '2h 2m',
    releaseDate: '2026-04-20',
    language: 'Bangla',
    posterImage: require('../assets/posters/poster-3.png'),
    status: 'Now Showing',
  },
  {
    id: 'm4',
    title: 'Chronicles of Dust',
    genre: 'Animation, Comedy',
    duration: '1h 41m',
    releaseDate: '2026-07-20',
    language: 'English',
    posterImage: require('../assets/posters/poster-4.png'),
    status: 'Coming Soon',
  },
];
