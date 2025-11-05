import Icon from '@expo/vector-icons/Feather';
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
  const [activeTab, setActiveTab] = useState<string>('Best');
  const [selectedCity, setSelectedCity] = useState<string>('Austin');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { favorites, toggle, has } = useFavorites();
  const router = useRouter();

  const tabs = ['Best', 'New', 'Coffee', 'Popular', 'Food', 'Outdoor'];

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
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.locationLabel}>You are here</Text>
              <View style={styles.cityRow}>
                <Text style={styles.cityName}>{selectedCity}</Text>
                <Icon name="chevron-down" size={20} color="#000" />
              </View>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
              <Icon name="share-2" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={16} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter city"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
            {tabs.map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                {activeTab === tab && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {libraries.map((library, index) => (
            <View key={library.id} style={styles.card}>
              {/* Image Section */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: library.image }} style={styles.cardImage} resizeMode="cover" />

                {/* Avatar placeholder */}
                <View style={styles.avatar} />

                {/* Bookmark button */}
                <TouchableOpacity onPress={() => toggleBookmark(library.id)} style={styles.bookmarkButton}>
                  <Icon name="bookmark" size={20} color={has(library.id) ? '#000' : '#666'} />
                </TouchableOpacity>

                {/* Pagination dots */}
                <View style={styles.paginationDots}>
                  <View style={[styles.dot, index === 0 && styles.dotActive]} />
                  <View style={[styles.dot, index === 1 && styles.dotActive]} />
                  <View style={styles.dot} />
                </View>
              </View>

              {/* Info Section */}
              <View style={styles.cardInfo}>
                <View style={styles.cardInfoTop}>
                  <View style={styles.nameBadge}>
                    <Text style={styles.nameText}>{library.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.externalButton}
                    onPress={() => router.push(`/library/${library.id}` as any)}
                  >
                    <Icon name="external-link" size={20} color="#000" />
                  </TouchableOpacity>
                </View>

                <View style={styles.seatsInfo}>
                  <Text style={styles.seatsText}>
                    {library.availableSeats}/{library.totalSeats} Available Seats
                  </Text>
                  <Text style={styles.separator}>•</Text>
                  <Text style={styles.distanceText}>{library.distance}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom spacing for layout bar */}
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Note: bottom navigation is provided by app/(tabs)/_layout.tsx */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  shareButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  tabsContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
  tabsContent: {
    paddingHorizontal: 24,
    gap: 24,
  },
  tab: {
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 14,
    color: '#999',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000',
  },
  cardsContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    height: 240,
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1D5DB',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
  },
  dotActive: {
    backgroundColor: '#1F2937',
  },
  cardInfo: {
    padding: 16,
  },
  cardInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
  },
  nameText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
  externalButton: {
    padding: 8,
  },
  seatsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seatsText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  separator: {
    color: '#9CA3AF',
  },
  distanceText: {
    fontSize: 13,
    color: '#6B7280',
  },
});
