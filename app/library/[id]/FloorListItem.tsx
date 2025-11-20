import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FloorListItem({ floorNumber, seatsAvailable, onPress }: { floorNumber: number; seatsAvailable: number; onPress?: () => void }) {
  const badgeColor = '#FFD700';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.floorBadge, { backgroundColor: badgeColor }]}>
        <Text style={styles.floorNumberText}>{floorNumber}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.floorNameText}>{`Floor ${floorNumber}`}</Text>
        <Text style={styles.seatsText}>{`${seatsAvailable} seats available`}</Text>
      </View>

      <View style={styles.arrowIcon}>
        <MaterialIcons name="chevron-right" size={22} color="#9AA0A6" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  floorBadge: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  floorNumberText: { color: '#000000', fontSize: 20, fontWeight: 'bold' },
  info: { flex: 1 },
  floorNameText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  seatsText: { color: '#A9A9A9', fontSize: 14, marginTop: 2 },
  arrowIcon: {},
});
