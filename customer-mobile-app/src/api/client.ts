import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://printpanda-api.onrender.com';

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
