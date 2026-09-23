import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { useI18n } from '../i18n';
import { apiClient } from '../api/client';

export default function CheckoutScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const { uri, name, totalPages, totalPrice, colorMode, sidedMode, copies } = useLocalSearchParams();
  
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [payment, setPayment] = useState('bKash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/stores');
      setStores(response.data);
      if (response.data.length > 0) {
        setSelectedStore(response.data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };

  const placeOrder = async () => {
    if (!selectedStore) {
      Alert.alert('Error', 'Please select a shop first.');
      return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('document', {
        uri: uri,
        name: name || 'Document.pdf',
        type: 'application/pdf',
      } as any);
      
      formData.append('storeId', selectedStore);
      formData.append('totalPages', totalPages as string);
      formData.append('totalPrice', totalPrice as string);
      
      const tPages = parseInt(totalPages as string, 10) || 1;
      const colorPagesArray = colorMode === 'Color' ? Array.from({ length: tPages }, (_, i) => i + 1) : [];
      const bwPagesArray = colorMode === 'B&W' ? Array.from({ length: tPages }, (_, i) => i + 1) : [];
      
      formData.append('colorPages', colorPagesArray.join(','));
      formData.append('bwPages', bwPagesArray.join(','));
      
      const response = await apiClient.post('/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Navigate to tracker screen with the new order ID and payment method
      router.replace({
        pathname: `/order/${response.data.id}`,
        params: { payment }
      });
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const selectedStoreName = stores.find(s => s.id === selectedStore)?.name || '';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{t('checkout') || 'Checkout'}</Text>
          <Text style={styles.headerSub}>Select shop and pay</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>{t('chooseShop')}</Text>
        
        {stores.map(store => (
          <TouchableOpacity 
            key={store.id} 
            style={[styles.shopCard, selectedStore === store.id && styles.shopCardSelected]}
            onPress={() => setSelectedStore(store.id)}
          >
            <View style={styles.shopRow}>
              <View>
                <Text style={styles.shopName}>{store.name} <Text style={styles.rating}>4.9 ★</Text></Text>
                <Text style={styles.metaText}>{store.address}</Text>
              </View>
              <View style={[styles.radio, selectedStore === store.id && styles.radioSelected]}>
                {selectedStore === store.id && <View style={styles.radioDot} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.orderSummary}>
          <View style={styles.summaryTop}>
            <Text style={styles.summaryFile} numberOfLines={1}>{name}</Text>
            <Text style={styles.summaryPrice}>৳{totalPrice}</Text>
          </View>
          <View style={styles.summaryGrid}>
            <View>
              <Text style={styles.summaryLabel}>PRINT</Text>
              <Text style={styles.summaryValue}>{totalPages} pages</Text>
            </View>
            <View>
              <Text style={styles.summaryLabel}>MODE</Text>
              <Text style={styles.summaryValue}>{colorMode} · {sidedMode}</Text>
            </View>
            <View>
              <Text style={styles.summaryLabel}>COPIES</Text>
              <Text style={styles.summaryValue}>{copies} copy</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('payWith')}</Text>
        
        <TouchableOpacity style={[styles.payRow, payment === 'bKash' && styles.payRowSelected]} onPress={() => setPayment('bKash')}>
          <View style={[styles.payLogo, { backgroundColor: '#d81b60' }]}><Text style={styles.payLogoText}>bK</Text></View>
          <View style={styles.payText}>
            <Text style={styles.payName}>bKash</Text>
            <Text style={styles.payDesc}>Secure mobile payment</Text>
          </View>
          <View style={[styles.radio, payment === 'bKash' && styles.radioSelected]}>
            {payment === 'bKash' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.payRow, payment === 'Cash' && styles.payRowSelected]} onPress={() => setPayment('Cash')}>
          <View style={[styles.payLogo, { backgroundColor: '#1f2937' }]}><Text style={styles.payLogoText}>৳</Text></View>
          <View style={styles.payText}>
            <Text style={styles.payName}>{t('cash')}</Text>
            <Text style={styles.payDesc}>Pay when you collect your prints</Text>
          </View>
          <View style={[styles.radio, payment === 'Cash' && styles.radioSelected]}>
            {payment === 'Cash' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>

      </ScrollView>

      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom + 8, 16) }]}>
        <TouchableOpacity style={styles.fullBtn} onPress={placeOrder} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.fullBtnText}>{t('placeOrder')} · ৳{totalPrice}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 50,
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
  headerSub: { fontSize: 10, color: theme.colors.muted, marginTop: 2 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 12, marginTop: 12 },
  
  shopCard: {
    backgroundColor: theme.colors.card,
    borderWidth: 1, borderColor: theme.colors.border,
    borderRadius: 16, padding: 16,
    marginBottom: 12,
  },
  shopCardSelected: {
    borderColor: theme.colors.brand,
    backgroundColor: theme.colors.soft,
  },
  shopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shopName: { fontSize: 15, fontWeight: '700', color: theme.colors.text },
  rating: { fontSize: 12, color: '#b7791f' },
  metaText: { fontSize: 12, color: theme.colors.muted, marginTop: 4 },
  
  radio: {
    width: 20, height: 20,
    borderRadius: 10,
    borderWidth: 2, borderColor: theme.colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioSelected: { borderColor: theme.colors.brand },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.brand },

  orderSummary: {
    backgroundColor: theme.colors.soft,
    borderRadius: 16, padding: 16,
    marginVertical: 16,
  },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryFile: { fontSize: 13, fontWeight: '700', color: theme.colors.text, flex: 1, marginRight: 16 },
  summaryPrice: { fontSize: 13, fontWeight: '700', color: theme.colors.text },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 10, color: theme.colors.muted, marginBottom: 4 },
  summaryValue: { fontSize: 12, fontWeight: '700', color: theme.colors.text },

  payRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderWidth: 1, borderColor: theme.colors.border,
    borderRadius: 16, padding: 12,
    marginBottom: 12,
  },
  payRowSelected: { borderColor: theme.colors.brand },
  payLogo: {
    width: 44, height: 36,
    borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  payLogoText: { color: 'white', fontWeight: '800', fontSize: 12 },
  payText: { flex: 1 },
  payName: { fontSize: 14, fontWeight: '700', color: theme.colors.text },
  payDesc: { fontSize: 11, color: theme.colors.muted, marginTop: 2 },

  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: theme.colors.nav,
    borderTopWidth: 1, borderTopColor: theme.colors.border,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  fullBtn: {
    backgroundColor: theme.colors.brand,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  fullBtnText: { color: 'white', fontSize: 15, fontWeight: '800' }
});
