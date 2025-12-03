import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Seat = { id: string; status: 'available' | 'occupied' | 'reserved'; label?: string };

function buildSeats(count: number, available: number) {
  const seats: Seat[] = [];
  // mark first `available` seats as available, rest as occupied (simple demo)
  for (let i = 1; i <= count; i++) {
    seats.push({ id: String(i), status: i <= available ? 'available' : 'occupied' });
  }
  return seats;
}

export default function SectionScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = params.id as string | undefined;
  const section = params.section as string | undefined;

  // For demo purposes use small sample data per section id
  const sample = {
    '5J': { capacity: 8, available: 3, studyType: 'Collaborative' },
    '5E': { capacity: 8, available: 4, studyType: 'Collaborative' },
    '5M': { capacity: 6, available: 2, studyType: 'Individual' },
  } as Record<string, { capacity: number; available: number; studyType: string }>;

  const meta = (section && sample[section]) ? sample[section] : { capacity: 8, available: 3, studyType: 'Collaborative' };
  const seats = buildSeats(meta.capacity, meta.available);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>Perry-Castañeda Library (PCL)</Text>
          <Text style={styles.subtitle}>{`Floor ${section?.charAt(0)} - Section ${section}`}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionCard}>
          <View>
            <Text style={styles.sectionTitle}>{`Section ${section}`}</Text>
            <Text style={styles.sectionSub}>{`${meta.available} of ${meta.capacity} seats available`}</Text>
          </View>
          <View style={styles.studyType}><Text style={styles.studyTypeText}>{meta.studyType}</Text></View>
        </View>

        <View style={styles.gridWrap}>
          <View style={styles.tablesGrid}>
            {[
              { id: 't1', label: 'Table 1', seats: 4, available: Math.min(2, meta.available) },
              { id: 't2', label: 'Table 2', seats: 4, available: 1 },
              { id: 't3', label: 'Table 3', seats: 4, available: 2 },
              { id: 't4', label: 'Table 4', seats: 4, available: 0 },
              { id: 't5', label: 'Table 5', seats: 4, available: 3 },
              { id: 't6', label: 'Table 6', seats: 4, available: 0 },
            ].map((table) => (
              <View key={table.id} style={styles.tableCard}>
                <View style={styles.tableSeats}>
                  <View style={styles.seatRow}>
                    {[0, 1].map((i) => {
                      const isAvailable = i < table.available;
                      return (
                        <View key={i} style={[styles.seat, isAvailable ? styles.seatAvailable : styles.seatOccupied]}>
                          <Text style={styles.seatText}>{i + 1}</Text>
                        </View>
                      );
                    })}
                  </View>

                  <View style={styles.tableRect}><Text style={styles.tableRectText}>{table.label}</Text></View>

                  <View style={styles.seatRow}>
                    {[2, 3].map((i) => {
                      const isAvailable = i < table.available;
                      return (
                        <View key={i} style={[styles.seat, isAvailable ? styles.seatAvailable : styles.seatOccupied]}>
                          <Text style={styles.seatText}>{i + 1}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>{`Section ${section} - Seat 1`}</Text>
          <Text style={styles.infoSub}>Table of 4{`\n`}Part of a shared table in Section {section}. Great for group work and collaboration.</Text>
          <View style={{ height: 10 }} />
          <Text style={styles.amenitiesTitle}>Nearby Amenities</Text>
          <View style={styles.amenitiesRow}>
            <View style={styles.amenity}><Text style={styles.amenityText}>Collaborative Commons</Text></View>
            <View style={styles.amenity}><Text style={styles.amenityText}>Study Area</Text></View>
            <View style={styles.amenity}><Text style={styles.amenityText}>Windows</Text></View>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#071021' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)' },
  headerText: { flex: 1, paddingLeft: 12 },
  title: { color: '#FFF', fontWeight: '700' },
  subtitle: { color: '#9AA0A6', marginTop: 4 },
  content: { padding: 16 },
  sectionCard: { backgroundColor: '#0b1220', padding: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: '#FFD43B', fontWeight: '700', marginBottom: 6 },
  sectionSub: { color: '#9AA0A6' },
  studyType: { backgroundColor: '#081017', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  studyTypeText: { color: '#FFD43B', fontWeight: '700' },
  gridWrap: { marginBottom: 16 },
  gridRowLabel: { marginBottom: 8 },
  gridLabel: { color: '#FFD43B', fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tablesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tableCard: { width: '48%', backgroundColor: 'transparent', alignItems: 'center', marginBottom: 14 },
  tableSeats: { flexDirection: 'column', alignItems: 'center', padding: 8 },
  seatRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 12 },
  tableRect: { width: '70%', height: 44, backgroundColor: '#222', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  tableRectText: { color: '#FFFFFF', fontWeight: '700' },
  seat: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', margin: 6 },
  seatText: { color: '#081017', fontWeight: '800' },
  seatAvailable: { backgroundColor: '#FFD43B' },
  seatOccupied: { backgroundColor: '#222', borderWidth: 1, borderColor: 'rgba(255,255,255,0.02)' },
  seatReserved: { backgroundColor: '#FF6B6B' },
  infoCard: { backgroundColor: '#0b1220', borderRadius: 12, padding: 12 },
  infoTitle: { color: '#FFD43B', fontWeight: '700', marginBottom: 6 },
  infoSub: { color: '#9AA0A6' },
  amenitiesTitle: { color: '#FFF', fontWeight: '700', marginTop: 8, marginBottom: 6 },
  amenitiesRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  amenity: { backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, marginRight: 8, marginBottom: 8 },
  amenityText: { color: '#9AA0A6', fontWeight: '600' },
});
