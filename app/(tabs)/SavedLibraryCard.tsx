import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

function getOverlayColorByRatio(available: number, total: number) {
  if (!total) return 'rgba(0,0,0,0.4)';
  const ratio = available / total;
  if (ratio >= 0.7) return 'rgba(255, 221, 51, 0.28)'; // yellow-ish
  if (ratio >= 0.3) return 'rgba(30, 144, 255, 0.25)'; // blue-ish
  return 'rgba(255, 80, 80, 0.28)'; // red-ish
}

export default function SavedLibraryCard({ library }: { library: any }) {
  const overlayColor = getOverlayColorByRatio(Number(library.availableSeats ?? library.available ?? 0), Number(library.totalSeats ?? library.total ?? 0));

  return (
    <TouchableOpacity style={styles.card} onPress={() => {}} activeOpacity={0.9}>
      <ImageBackground
        source={library.image ? { uri: library.image } : undefined}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
          <View style={styles.seatCountBadge}>
            <Text style={styles.seatCountText}>{library.availableSeats ?? library.seats ?? '—'}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.badge24Hour}>
              <Text style={styles.badgeText}>24 Hours</Text>
            </View>
            <View style={styles.distanceContainer}>
              <Text style={styles.badgeText}>{library.distance ?? '—'}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Text style={styles.title} numberOfLines={2}>{library.name ?? library.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, marginBottom: 20 },
  imageBackground: { height: 180, borderRadius: 15, overflow: 'hidden', justifyContent: 'flex-end' },
  imageStyle: { borderRadius: 15 },
  overlay: { flex: 1, justifyContent: 'space-between', padding: 10 },
  title: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 6 },
  seatCountBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  seatCountText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  badge24Hour: { flexDirection: 'row', alignItems: 'center' },
  distanceContainer: { flexDirection: 'row', alignItems: 'center' },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
});
