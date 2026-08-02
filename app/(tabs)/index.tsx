import { Redirect } from 'expo-router';

export default function HomeScreen() {
  // Skip the starter "Welcome" screen and open the app straight into
  // the Cinema Manager login screen.
  return <Redirect href="/manager/login" />;
}
