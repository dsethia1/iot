import React from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Icon from '@expo/vector-icons/Feather';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.list}>
          <TouchableOpacity style={[styles.row, styles.rowActive]} onPress={() => {}} accessibilityRole="button">
            <View style={styles.iconWrap}><Icon name="bell" size={20} color="#111" /></View>
            <Text style={[styles.rowText, styles.rowTextActive]}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}} accessibilityRole="button">
            <View style={styles.iconWrap}><Icon name="lock" size={20} color="#111" /></View>
            <Text style={styles.rowText}>Privacy Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}} accessibilityRole="button">
            <View style={styles.iconWrap}><Icon name="info" size={20} color="#111" /></View>
            <Text style={styles.rowText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}} accessibilityRole="button">
            <View style={styles.iconWrap}><Icon name="sun" size={20} color="#111" /></View>
            <Text style={styles.rowText}>Dark Mode</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer so content isn't hidden behind floating bottom bar */}
        <View style={{ height: 140 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#000',
    marginBottom: 24,
  },
  list: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  rowActive: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
  iconWrap: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rowText: {
    fontSize: 18,
    color: '#111',
  },
  rowTextActive: {
    fontWeight: '600',
  },
});
