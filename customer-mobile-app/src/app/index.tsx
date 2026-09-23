import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { apiClient } from '../api/client';

interface PrintStore {
  id: string;
  name: string;
  address: string;
  basePrice: number;
}

export default function HomeScreen() {
  const [stores, setStores] = useState<PrintStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/stores');
      setStores(response.data);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStores();
  };

  const renderStore = ({ item }: { item: PrintStore }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => router.push(`/store/${item.id}`)}
    >
      <View style={styles.storeHeader}>
        <Text style={styles.storeName}>{item.name}</Text>
      </View>
      <Text style={styles.storeAddress}>{item.address}</Text>
      <Text style={styles.storePrice}>Base Price: ${Number(item.basePrice).toFixed(2)}</Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Select a Print Shop</Text>
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={renderStore}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  storeCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  storePrice: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '600',
  },
});
