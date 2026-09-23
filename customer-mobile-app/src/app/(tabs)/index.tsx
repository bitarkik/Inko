import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useI18n } from '../../i18n';
import { apiClient } from '../../api/client';

export default function HomeScreen() {
  const router = useRouter();
  const { t, toggleLang, lang } = useI18n();
  const [stores, setStores] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/stores');
      setStores(response.data);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStores();
    setRefreshing(false);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        // Route to the new config screen, passing the URI and name
        router.push({
          pathname: '/config',
          params: { uri: pickedFile.uri, name: pickedFile.name }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBarSpacing} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.topline}>
          <Text style={styles.wordmark}>PrintPanda</Text>
          <TouchableOpacity style={styles.langBtn} onPress={toggleLang}>
            <Text style={styles.langText}>
              {lang === 'en' ? <Text style={styles.activeLang}>EN</Text> : 'EN'} / {lang === 'bn' ? <Text style={styles.activeLang}>বাংলা</Text> : 'বাংলা'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.location}>
          <Ionicons name="location" size={14} color={theme.colors.brand} />
          <Text style={styles.locationText}>Nilkhet, Dhaka</Text>
        </View>

        <Text style={styles.greeting}>{t('greeting')}</Text>

        <View style={styles.hero}>
          <Text style={styles.heroKicker}>{t('fast')}</Text>
          <Text style={styles.heroTitle}>{t('quick')}</Text>
          <Text style={styles.heroSub}>{t('formats')}</Text>
          
          <TouchableOpacity style={styles.heroBtn} onPress={pickDocument}>
            <Ionicons name="document-text" size={18} color={theme.colors.brandInk} />
            <Text style={styles.heroBtnText}>{t('selectFile')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>{t('nearby')}</Text>
          <View style={styles.seg}>
            <TouchableOpacity 
              style={[styles.segBtn, viewMode === 'list' && styles.segBtnActive]}
              onPress={() => setViewMode('list')}
            >
              <Text style={[styles.segText, viewMode === 'list' && styles.segTextActive]}>{t('list')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.segBtn, viewMode === 'map' && styles.segBtnActive]}
              onPress={() => setViewMode('map')}
            >
              <Text style={[styles.segText, viewMode === 'map' && styles.segTextActive]}>{t('map')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {viewMode === 'list' ? (
          <View style={styles.shopList}>
            {stores.map(store => (
              <TouchableOpacity key={store.id} style={styles.shopCard}>
                <View style={styles.shopRow}>
                  <View>
                    <Text style={styles.shopName}>{store.name} <Text style={styles.rating}>4.9 ★</Text></Text>
                    <View style={styles.meta}>
                      <Text style={styles.metaText}>{store.address}</Text>
                      <Text style={styles.price}>৳{store.basePrice}/page</Text>
                    </View>
                  </View>
                  <View style={[styles.queue, styles.queueGreen]}>
                    <View style={styles.queueDot} />
                    <Text style={styles.queueText}>Idle</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.mapMock}>
            <Text style={styles.mapNote}>Map view requires API keys.</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  statusBarSpacing: {
    height: Platform.OS === 'android' ? 40 : 50,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  topline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wordmark: {
    fontSize: 21,
    fontWeight: '800',
    color: theme.colors.text,
  },
  langBtn: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
  },
  activeLang: {
    color: theme.colors.brand,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 12,
    color: theme.colors.muted,
    marginLeft: 4,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.muted,
    marginBottom: 12,
  },
  hero: {
    backgroundColor: theme.colors.brandInk,
    borderRadius: 21,
    padding: 20,
    marginBottom: 24,
  },
  heroKicker: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  heroBtn: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroBtnText: {
    color: theme.colors.brandInk,
    fontWeight: '800',
    marginLeft: 8,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  seg: {
    flexDirection: 'row',
    backgroundColor: theme.colors.soft,
    borderRadius: 10,
    padding: 4,
  },
  segBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  segBtnActive: {
    backgroundColor: theme.colors.card,
  },
  segText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.muted,
  },
  segTextActive: {
    color: theme.colors.brandInk,
  },
  shopList: {
    gap: 12,
  },
  shopCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 12,
  },
  shopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  shopName: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#b7791f',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text,
    marginLeft: 8,
  },
  queue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  queueGreen: {
    backgroundColor: theme.colors.soft,
  },
  queueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandDark,
    marginRight: 4,
  },
  queueText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.brandDark,
  },
  mapMock: {
    height: 200,
    backgroundColor: theme.colors.soft,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapNote: {
    color: theme.colors.muted,
    fontSize: 12,
  }
});
