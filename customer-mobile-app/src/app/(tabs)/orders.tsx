import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get(`/orders/me?userId=${user?.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    if (user) {
      setRefreshing(true);
      fetchOrders();
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.brand} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons name="document-text-outline" size={64} color={theme.colors.border} />
        <Text style={styles.emptyTitle}>Log in to see orders</Text>
        <Text style={styles.emptySub}>Your print history will appear here.</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? insets.top + 10 : 50 }]}>
        <Text style={styles.headerTitle}>Order History</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {orders.length === 0 ? (
          <View style={styles.centered}>
            <Ionicons name="receipt-outline" size={64} color={theme.colors.border} />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySub}>When you print something, it will show up here.</Text>
          </View>
        ) : (
          orders.map((order) => (
            <TouchableOpacity 
              key={order.id} 
              style={styles.orderCard}
              onPress={() => router.push({ pathname: `/order/${order.id}`, params: { payment: order.paymentMethod } })}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.storeName}>{order.store?.name || 'PrintPanda Shop'}</Text>
                <View style={[styles.statusBadge, order.status === 'CANCELLED' && { backgroundColor: theme.colors.redBg }]}>
                  <Text style={[styles.statusText, order.status === 'CANCELLED' && { color: theme.colors.red }]}>
                    {order.status.replace(/_/g, ' ')}
                  </Text>
                </View>
              </View>
              <View style={styles.orderDetails}>
                <View>
                  <Text style={styles.detailTitle}>{order.totalPages} Pages</Text>
                  <Text style={styles.detailSub}>{new Date(order.createdAt).toLocaleDateString()}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.price}>৳{order.totalPrice}</Text>
                  <Text style={styles.detailSub}>{order.paymentMethod}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: {
    paddingHorizontal: 16, paddingBottom: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1, borderBottomColor: theme.colors.border,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: theme.colors.text },
  logoutBtn: { backgroundColor: theme.colors.soft, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  logoutText: { fontSize: 12, fontWeight: '700', color: theme.colors.brandDark },
  content: { padding: 16, gap: 12 },
  
  emptyTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginTop: 16, marginBottom: 8 },
  emptySub: { fontSize: 14, color: theme.colors.muted, textAlign: 'center', marginBottom: 24 },
  loginBtn: { backgroundColor: theme.colors.brand, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  loginBtnText: { color: 'white', fontWeight: '800', fontSize: 15 },

  orderCard: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, padding: 16 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  storeName: { fontSize: 15, fontWeight: '700', color: theme.colors.text },
  statusBadge: { backgroundColor: theme.colors.soft, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '800', color: theme.colors.brandDark },
  orderDetails: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailTitle: { fontSize: 14, fontWeight: '600', color: theme.colors.text },
  detailSub: { fontSize: 12, color: theme.colors.muted, marginTop: 2 },
  price: { fontSize: 15, fontWeight: '800', color: theme.colors.brandInk },
});
