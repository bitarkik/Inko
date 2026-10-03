import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Log Out', 
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive', 
          onPress: async () => {
            await logout();
            router.push('/');
          }
        }
      ]
    );
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons name="person-circle-outline" size={80} color={theme.colors.border} />
        <Text style={styles.emptyTitle}>You are not logged in</Text>
        <Text style={styles.emptySub}>Sign in to manage your account.</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginBtnText}>Log In or Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? insets.top + 20 : 60 }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="settings-outline" size={20} color={theme.colors.text} />
              <Text style={styles.menuText}>Account Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.muted} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle-outline" size={20} color={theme.colors.text} />
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.red} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 32, alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: theme.colors.muted }}>Version {Constants.expoConfig?.extra?.displayVersion || Constants.expoConfig?.version || '1.0.0'}</Text>
          {Updates.updateId && (
            <Text style={{ fontSize: 10, color: theme.colors.muted, marginTop: 4 }}>OTA ID: {Updates.updateId.substring(0, 8)}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  
  header: {
    alignItems: 'center',
    paddingBottom: 32,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1, borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: theme.colors.soft,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, fontWeight: '800', color: theme.colors.brandDark },
  name: { fontSize: 24, fontWeight: '800', color: theme.colors.text },
  phone: { fontSize: 15, color: theme.colors.muted, marginTop: 4 },
  
  content: { padding: 16, paddingTop: 32 },
  
  menuSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1, borderColor: theme.colors.border,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1, borderBottomColor: theme.colors.border,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuText: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: theme.colors.redBg,
    padding: 16, borderRadius: 16,
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: theme.colors.red },

  emptyTitle: { fontSize: 20, fontWeight: '700', color: theme.colors.text, marginTop: 16, marginBottom: 8 },
  emptySub: { fontSize: 15, color: theme.colors.muted, textAlign: 'center', marginBottom: 32 },
  loginBtn: { backgroundColor: theme.colors.brand, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  loginBtnText: { color: 'white', fontWeight: '800', fontSize: 16 },
});
