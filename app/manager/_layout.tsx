import { Stack } from 'expo-router';

const COLORS = { black: '#141414' };

export default function ManagerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.black },
      }}
    />
  );
}
