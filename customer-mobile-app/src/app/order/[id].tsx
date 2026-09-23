import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { apiClient } from '../../api/client';

export default function OrderStatusScreen() {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const fetchStatus = async () => {
      try {
        const response = await apiClient.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order status', error);
      }
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [id]);

  if (!order) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>Loading Order Details...</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#4caf50';
      case 'PRINTING': return '#2196f3';
      case 'PENDING': return '#ff9800';
      case 'FAILED': return '#f44336';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Live Order Status</Text>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        
        <View style={[styles.statusBox, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailText}>Store ID: {order.storeId}</Text>
          <Text style={styles.detailText}>Total Pages: {order.totalPages}</Text>
          <Text style={styles.detailText}>Color Pages: {order.colorPages.length}</Text>
          <Text style={styles.detailText}>B/W Pages: {order.bwPages.length}</Text>
          <View style={styles.divider} />
          <Text style={styles.priceText}>Total Paid: ${(order.totalPrice / 100).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  statusBox: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 24,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  details: {
    width: '100%',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'right',
  },
});
