import Icon from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useFavorites } from '../providers/favorites';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Library {
  id: number;
  name: string;
  availableSeats: number;
  totalSeats: number;
  distance: string;
  image: string;
}

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>('Near you');
  const [selectedCity, setSelectedCity] = useState<string>('Austin');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { favorites, toggle, has } = useFavorites();
  const router = useRouter();

  const tabs = ['Near you', '24 Hours', 'Cafes', 'Libraries', 'High Availability'];

  const libraries: Library[] = [
    {
      id: 1,
      name: 'Perry-Castañeda Library',
      availableSeats: 252,
      totalSeats: 445,
      distance: '2.3 mi',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      name: 'Central Library',
      availableSeats: 180,
      totalSeats: 320,
      distance: '1.8 mi',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop',
    },
  ];

  const toggleBookmark = (id: number) => {
    const lib = libraries.find((l) => l.id === id);
    if (lib) toggle(lib);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.searchingNearText}>Searching near</Text>
            <TouchableOpacity style={styles.locationButton} onPress={() => {}}>
              <Text style={styles.locationText}>{selectedCity}</Text>
              <Icon name="chevron-down" size={18} color="#FFD43B" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
            <Icon name="share-2" size={20} color="#FFD43B" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search" size={16} color="#DDD" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer} contentContainerStyle={{ paddingRight: 24 }}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cards list */}
        {libraries.map((library) => (
          <TouchableOpacity key={library.id} style={styles.card} onPress={() => router.push(`/library/${library.id}/floors` as any)}>
            <Image source={{ uri: library.image }} style={styles.cardImage} resizeMode="cover" />

            {/* 24-hour badge */}
            <View style={styles.badge24Hour}>
              <Text style={styles.badgeText}>24 Hours</Text>
            </View>

            {/* saved / favorite icon */}
            <TouchableOpacity
              accessibilityLabel={has(library.id) ? 'Remove from favorites' : 'Add to favorites'}
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => toggleBookmark(library.id)}
              style={[styles.savedIcon, has(library.id) && styles.savedIconActive]}
            >
              <MaterialIcons name={has(library.id) ? 'bookmark' : 'bookmark-border'} size={18} color={has(library.id) ? '#000' : '#FFD43B'} />
            </TouchableOpacity>

            {/* overlay info */}
            <View style={styles.overlayBottom}>
              <Text style={styles.title}>{library.name}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>{library.availableSeats}/{library.totalSeats} Available</Text>
                <Text style={styles.infoText}>{library.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchingNearText: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationText: {
    color: '#FFD43B',
    fontSize: 18,
    fontWeight: '700',
  },
  shareButton: {
    padding: 8,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  searchInput: {
    color: '#FFFFFF',
    flex: 1,
  },
  tabsContainer: {
    paddingLeft: 0,
    marginVertical: 12,
  },
  tab: {
    color: '#A9A9A9',
    fontSize: 16,
    marginRight: 20,
    paddingBottom: 6,
  },
  activeTab: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#FFD43B',
    paddingBottom: 4,
  },
  card: {
    height: 220,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  badge24Hour: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#FFD43B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
  },
  savedIconActive: {
    backgroundColor: '#FFD43B',
  },
  savedIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
