import React from 'react';
import { Slot, useRouter } from 'expo-router';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint ?? '#007aff';

  function navigate(path: string) {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  // router types are strict about literal routes; cast to any to allow dynamic paths here
  router.push(path as any);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.bottomBarWrapper} pointerEvents="box-none">
        <View style={[styles.bottomBar, { borderColor: '#00000008' }]}> 
          <TouchableOpacity accessibilityRole="button" onPress={() => navigate('/')} style={styles.iconButton}>
            <MaterialIcons name="home" size={26} color={tint} />
          </TouchableOpacity>

          <TouchableOpacity accessibilityRole="button" onPress={() => navigate('/explore')} style={styles.iconButton}>
            <MaterialIcons name="send" size={26} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity accessibilityRole="button" onPress={() => navigate('/settings')} style={styles.iconButton}>
            <MaterialIcons name="settings" size={26} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  content: { flex: 1, paddingBottom: 100 },
  bottomBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  bottomBar: {
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 16 : 12,
    backgroundColor: '#fff',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
  },
  iconButton: { paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center' },
});
