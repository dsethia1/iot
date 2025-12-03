import Icon from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
// Hide the default navigator header so the screen uses its custom in-page header
export const unstable_settings = {
  headerShown: false,
};

import {
    Dimensions,
    Image,
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

  // Ensure any navigator header is hidden for this screen. Some navigator setups
  // may still render a header from a parent navigator; force headerShown:false
  // via setOptions as a robust fallback.
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
  if (navigation && typeof (navigation as any).setOptions === 'function') {
      try {
        (navigation as any).setOptions({ headerShown: false });
      } catch (e) {
        // ignore
      }
    }
  }, [navigation]);

  // In a real app you'd fetch library data by id; here we keep it simple.
  const title = 'Perry-Castañeda Library (PCL)';
  const image = 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=800&fit=crop';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={18} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>101 E 21st St, Austin, TX 78712 • 0.2 mi</Text>
        </View>

        {/* removed close/exit button - navigation uses the back arrow */}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.floorRow}>
          <TouchableOpacity style={styles.floorButton} onPress={() => {}}>
            <Text style={styles.floorText}>FLOOR 5 ▾</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrap}>
          <Image source={{ uri: image }} style={styles.cardImage} />

          <View style={styles.topRightChip}>
            <Text style={styles.chipText}>24h</Text>
          </View>

          <TouchableOpacity style={styles.bookmarkCircle} onPress={() => {}}>
            <MaterialIcons name="bookmark" size={18} color="#081017" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoTop}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoTitle}>High Availability</Text>
              <Text style={styles.infoSub}>85 of 150 seats available
              {'\n'}6 floors available</Text>
            </View>

            <View style={styles.infoRight}>
              <View style={styles.pctCircle}><Text style={styles.pctText}>57%</Text></View>
            </View>
          </View>

          <TouchableOpacity style={styles.viewSeatsButton} onPress={() => router.push(`/library/${id}/floors` as any)}>
            <Text style={styles.viewSeatsText}>View Seats by Floor</Text>
          </TouchableOpacity>

          <View style={styles.amenitiesRow}>
            <View style={styles.amenity}><Text style={styles.amenityText}>Free WiFi</Text></View>
            <View style={styles.amenity}><Text style={styles.amenityText}>Power Outlets</Text></View>
            <View style={styles.amenity}><Text style={styles.amenityText}>Quiet Zones</Text></View>
          </View>
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>

      <View style={styles.bottomActions}>
        <View style={styles.bottomInner}>
          <TouchableOpacity style={styles.bottomIcon}><MaterialIcons name="home" size={20} color="#FFF" /></TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}><MaterialIcons name="bookmark" size={20} color="#FFF" /></TouchableOpacity>
          <TouchableOpacity style={[styles.bottomIcon, styles.homeActive]}><MaterialIcons name="location-on" size={20} color="#081017" /></TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}><MaterialIcons name="settings" size={20} color="#FFF" /></TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}><MaterialIcons name="search" size={20} color="#FFF" /></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#071021' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    // nudge down slightly so the circle sits a bit lower in the header
    marginTop: Platform.OS === 'android' ? 6 : 4,
  },
  headerCenter: { flex: 1, paddingHorizontal: 12 },
  title: { fontSize: 16, fontWeight: '700', color: '#FFD43B' },
  subtitle: { fontSize: 12, color: '#9AA0A6', marginTop: 2 },
  // closeButton removed
  content: { padding: 20 },
  floorRow: { alignItems: 'center', marginBottom: 12 },
  floorButton: {
    borderWidth: 0,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  floorText: { fontWeight: '700', color: '#9AA0A6' },
  imageWrap: { position: 'relative', borderRadius: 14, overflow: 'hidden' },
  // make the picture a bit smaller to give more space on the screen
  cardImage: { width: '100%', height: width * 0.45, borderRadius: 14 },
  topRightChip: { position: 'absolute', top: 12, right: 12, backgroundColor: '#FFD43B', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 18 },
  chipText: { color: '#081017', fontWeight: '700' },
  bookmarkCircle: { position: 'absolute', top: 12, left: 12, width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFD43B' },
  infoCard: { marginTop: 16, backgroundColor: '#0b1220', borderRadius: 16, padding: 16 },
  infoTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoLeft: { flex: 1 },
  infoTitle: { color: '#FFF', fontWeight: '700', marginBottom: 8 },
  infoSub: { color: '#9AA0A6' },
  infoRight: { marginLeft: 12, alignItems: 'center', justifyContent: 'center' },
  pctCircle: { width: 56, height: 56, borderRadius: 999, backgroundColor: '#0f2d1b', alignItems: 'center', justifyContent: 'center' },
  pctText: { color: '#7EE787', fontWeight: '700' },
  viewSeatsButton: { marginTop: 14, backgroundColor: '#FFD43B', paddingVertical: 12, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  viewSeatsText: { color: '#081017', fontWeight: '800' },
  amenitiesRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  amenity: { backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  amenityText: { color: '#9AA0A6', fontWeight: '600' },
  bottomActions: { position: 'absolute', left: 0, right: 0, bottom: 18, alignItems: 'center' },
  bottomInner: { width: 260, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0b1220', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  bottomIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' },
  homeActive: { backgroundColor: '#FFD43B' },
});
