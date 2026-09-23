import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { useI18n } from '../../i18n';
import { apiClient } from '../../api/client';

export default function OrderTrackerScreen() {
  const router = useRouter();
  const { id, payment } = useLocalSearchParams();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  
  const [order, setOrder] = useState<any>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const fetchOrder = async () => {
      if (isCancelled) return;
      try {
        const response = await apiClient.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
    interval = setInterval(fetchOrder, 2000); // Swiggy style live poll

    return () => clearInterval(interval);
  }, [id, isCancelled]);

  const handleCancel = () => {
    Alert.alert(
      'Cancel Order?', 
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => setIsCancelled(true) }
      ]
    );
  };

  const handleChangeShop = () => {
    Alert.alert('Change Location', 'Feature coming soon to backend!');
  };

  if (!order && !isCancelled) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.brand} />
      </View>
    );
  }

  if (isCancelled) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons name="close-circle" size={64} color={theme.colors.red} />
        <Text style={[styles.headerTitle, { marginTop: 16 }]}>Order Cancelled</Text>
        <TouchableOpacity style={[styles.actionBtn, { marginTop: 24 }]} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.actionBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Token code is the last 4 chars of the UUID
  const token = `#${order.id.slice(-4).toUpperCase()}`;

  // Determine active step
  const status = order.status;
  const isReceived = true;
  const isPrinting = status === 'PROCESSING' || status === 'PRINTING' || status === 'READY_TO_PICKUP';
  const isReady = status === 'READY_TO_PICKUP' || status === 'COMPLETED';

  // Can cancel only if payment is Cash AND it's not printing yet
  const canModify = payment === 'Cash' && !isPrinting;

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? insets.top + 10 : 50 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/(tabs)/orders')}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{t('orders')}</Text>
          <Text style={styles.headerSub}>Pickup progress updates automatically</Text>
        </View>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.trackerCard}>
          <View style={styles.trackerTop}>
            <View>
              <Text style={styles.trackerShop}>PrintPanda Partner</Text>
              <Text style={styles.trackerMeta}>{order.totalPages} pages · ৳{order.totalPrice}</Text>
            </View>
            <View style={styles.orderIdBadge}>
              <Text style={styles.orderIdText}>{token}</Text>
            </View>
          </View>

          <View style={styles.printerStage}>
            <Ionicons name="print" size={48} color={theme.colors.brandInk} />
            <Text style={{color: theme.colors.brandInk, fontWeight: '700', marginTop: 8}}>
              {status === 'READY_TO_PICKUP' ? 'Done!' : 'Processing...'}
            </Text>
          </View>

          <View style={styles.timeline}>
            <View style={styles.step}>
              <View style={[styles.stepMark, isReceived && styles.stepMarkDone]} />
              <View style={styles.stepLine} />
              <View style={styles.stepCopy}>
                <Text style={styles.stepTitle}>{t('received')}</Text>
                <Text style={styles.stepSub}>The shop has accepted your order</Text>
              </View>
            </View>
            <View style={styles.step}>
              <View style={[styles.stepMark, isPrinting ? styles.stepMarkDone : styles.stepMarkPending]} />
              <View style={[styles.stepLine, !isReady && { opacity: 0.3 }]} />
              <View style={styles.stepCopy}>
                <Text style={[styles.stepTitle, !isPrinting && styles.textPending]}>{t('printing')}</Text>
                <Text style={styles.stepSub}>Your document is rolling out now</Text>
              </View>
            </View>
            <View style={styles.step}>
              <View style={[styles.stepMark, isReady ? styles.stepMarkDone : styles.stepMarkPending]} />
              <View style={styles.stepCopy}>
                <Text style={[styles.stepTitle, !isReady && styles.textPending]}>{t('ready')}</Text>
                <Text style={styles.stepSub}>{t('showCounter')}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.tokenCard, isReady && styles.tokenCardReady]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.handoverText}>{t('handover')}</Text>
            <Text style={styles.tokenText}>{token}</Text>
            <Text style={styles.tokenSub}>{t('showCounter')}</Text>
          </View>
          <View style={styles.qrMock}>
            <Ionicons name="qr-code" size={50} color={isReady ? theme.colors.brandInk : theme.colors.text} />
          </View>
        </View>

        {/* Post Order Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.primaryBtnText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.replace('/(tabs)/orders')}>
            <Text style={styles.secondaryBtnText}>See Order History</Text>
          </TouchableOpacity>
        </View>

        {/* Cancel / Modify Actions */}
        {canModify && (
          <View style={styles.dangerZone}>
            <Text style={styles.dangerTitle}>Modify Order</Text>
            <Text style={styles.dangerSub}>You chose Cash payment and the shop hasn't started printing yet.</Text>
            <View style={styles.dangerBtns}>
              <TouchableOpacity style={styles.modifyBtn} onPress={handleChangeShop}>
                <Ionicons name="swap-horizontal" size={16} color={theme.colors.brandDark} />
                <Text style={styles.modifyBtnText}>Change Shop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Ionicons name="close" size={16} color={theme.colors.red} />
                <Text style={styles.cancelBtnText}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  centered: { justifyContent: 'center', alignItems: 'center' },
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
  headerTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.text, letterSpacing: -0.5 },
  headerSub: { fontSize: 10, color: theme.colors.muted, marginTop: 2 },
  livePill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.colors.soft,
    paddingVertical: 6, paddingHorizontal: 8,
    borderRadius: 999,
  },
  liveDot: { width: 6, height: 6, backgroundColor: theme.colors.brand, borderRadius: 3, marginRight: 4 },
  liveText: { fontSize: 10, fontWeight: '800', color: theme.colors.brandDark },
  
  content: { padding: 16, paddingBottom: 40 },
  trackerCard: {
    backgroundColor: theme.colors.card,
    borderWidth: 1, borderColor: theme.colors.border,
    borderRadius: 20, padding: 20,
  },
  trackerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  trackerShop: { fontSize: 14, fontWeight: '700', color: theme.colors.text },
  trackerMeta: { fontSize: 11, color: theme.colors.muted, marginTop: 4 },
  orderIdBadge: { backgroundColor: theme.colors.soft, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  orderIdText: { fontSize: 11, fontWeight: '800', color: theme.colors.brandInk },
  
  printerStage: { height: 120, backgroundColor: theme.colors.soft, borderRadius: 16, marginVertical: 20, justifyContent: 'center', alignItems: 'center' },
  
  timeline: { paddingLeft: 8 },
  step: { flexDirection: 'row', marginBottom: 24, position: 'relative' },
  stepMark: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: theme.colors.border, backgroundColor: theme.colors.card, zIndex: 2, marginRight: 16 },
  stepMarkDone: { borderColor: theme.colors.brand, backgroundColor: theme.colors.brand },
  stepMarkPending: { borderColor: theme.colors.border },
  stepLine: { position: 'absolute', left: 7, top: 16, bottom: -24, width: 2, backgroundColor: theme.colors.brand, zIndex: 1 },
  stepCopy: { flex: 1, top: -2 },
  stepTitle: { fontSize: 13, fontWeight: '700', color: theme.colors.text },
  textPending: { opacity: 0.5 },
  stepSub: { fontSize: 10, color: theme.colors.muted, marginTop: 2 },
  
  tokenCard: { backgroundColor: '#111827', borderRadius: 20, padding: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' },
  tokenCardReady: { backgroundColor: '#064e3b' },
  handoverText: { fontSize: 10, color: '#a7f3d0', fontWeight: '700' },
  tokenText: { fontSize: 40, fontWeight: '800', color: '#ffffff', letterSpacing: -1, marginVertical: 4 },
  tokenSub: { fontSize: 11, color: '#d1d5db' },
  qrMock: { backgroundColor: 'white', padding: 8, borderRadius: 12 },

  actionsContainer: { marginTop: 24, gap: 12 },
  primaryBtn: { backgroundColor: theme.colors.brand, padding: 16, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: 'white', fontWeight: '800', fontSize: 15 },
  secondaryBtn: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, padding: 16, borderRadius: 12, alignItems: 'center' },
  secondaryBtnText: { color: theme.colors.text, fontWeight: '700', fontSize: 15 },

  dangerZone: { marginTop: 32, padding: 16, backgroundColor: theme.colors.redBg, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(220, 38, 38, 0.2)' },
  dangerTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.red, marginBottom: 4 },
  dangerSub: { fontSize: 12, color: theme.colors.muted, marginBottom: 16 },
  dangerBtns: { flexDirection: 'row', gap: 12 },
  modifyBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, padding: 12, borderRadius: 8 },
  modifyBtnText: { color: theme.colors.text, fontWeight: '600', marginLeft: 6, fontSize: 13 },
  cancelBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderWidth: 1, borderColor: theme.colors.red, padding: 12, borderRadius: 8 },
  cancelBtnText: { color: theme.colors.red, fontWeight: '600', marginLeft: 6, fontSize: 13 },
  actionBtn: { backgroundColor: theme.colors.brand, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  actionBtnText: { color: 'white', fontWeight: '700' }
});
