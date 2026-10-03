import { useCallback, useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { I18nProvider } from '../i18n';
import { AuthProvider } from '../context/AuthContext';
import BootSplash from '../components/BootSplash';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    // Hide the native splash immediately — the animated BootSplash takes over from here.
    SplashScreen.hideAsync();
  }, []);

  const handleBootDone = useCallback(() => {
    setShowBoot(false);
  }, []);

  return (
    <AuthProvider>
      <I18nProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="store/[id]" options={{ title: 'Configure Print' }} />
          <Stack.Screen name="order/[id]" options={{ title: 'Order Status' }} />
          <Stack.Screen name="(auth)/login" options={{ presentation: 'modal' }} />
        </Stack>
        {showBoot && <BootSplash onDone={handleBootDone} />}
      </I18nProvider>
    </AuthProvider>
  );
}
