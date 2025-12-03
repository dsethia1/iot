import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Section = {
  id: string;
  name: string;
  capacity: number;
  available: number;
  status: 'available' | 'limited' | 'reserved';
};

const sampleSections: Section[] = [
  { id: '5P', name: 'Section 5P', capacity: 30, available: 24, status: 'available' },
  { id: '5Q', name: 'Section 5Q', capacity: 20, available: 14, status: 'available' },
  { id: '5R', name: 'Section 5R', capacity: 12, available: 8, status: 'available' },
  { id: '5S', name: 'Section 5S', capacity: 10, available: 2, status: 'limited' },
  { id: '5T', name: 'Section 5T', capacity: 16, available: 0, status: 'reserved' },
  { id: '5U', name: 'Section 5U', capacity: 18, available: 6, status: 'available' },
  { id: '5V', name: 'Section 5V', capacity: 22, available: 3, status: 'limited' },
  { id: '5W', name: 'Section 5W', capacity: 28, available: 28, status: 'available' },
  { id: '5X', name: 'Section 5X', capacity: 8, available: 0, status: 'reserved' },
];

export default function FloorsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = params.id as string | undefined;

  function statusColor(s: Section['status']) {
    switch (s) {
      case 'available':
        return '#0BB77E'; // green
      case 'limited':
        return '#FFD43B'; // yellow
      case 'reserved':
        return '#FF6B6B'; // red
      default:
        return '#999';
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="chevron-left" size={22} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Perry-Castañeda Library (PCL)</Text>
          <Text style={styles.subtitle}>Select a Section</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>
      {/* Mini-map preview placed before the sections list */}
      <View style={styles.mapCard}>
        <View style={styles.miniMap}>
          {/* simplified room blocks to mimic the floor map */}
          <View style={[styles.roomRow, { marginTop: 12 }]}> 
            <View style={[styles.roomBox, { backgroundColor: '#FFD43B' }]}><Text style={styles.roomLabel}>5J</Text></View>
            <View style={[styles.roomBox, { backgroundColor: '#0BB77E' }]}><Text style={styles.roomLabel}>5M</Text></View>
          </View>
          <View style={[styles.roomRow, { justifyContent: 'flex-start' }]}> 
            <View style={[styles.roomBox, { backgroundColor: '#0BB77E' }]}><Text style={styles.roomLabel}>5E</Text></View>
          </View>
        </View>

        <View style={styles.mapToolbar}>
          <TouchableOpacity style={styles.mapButton}><MaterialIcons name="search" size={16} color="#FFD43B" /></TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}><MaterialIcons name="zoom-in" size={16} color="#FFD43B" /></TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}><MaterialIcons name="refresh" size={16} color="#FFD43B" /></TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sampleSections}
        keyExtractor={(s) => s.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => router.push(`/library/${id}/section/${item.id}` as any)}>
            <View style={styles.rowLeft}>
              <View style={[styles.statusBox, { backgroundColor: statusColor(item.status) }]}> 
                <Text style={styles.statusBoxText}>{item.id}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{item.name}</Text>
                <Text style={styles.rowSubtitle}>{item.available} of {item.capacity} seats available</Text>
              </View>
            </View>

            <View style={styles.rowRight}>
              <View style={[styles.pill, item.status === 'available' ? styles.pillAvailable : item.status === 'limited' ? styles.pillWarning : styles.pillReserved]}>
                <Text style={styles.pillText}>{item.status === 'available' ? 'Available' : item.status === 'limited' ? 'Limited' : 'Reserved'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.legendTitle}>Legend</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendSwatch, { backgroundColor: '#0BB77E' }]} />
              <Text style={styles.legendText}>Available (0-75% open)</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendSwatch, { backgroundColor: '#FFD43B' }]} />
              <Text style={styles.legendText}>Limited (10-40% open)</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendSwatch, { backgroundColor: '#FF6B6B' }]} />
              <Text style={styles.legendText}>Reserved / Full</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#071021' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 12 : 8, paddingBottom: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)' },
  headerTitle: { flex: 1, paddingLeft: 12 },
  title: { color: '#FFD43B', fontWeight: '700', fontSize: 16 },
  subtitle: { color: '#9AA0A6', fontSize: 12, marginTop: 4 },
  list: { paddingHorizontal: 16, paddingBottom: 120, paddingTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  statusBox: { width: 52, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  statusBoxText: { color: '#081017', fontWeight: '800' },
  rowText: { flex: 1 },
  rowTitle: { color: '#FFF', fontWeight: '700' },
  rowSubtitle: { color: '#9AA0A6', marginTop: 6, fontSize: 12 },
  rowRight: { marginLeft: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  pillText: { fontWeight: '700' },
  pillAvailable: { backgroundColor: '#0BB77E' },
  pillWarning: { backgroundColor: '#FFD43B' },
  pillReserved: { backgroundColor: '#FF6B6B' },
  sep: { height: 12 },
  footer: { marginTop: 12, padding: 12, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12 },
  legendTitle: { color: '#FFF', fontWeight: '700', marginBottom: 8 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  legendSwatch: { width: 18, height: 18, borderRadius: 4, marginRight: 10 },
  legendText: { color: '#9AA0A6' },
  /* mini-map styles */
  mapCard: { marginHorizontal: 16, backgroundColor: '#0b1220', borderRadius: 14, padding: 12, marginBottom: 12 },
  miniMap: { height: 220, backgroundColor: '#0d1722', borderRadius: 10, padding: 8, overflow: 'hidden' },
  roomRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6 },
  roomBox: { width: 74, height: 44, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  roomLabel: { color: '#081017', fontWeight: '800' },
  mapToolbar: { position: 'absolute', right: 12, top: 12, flexDirection: 'row', gap: 8 },
  mapButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#081017' },
});
