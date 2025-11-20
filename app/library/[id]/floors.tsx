import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FloorListItem from './FloorListItem';

export default function SelectFloorScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = params.id as string | undefined;

  const floorsData = [
    { floorNumber: 1, seats: 15 },
    { floorNumber: 2, seats: 12 },
    { floorNumber: 3, seats: 18 },
    { floorNumber: 4, seats: 14 },
    { floorNumber: 5, seats: 13 },
    { floorNumber: 6, seats: 13 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.libraryName}>Perry-Castañeda Library (PCL)</Text>
      </View>

      <View style={styles.introContainer}>
        <Text style={styles.title}>Select Floor</Text>
        <Text style={styles.subtitle}>Choose which floor you'd like to view</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {floorsData.map((floor) => (
          <FloorListItem
            key={floor.floorNumber}
            floorNumber={floor.floorNumber}
            seatsAvailable={floor.seats}
            onPress={() => router.push(`./floors/${floor.floorNumber}` as any)}
          />
        ))}
      </ScrollView>

      {/* Bottom nav is provided by the app's tab layout; no local bottom bar needed here */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  libraryName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  introContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});
