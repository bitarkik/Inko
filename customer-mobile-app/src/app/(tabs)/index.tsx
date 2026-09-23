import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Platform, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { useI18n } from '../../i18n';
import { apiClient } from '../../api/client';
import { STORE_METADATA } from '../../data/storeMetadata';

// Haversine formula to calculate distance in km
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default function HomeScreen() {
  const router = useRouter();
  const { t, toggleLang, lang } = useI18n();
  const insets = useSafeAreaInsets();
  
  const [stores, setStores] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [addressText, setAddressText] = useState('Locating...');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  useEffect(() => {
    setupLocation();
    fetchStores();
  }, []);

  const setupLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setAddressText('Location permission denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
    
    // Reverse geocode
    const geocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
    
    if (geocode.length > 0) {
      setAddressText(`${geocode[0].district || geocode[0].city || 'Unknown Area'}, ${geocode[0].region || geocode[0].country || ''}`);
    } else {
      setAddressText('Location found');
    }
  };

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/stores');
      const enrichedStores = response.data.map((store: any) => ({
        ...store,
        ...(STORE_METADATA[store.id] || { latitude: 23.7, longitude: 90.4, city: 'Unknown', area: 'Unknown' })
      }));
      setStores(enrichedStores);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStores();
    if (!userLocation) await setupLocation();
    setRefreshing(false);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: true });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        router.push({ pathname: '/config', params: { uri: result.assets[0].uri, name: result.assets[0].name } });
      }
    } catch (error) { console.error(error); }
  };

  // Filter and Sort logic
  const cities = Array.from(new Set(stores.map(s => s.city).filter(Boolean)));
  const areas = selectedCity ? Array.from(new Set(stores.filter(s => s.city === selectedCity).map(s => s.area).filter(Boolean))) : [];

  let displayedStores = stores;
  
  if (searchQuery) {
    displayedStores = displayedStores.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  if (selectedCity) {
    displayedStores = displayedStores.filter(s => s.city === selectedCity);
  }
  if (selectedArea) {
    displayedStores = displayedStores.filter(s => s.area === selectedArea);
  }

  // Calculate distances and sort
  if (userLocation) {
    displayedStores = displayedStores.map(store => ({
      ...store,
      distance: getDistance(userLocation.coords.latitude, userLocation.coords.longitude, store.latitude, store.longitude)
    })).sort((a, b) => a.distance - b.distance);
  }

  // Keep top 5 if no filters applied, otherwise show all matching
  if (!searchQuery && !selectedCity && !selectedArea) {
    displayedStores = displayedStores.slice(0, 5);
  }

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insets.top + 10 : 50 }} />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
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
          <Text style={styles.locationText}>{addressText}</Text>
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
        
        {/* Search & Filters */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={theme.colors.muted} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search shops..." 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {(selectedCity || searchQuery) && (
            <TouchableOpacity onPress={() => { setSelectedCity(null); setSelectedArea(null); setSearchQuery(''); }}>
              <Ionicons name="close-circle" size={18} color={theme.colors.muted} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cities.map(city => (
              <TouchableOpacity key={city as string} style={[styles.filterChip, selectedCity === city && styles.filterChipActive]} onPress={() => { setSelectedCity(city as string); setSelectedArea(null); }}>
                <Text style={[styles.filterChipText, selectedCity === city && styles.filterChipTextActive]}>{city as string}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {selectedCity && (
          <View style={styles.filterRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {areas.map(area => (
                <TouchableOpacity key={area as string} style={[styles.filterChip, selectedArea === area && styles.filterChipActive]} onPress={() => setSelectedArea(area as string)}>
                  <Text style={[styles.filterChipText, selectedArea === area && styles.filterChipTextActive]}>{area as string}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>{t('nearby')} {displayedStores.length > 0 ? `(${displayedStores.length})` : ''}</Text>
          <View style={styles.seg}>
            <TouchableOpacity style={[styles.segBtn, viewMode === 'list' && styles.segBtnActive]} onPress={() => setViewMode('list')}>
              <Text style={[styles.segText, viewMode === 'list' && styles.segTextActive]}>{t('list')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.segBtn, viewMode === 'map' && styles.segBtnActive]} onPress={() => setViewMode('map')}>
              <Text style={[styles.segText, viewMode === 'map' && styles.segTextActive]}>{t('map')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {viewMode === 'list' ? (
          <View style={styles.shopList}>
            {displayedStores.map(store => (
              <TouchableOpacity 
                key={store.id} 
                style={styles.shopCard}
                onPress={() => router.push(`/shop/${store.id}`)}
              >
                <View style={styles.shopRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.shopName}>{store.name} <Text style={styles.rating}>4.9 ★</Text></Text>
                    <View style={styles.meta}>
                      <Text style={styles.metaText}>{store.address}</Text>
                    </View>
                    <View style={styles.meta}>
                      <Text style={styles.distanceText}>
                        {store.distance !== undefined ? `${store.distance.toFixed(1)} km away` : ''}
                      </Text>
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
            {displayedStores.length === 0 && (
              <Text style={{ textAlign: 'center', color: theme.colors.muted, marginTop: 20 }}>No shops found.</Text>
            )}
          </View>
        ) : (
          <View style={styles.mapContainer}>
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: userLocation?.coords.latitude || 23.7,
                longitude: userLocation?.coords.longitude || 90.4,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation={true}
            >
              {displayedStores.map(store => (
                <Marker 
                  key={store.id}
                  coordinate={{ latitude: store.latitude, longitude: store.longitude }}
                  title={store.name}
                  description={`৳${store.basePrice}/page`}
                  onCalloutPress={() => router.push(`/shop/${store.id}`)}
                />
              ))}
            </MapView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  scrollContent: { padding: 16 },
  topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  wordmark: { fontSize: 21, fontWeight: '800', color: theme.colors.text },
  langBtn: { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.card, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 10 },
  langText: { fontSize: 12, fontWeight: '700', color: theme.colors.text },
  activeLang: { color: theme.colors.brand },
  location: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  locationText: { fontSize: 12, color: theme.colors.muted, marginLeft: 4 },
  greeting: { fontSize: 16, color: theme.colors.muted, marginBottom: 12 },
  hero: { backgroundColor: theme.colors.brandInk, borderRadius: 21, padding: 20, marginBottom: 16 },
  heroKicker: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.7)', marginBottom: 8 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#ffffff', marginBottom: 8 },
  heroSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
  heroBtn: { backgroundColor: '#ffffff', alignSelf: 'flex-start', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' },
  heroBtnText: { color: theme.colors.brandInk, fontWeight: '800', marginLeft: 8 },
  
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: theme.colors.text },
  filterRow: { flexDirection: 'row', marginBottom: 12 },
  filterChip: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  filterChipActive: { backgroundColor: theme.colors.soft, borderColor: theme.colors.brand },
  filterChipText: { fontSize: 12, color: theme.colors.muted, fontWeight: '600' },
  filterChipTextActive: { color: theme.colors.brandDark },

  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  seg: { flexDirection: 'row', backgroundColor: theme.colors.soft, borderRadius: 10, padding: 4 },
  segBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  segBtnActive: { backgroundColor: theme.colors.card },
  segText: { fontSize: 12, fontWeight: '700', color: theme.colors.muted },
  segTextActive: { color: theme.colors.brandInk },
  
  shopList: { gap: 12 },
  shopCard: { backgroundColor: theme.colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  shopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  shopName: { fontSize: 15, fontWeight: '700', color: theme.colors.text, marginBottom: 4 },
  rating: { fontSize: 12, color: '#b7791f' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 },
  metaText: { fontSize: 12, color: theme.colors.muted },
  distanceText: { fontSize: 12, fontWeight: '700', color: theme.colors.brand },
  price: { fontSize: 13, fontWeight: '700', color: theme.colors.text },
  
  queue: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 },
  queueGreen: { backgroundColor: theme.colors.soft },
  queueDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.brandDark, marginRight: 4 },
  queueText: { fontSize: 10, fontWeight: '700', color: theme.colors.brandDark },
  
  mapContainer: { height: 350, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.border },
  map: { width: '100%', height: '100%' }
});
