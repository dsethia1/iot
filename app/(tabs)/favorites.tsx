import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Dimensions } from 'react-native';
import SavedLibraryCard from './SavedLibraryCard';
import { useFavorites } from '../providers/favorites';

const { width } = Dimensions.get('window');
// Responsive two-column calculation:
// horizontal padding on container + gap between cards
const H_PADDING = 20;
const GAP = 12;
const cardWidth = Math.floor((width - H_PADDING * 2 - GAP) / 2);

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Saved</Text>
      </View>

      <Text style={styles.subtitle}>View how many seats are available at your favorite places</Text>

      <View style={styles.searchBar}>
        <TextInput placeholder="Search" placeholderTextColor="#777" style={styles.searchInput} />
      </View>

      <View style={styles.gridHeader}>
        <Text style={styles.gridHeaderText}>Near You</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(i) => String(i.id)}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: H_PADDING, marginBottom: 0 }}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, marginHorizontal: GAP / 2, maxWidth: cardWidth }}>
            <SavedLibraryCard library={item} />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#9AA0A6' }}>You haven't saved any libraries yet.</Text>
          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  title: { color: '#FFD700', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#A9A9A9', fontSize: 14, marginHorizontal: 20, marginBottom: 15 },
  searchBar: { flexDirection: 'row', backgroundColor: '#333333', borderRadius: 10, marginHorizontal: 20, padding: 10, marginBottom: 20 },
  searchInput: { color: '#FFFFFF', flex: 1, marginLeft: 5 },
  gridHeader: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 15, alignItems: 'flex-end' },
  gridHeaderText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  viewAllText: { color: '#FFD700', fontSize: 14 },
});
