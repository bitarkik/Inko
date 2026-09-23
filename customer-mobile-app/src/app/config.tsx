import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PDFDocument } from 'pdf-lib';
import { theme } from '../theme';
import { useI18n } from '../i18n';

export default function ConfigScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { uri, name } = useLocalSearchParams();
  
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [colorRate, setColorRate] = useState(3);
  const [sidedRate, setSidedRate] = useState(1);
  const [paperRate, setPaperRate] = useState(1);
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    if (uri) {
      analyzePdf(uri as string);
    } else {
      setLoading(false);
    }
  }, [uri]);

  const analyzePdf = async (fileUri: string) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });
      
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdfDoc.getPageCount());
    } catch (error) {
      console.error('PDF Parse Error:', error);
      Alert.alert('Error', 'Failed to parse PDF pages. Will default to 1 page.');
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const changeCopies = (delta: number) => {
    setCopies(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const calcTotal = () => Math.round(totalPages * colorRate * sidedRate * paperRate * copies);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.brand} />
        <Text style={styles.loadingText}>Analyzing document...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{t('configure')}</Text>
          <Text style={styles.headerSub}>Choose your pages and finish</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.fileSummary}>
          <View style={styles.docIcon} />
          <View style={styles.fileDetails}>
            <Text style={styles.fileName} numberOfLines={1}>{name || 'Document.pdf'}</Text>
            <Text style={styles.fileMeta}>{totalPages} pages · PDF</Text>
          </View>
          <View style={styles.okBadge}><Ionicons name="checkmark" size={16} color={theme.colors.brandDark} /></View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.formLabelRow}>
            <Text style={styles.formLabel}>{t('colorMode')}</Text>
            <Text style={styles.formLabelSub}>রঙিন / Color</Text>
          </View>
          <View style={styles.pills}>
            <TouchableOpacity style={[styles.pill, colorRate === 3 && styles.pillActive]} onPress={() => setColorRate(3)}>
              <Text style={[styles.pillText, colorRate === 3 && styles.pillTextActive]}>Black & White <Text style={styles.pillSmall}>(৳3)</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.pill, colorRate === 10 && styles.pillActive]} onPress={() => setColorRate(10)}>
              <Text style={[styles.pillText, colorRate === 10 && styles.pillTextActive]}>Color <Text style={styles.pillSmall}>(৳10)</Text></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.formLabelRow}>
            <Text style={styles.formLabel}>{t('sided')}</Text>
            <Text style={styles.formLabelSub}>উভয় পাশ / Duplex</Text>
          </View>
          <View style={styles.pills}>
            <TouchableOpacity style={[styles.pill, sidedRate === 1 && styles.pillActive]} onPress={() => setSidedRate(1)}>
              <Text style={[styles.pillText, sidedRate === 1 && styles.pillTextActive]}>Single sided</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.pill, sidedRate === 0.8 && styles.pillActive]} onPress={() => setSidedRate(0.8)}>
              <Text style={[styles.pillText, sidedRate === 0.8 && styles.pillTextActive]}>Back-to-back <Text style={styles.pillSmall}>save 20%</Text></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.copiesSection}>
          <View>
            <Text style={styles.formLabel}>{t('copies')}</Text>
            <Text style={styles.formLabelSub}>কপি / Copies</Text>
          </View>
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepperBtn} onPress={() => changeCopies(-1)}>
              <Text style={styles.stepperBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.stepperValue}>{copies}</Text>
            <TouchableOpacity style={styles.stepperBtn} onPress={() => changeCopies(1)}>
              <Text style={styles.stepperBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomPrice}>
        <View>
          <Text style={styles.totalText}>Total: ৳{calcTotal()}</Text>
          <Text style={styles.totalSub}>{totalPages} pages × ৳{Math.round(colorRate * sidedRate * paperRate * 10) / 10}</Text>
        </View>
        <TouchableOpacity 
          style={styles.primaryBtn}
          onPress={() => {
            router.push({
              pathname: '/checkout',
              params: { 
                uri, 
                name,
                totalPages,
                totalPrice: calcTotal(),
                colorMode: colorRate === 3 ? 'B&W' : 'Color',
                sidedMode: sidedRate === 1 ? 'Single' : 'Duplex',
                copies
              }
            });
          }}
        >
          <Text style={styles.primaryBtnText}>{t('selectShop')} →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: theme.colors.muted },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    zIndex: 10,
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
  fileSummary: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderWidth: 1, borderColor: theme.colors.border,
    borderRadius: 16, padding: 12,
    marginBottom: 24,
  },
  docIcon: {
    width: 34, height: 42,
    backgroundColor: theme.colors.soft,
    borderRadius: 5,
    marginRight: 12,
  },
  fileDetails: { flex: 1 },
  fileName: { fontSize: 13, fontWeight: '700', color: theme.colors.text },
  fileMeta: { fontSize: 11, color: theme.colors.muted, marginTop: 4 },
  okBadge: {
    width: 25, height: 25,
    backgroundColor: theme.colors.soft,
    borderRadius: 13,
    justifyContent: 'center', alignItems: 'center',
  },
  formSection: { marginBottom: 24 },
  formLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 },
  formLabel: { fontSize: 14, fontWeight: '700', color: theme.colors.text },
  formLabelSub: { fontSize: 10, color: theme.colors.muted },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    borderWidth: 1, borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    borderRadius: 999,
    paddingVertical: 10, paddingHorizontal: 16,
  },
  pillActive: {
    borderColor: theme.colors.brand,
    backgroundColor: theme.colors.soft,
  },
  pillText: { fontSize: 12, fontWeight: '600', color: theme.colors.text },
  pillTextActive: { color: theme.colors.brandInk },
  pillSmall: { fontSize: 10, color: theme.colors.muted },
  copiesSection: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderWidth: 1, borderColor: theme.colors.border,
    borderRadius: 16, padding: 16,
    marginBottom: 24,
  },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stepperBtn: {
    width: 32, height: 32,
    backgroundColor: theme.colors.soft,
    borderRadius: 9,
    justifyContent: 'center', alignItems: 'center',
  },
  stepperBtnText: { fontSize: 16, fontWeight: '800', color: theme.colors.brandInk },
  stepperValue: { fontSize: 16, fontWeight: '800', color: theme.colors.text, minWidth: 20, textAlign: 'center' },
  bottomPrice: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: theme.colors.nav,
    borderTopWidth: 1, borderTopColor: theme.colors.border,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  totalText: { fontSize: 18, fontWeight: '800', color: theme.colors.text },
  totalSub: { fontSize: 11, color: theme.colors.muted, marginTop: 4 },
  primaryBtn: {
    backgroundColor: theme.colors.brand,
    paddingVertical: 12, paddingHorizontal: 16,
    borderRadius: 12,
  },
  primaryBtnText: { color: 'white', fontSize: 13, fontWeight: '800' }
});
