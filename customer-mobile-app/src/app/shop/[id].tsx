import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { theme } from '../../theme';
import { useI18n } from '../../i18n';
import { apiClient } from '../../api/client';
import { STORE_METADATA } from '../../data/storeMetadata';

export default function ShopDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStore();
  }, [id]);

  const fetchStore = async () => {
    try {
      const response = await apiClient.get('/stores');
      const found = response.data.find((s: any) => s.id === id);
      if (found) {
        const metadata = STORE_METADATA[found.id] || {};
        setStore({
          ...found,
          latitude: found.latitude ?? metadata.latitude ?? 23.7,
          longitude: found.longitude ?? metadata.longitude ?? 90.4,
          city: found.city || metadata.city || 'Unknown',
          area: found.area || metadata.area || 'Unknown',
          services: found.services?.length ? found.services : (metadata.services || []),
          openTime: found.openTime || metadata.openTime || '9 AM',
          closeTime: found.closeTime || metadata.closeTime || '8 PM',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pickDocumentAndOrder = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: true });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        router.push({ pathname: '/config', params: { uri: result.assets[0].uri, name: result.assets[0].name, storeId: id } });
      }
    } catch (error) { console.error(error); }
  };

  if (loading || !store) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.brand} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? insets.top + 10 : 50 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={styles.mapContainer}>
          <MapView 
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            initialRegion={{
              latitude: store.latitude,
              longitude: store.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: store.latitude, longitude: store.longitude }} title={store.name} />
          </MapView>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.shopName}>{store.name}</Text>
          <Text style={styles.address}>{store.address}</Text>
          <Text style={styles.region}>{store.area}, {store.city}</Text>

          <View style={styles.timeBadge}>
            <Ionicons name="time-outline" size={16} color={theme.colors.brandDark} />
            <Text style={styles.timeText}>{store.openTime} - {store.closeTime}</Text>
          </View>

          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesGrid}>
            {store.services.map((service: string, i: number) => (
              <View key={i} style={styles.serviceChip}>
                <Ionicons name="checkmark-circle" size={14} color={theme.colors.brand} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>

          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>Starting Print Price</Text>
            <Text style={styles.priceValue}>৳{store.basePrice} / page</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom + 8, 16) }]}>
        <TouchableOpacity style={styles.orderBtn} onPress={pickDocumentAndOrder}>
          <Ionicons name="print" size={20} color="white" />
          <Text style={styles.orderBtnText}>Print Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  backBtn: {
    width: 34, height: 34,
    borderWidth: 1, borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    borderRadius: 11,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: { fontSize: 17, fontWeight: '800', color: theme.colors.text },
  
  mapContainer: { height: 200, width: '100%' },
  map: { width: '100%', height: '100%' },
  
  infoSection: { padding: 20, backgroundColor: theme.colors.surface, marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  shopName: { fontSize: 22, fontWeight: '800', color: theme.colors.text, marginBottom: 4 },
  address: { fontSize: 14, color: theme.colors.text, marginBottom: 2 },
  region: { fontSize: 12, color: theme.colors.muted, marginBottom: 12 },
  
  timeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.soft, alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, marginBottom: 24 },
  timeText: { fontSize: 13, fontWeight: '700', color: theme.colors.brandDark, marginLeft: 6 },
  
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  serviceChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  serviceText: { fontSize: 13, fontWeight: '600', color: theme.colors.text, marginLeft: 6 },
  
  priceCard: { backgroundColor: theme.colors.brandInk, padding: 20, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600' },
  priceValue: { color: 'white', fontSize: 18, fontWeight: '800' },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1, borderTopColor: theme.colors.border,
    padding: 16,
  },
  orderBtn: {
    backgroundColor: theme.colors.brand,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  orderBtnText: { color: 'white', fontSize: 16, fontWeight: '800' }
});
