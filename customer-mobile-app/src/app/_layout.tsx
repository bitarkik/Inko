import { Stack } from 'expo-router';
import { I18nProvider } from '../i18n';

export default function RootLayout() {
  return (
    <I18nProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="store/[id]" options={{ title: 'Configure Print' }} />
        <Stack.Screen name="order/[id]" options={{ title: 'Order Status' }} />
      </Stack>
    </I18nProvider>
  );
}
