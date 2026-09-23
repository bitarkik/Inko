import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'PrintPanda' }} />
      <Stack.Screen name="store/[id]" options={{ title: 'Upload Document' }} />
      <Stack.Screen name="order/[id]" options={{ title: 'Order Status' }} />
    </Stack>
  );
}
