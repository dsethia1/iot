import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../providers/favorites';

export default function SavedScreen() {
  const { favorites, toggle } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No saved libraries yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(i) => String(i.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.availableSeats}/{item.totalSeats} Available • {item.distance}</Text>
          </View>
          <TouchableOpacity onPress={() => toggle(item)} style={styles.unsave}>
            <Text style={styles.unsaveText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#666' },
  list: { padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12 },
  image: { width: 80, height: 60, borderRadius: 8, backgroundColor: '#eee' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 },
  unsave: { paddingHorizontal: 12, paddingVertical: 6 },
  unsaveText: { color: '#e53935' },
});