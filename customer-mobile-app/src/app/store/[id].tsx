import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { PDFDocument } from 'pdf-lib';
import { apiClient } from '../../api/client';

export default function StoreDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isColor, setIsColor] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchStore();
  }, [id]);

  const fetchStore = async () => {
    try {
      // In the backend, there isn't a direct GET /stores/:id endpoint except dashboard
      // But we can fetch all and find it
      const response = await apiClient.get('/stores');
      const foundStore = response.data.find((s: any) => s.id === id);
      if (foundStore) {
        setStore(foundStore);
      } else {
        Alert.alert('Error', 'Store not found');
        router.back();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch store details');
    } finally {
      setLoading(false);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        setFile(pickedFile);
        await analyzePdf(pickedFile.uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const analyzePdf = async (uri: string) => {
    try {
      const response = await fetch(uri);
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
    }
  };

  const calculatePrice = () => {
    if (!store || totalPages === 0) return 0;
    // Assuming color costs 1.5x
    const multiplier = isColor ? 1.5 : 1.0;
    return store.basePrice * totalPages * multiplier;
  };

  const submitOrder = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const price = calculatePrice();
      const colorPagesArray = isColor ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];
      const bwPagesArray = !isColor ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];

      const formData = new FormData();
      formData.append('document', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/pdf',
      } as any);
      
      formData.append('storeId', id as string);
      formData.append('totalPages', totalPages.toString());
      formData.append('totalPrice', price.toString());
      
      // Sending array as comma-separated string to match DTO @Transform
      formData.append('colorPages', colorPagesArray.join(','));
      formData.append('bwPages', bwPagesArray.join(','));

      const response = await apiClient.post('/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Order placed successfully!');
      router.replace(`/order/${response.data.id}`);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to place order');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.storeName}>{store?.name}</Text>
      <Text style={styles.storeAddress}>{store?.address}</Text>

      <TouchableOpacity style={styles.pickButton} onPress={pickDocument}>
        <Text style={styles.pickButtonText}>{file ? 'Change PDF Document' : 'Select PDF Document'}</Text>
      </TouchableOpacity>

      {file && (
        <View style={styles.detailsCard}>
          <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
            File: {file.name}
          </Text>
          <Text style={styles.pageCount}>Pages: {totalPages}</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Print in Color (1.5x price)</Text>
            <Switch value={isColor} onValueChange={setIsColor} />
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Price:</Text>
            <Text style={styles.priceValue}>${calculatePrice().toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, uploading && styles.submitButtonDisabled]} 
            onPress={submitOrder}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Place Print Order</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
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
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  pickButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  pickButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileName: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  pageCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  submitButton: {
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#90caf9',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
