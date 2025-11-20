import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const getStatusColors = (status: string) => {
  switch (status) {
    case 'low':
      return { badge: '#E64A19', text: '#FFCCBC' };
    case 'moderate':
      return { badge: '#F9A825', text: '#FFEB3B' };
    case 'high':
      return { badge: '#388E3C', text: '#C8E6C9' };
    default:
      return { badge: '#A9A9A9', text: '#FFFFFF' };
  }
};

export default function SectionListItem({ section, onPress }: { section: any; onPress?: () => void }) {
  const colors = getStatusColors(section.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.sectionBadge, { backgroundColor: colors.badge }]}>
        <Text style={styles.badgeText}>{section.name.slice(-1)}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.sectionNameText}>{section.name}</Text>
        <Text style={[styles.seatsText, { color: colors.text }]}>{`${section.seatsAvailable} of ${section.totalSeats} seats available`}</Text>
      </View>

      <View style={[styles.statusPill, { backgroundColor: colors.badge }]}>
        <Text style={styles.statusPillText}>{section.status.charAt(0).toUpperCase() + section.status.slice(1)}</Text>
      </View>

      <View style={styles.arrowIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2D2D2D', borderRadius: 15, padding: 15, marginBottom: 10 },
  sectionBadge: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  badgeText: { color: '#000000', fontSize: 18, fontWeight: 'bold' },
  info: { flex: 1, marginRight: 10 },
  sectionNameText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  seatsText: { fontSize: 14, marginTop: 2 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 10 },
  statusPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  arrowIcon: {},
});
