import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SectionListItem from './SectionListItem';

export default function FloorMapScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const floorParam = params.floorNumber as string | undefined;
  const floorNumber = Number(floorParam ?? 5);

  const sectionsData = [
    { id: '1', name: 'Section 5F', seatsAvailable: 2, totalSeats: 10, status: 'low' },
    { id: '2', name: 'Section 5G', seatsAvailable: 8, totalSeats: 10, status: 'high' },
    { id: '3', name: 'Section 5H', seatsAvailable: 3, totalSeats: 20, status: 'low' },
    { id: '4', name: 'Section 5B', seatsAvailable: 15, totalSeats: 20, status: 'high' },
    { id: '5', name: 'Section 5I', seatsAvailable: 10, totalSeats: 12, status: 'high' },
    { id: '6', name: 'Section 5M', seatsAvailable: 7, totalSeats: 15, status: 'moderate' },
    { id: '7', name: 'Section 5C', seatsAvailable: 4, totalSeats: 10, status: 'moderate' },
    { id: '8', name: 'Section 5A', seatsAvailable: 1, totalSeats: 8, status: 'low' },
    { id: '9', name: 'Section 5D', seatsAvailable: 5, totalSeats: 10, status: 'moderate' },
    { id: '10', name: 'Section 5E', seatsAvailable: 9, totalSeats: 10, status: 'high' },
    { id: '11', name: 'Section 5K', seatsAvailable: 2, totalSeats: 15, status: 'low' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.libraryName}>Perry-Castañeda Library (PCL)</Text>
        <Text style={styles.floorText}>Floor {floorNumber}</Text>

        <View style={styles.topRightIcons} pointerEvents="box-none">
          <TouchableOpacity style={styles.iconButton} />
          <TouchableOpacity style={styles.iconButton} />
          <TouchableOpacity style={styles.iconButton} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholderText}>[Floor map placeholder — interactive SVG or image goes here]</Text>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Select a Section</Text>
        </View>

        <View style={styles.sectionList}>
          {sectionsData.map((section) => (
            <SectionListItem key={section.id} section={section} />
          ))}
        </View>

        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legend</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, styles.lowIndicator]} />
            <Text style={styles.legendText}>Unavailable (0-50% seats)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, styles.highIndicator]} />
            <Text style={styles.legendText}>Available (51-100% seats)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, styles.moderateIndicator]} />
            <Text style={styles.legendText}>Study Room/Quiet Zone</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, styles.deskIndicator]} />
            <Text style={styles.legendText}>Staff Desk/Service</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  scrollContent: { paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#2D2D2D' },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  libraryName: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  floorText: { color: '#A9A9A9', fontSize: 14, marginLeft: 5 },
  topRightIcons: { flexDirection: 'row', position: 'absolute', right: 15 },
  iconButton: { width: 36, height: 36, borderRadius: 18, marginLeft: 8, backgroundColor: 'transparent' },
  mapContainer: { backgroundColor: '#2D2D2D', margin: 10, borderRadius: 15, padding: 20, height: 300, justifyContent: 'center', alignItems: 'center' },
  mapPlaceholderText: { color: '#A9A9A9', fontSize: 16, textAlign: 'center' },
  listHeader: { paddingHorizontal: 20, marginBottom: 10 },
  listTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  sectionList: { paddingHorizontal: 20 },
  legendContainer: { backgroundColor: '#2D2D2D', borderRadius: 15, marginHorizontal: 20, marginTop: 20, padding: 15 },
  legendTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  legendIndicator: { width: 15, height: 15, borderRadius: 4, marginRight: 10 },
  lowIndicator: { backgroundColor: 'red' },
  highIndicator: { backgroundColor: 'green' },
  moderateIndicator: { backgroundColor: 'yellow' },
  deskIndicator: { backgroundColor: '#F9A825' },
  legendText: { color: '#A9A9A9', fontSize: 14 },
});
