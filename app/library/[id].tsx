import Icon from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LibraryDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;

  // In a real app you'd fetch library data by id; here we keep it simple.
  const title = 'Perry-Castañeda Library';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.floorRow}>
          <TouchableOpacity style={styles.floorButton} onPress={() => {}}>
            <Text style={styles.floorText}>FLOOR 5 ▾</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapPlaceholder} />

        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}> 
            <TouchableOpacity style={styles.toolButton}><Icon name="search" size={18} color="#fff" /></TouchableOpacity>
            <TouchableOpacity style={styles.toolButton}><Icon name="zoom-in" size={18} color="#fff" /></TouchableOpacity>
          </View>

          <View style={styles.toolbarRight}>
            <TouchableOpacity style={styles.toolCircle}><Icon name="share-2" size={18} color="#333" /></TouchableOpacity>
            <TouchableOpacity style={styles.toolCircle}><Icon name="refresh-cw" size={18} color="#333" /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.seatInfoCard}>
          <Text style={styles.seatInfoTitle}>Seat Information</Text>
          <Text style={styles.noSeat}>No Seat Selected</Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 0,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  headerRightPlaceholder: { width: 40 },
  content: { padding: 20 },
  floorRow: { alignItems: 'center', marginBottom: 12 },
  floorButton: {
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  floorText: { fontWeight: '700', color: '#111' },
  mapPlaceholder: {
    height: width * 0.6,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    marginVertical: 12,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E7EB',
    padding: 10,
    borderRadius: 999,
    marginVertical: 12,
  },
  toolbarLeft: { flexDirection: 'row', gap: 8 },
  toolbarRight: { flexDirection: 'row', gap: 8 },
  toolButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  toolCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  seatInfoCard: {
    marginTop: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  seatInfoTitle: { fontWeight: '600', marginBottom: 12 },
  noSeat: { color: '#9CA3AF', fontSize: 16 },
});
