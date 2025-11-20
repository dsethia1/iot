import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { Slot, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint ?? '#007aff';
  const tabIconDefault = Colors[colorScheme ?? 'light'].tabIconDefault ?? '#666';

  function navigate(path: string) {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  // router types are strict about literal routes; cast to any to allow dynamic paths here
  router.push(path as any);
  }

  // Determine active tab based on pathname
  const isHomeActive = pathname === '/';
  const isFavoritesActive = pathname === '/favorites';
  const isExploreActive = pathname === '/explore';
  const isSettingsActive = pathname === '/settings';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.bottomBarWrapper} pointerEvents="box-none">
        <View style={[styles.bottomBar, { borderColor: '#00000020', backgroundColor: colorScheme === 'dark' ? '#07070a' : Colors[colorScheme ?? 'light'].background }]}> 
          <TouchableOpacity accessibilityRole="button" onPress={() => navigate('/')} style={styles.iconButton}>
              <View style={[styles.iconCircle, isHomeActive && styles.iconCircleActive]}>
                <MaterialIcons name="home" size={20} color={isHomeActive ? '#0b0b0b' : '#FFF'} />
              </View>
          </TouchableOpacity>

          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Favorites" onPress={() => navigate('/favorites')} style={styles.iconButton}>
              <View style={[styles.iconCircle, isFavoritesActive && styles.iconCircleActive]}>
                <MaterialIcons name="bookmark" size={20} color={isFavoritesActive ? '#0b0b0b' : '#bfc3c7'} />
              </View>
          </TouchableOpacity>

          <TouchableOpacity accessibilityRole="button" onPress={() => navigate('/')} style={styles.iconButton}>
              <View style={[styles.iconCircle, /* center always highlighted for location-style action */ pathname.startsWith('/library') && styles.iconCircleActive]}>
                <MaterialIcons name="location-on" size={20} color={pathname.startsWith('/library') ? '#0b0b0b' : '#FFD43B'} />
              </View>
          </TouchableOpacity>

          <TouchableOpacity accessibilityRole="button" onPress={() => navigate('/settings')} style={styles.iconButton}>
              <View style={[styles.iconCircle, isSettingsActive && styles.iconCircleActive]}>
                <MaterialIcons name="settings" size={20} color={isSettingsActive ? '#0b0b0b' : '#bfc3c7'} />
              </View>
          </TouchableOpacity>

          <TouchableOpacity accessibilityRole="button" onPress={() => navigate('/explore')} style={styles.iconButton}>
              <View style={[styles.iconCircle, isExploreActive && styles.iconCircleActive]}>
                <MaterialIcons name="search" size={20} color={isExploreActive ? '#0b0b0b' : '#bfc3c7'} />
              </View>
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
    width: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
  },
  iconButton: { paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center' },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconCircleActive: {
    backgroundColor: '#FFD43B',
  },
});
