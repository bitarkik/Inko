import axios from 'axios';

// During development, if using Android emulator, 10.0.2.2 points to localhost.
// If testing on a physical device, this should be set to your PC's local IP address.
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://printpanda-api.onrender.com';

export const apiClient = axios.create({
  baseURL: API_URL,
});
