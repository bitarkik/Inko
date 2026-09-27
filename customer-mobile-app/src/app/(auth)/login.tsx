import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { apiClient } from '../../api/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone || !password || (isRegistering && !name)) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const payload = isRegistering ? { phone, name, password } : { phone, password };
      
      const response = await apiClient.post(endpoint, payload);
      
      await login(response.data.user, response.data.token);
      
      if (isRegistering) {
        Alert.alert(
          'Account Created!', 
          'Your account has been created successfully.',
          [{ text: 'Great', onPress: () => router.back() }]
        );
      } else {
        router.back();
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { paddingTop: Platform.OS === 'android' ? insets.top + 20 : 60 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Welcome Back'}</Text>
        <Text style={styles.subtitle}>Sign in to save your documents and track your print orders.</Text>
      </View>

      <View style={styles.form}>
        {isRegistering && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="John Doe" />
          </View>
        )}
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput 
            style={styles.input} 
            value={phone} 
            onChangeText={setPhone} 
            placeholder="01xxxxxxxxx" 
            keyboardType="phone-pad" 
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            placeholder="••••••••" 
            secureTextEntry 
          />
        </View>

        <TouchableOpacity 
          style={[styles.primaryBtn, loading && { opacity: 0.7 }]} 
          onPress={handleSubmit} 
          disabled={loading}
        >
          <Text style={styles.primaryBtnText}>{isRegistering ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchBtn} onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface, padding: 24 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: theme.colors.muted, lineHeight: 20 },
  form: { gap: 20 },
  inputGroup: { gap: 6 },
  label: { fontSize: 12, fontWeight: '700', color: theme.colors.muted, textTransform: 'uppercase' },
  input: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 14, fontSize: 16, color: theme.colors.text },
  primaryBtn: { backgroundColor: theme.colors.brand, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  primaryBtnText: { color: 'white', fontWeight: '800', fontSize: 16 },
  switchBtn: { alignItems: 'center', padding: 12 },
  switchText: { color: theme.colors.brandDark, fontWeight: '600', fontSize: 14 }
});
