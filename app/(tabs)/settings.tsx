import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        {/* Notifications - Highlighted */}
        <TouchableOpacity style={[styles.option, styles.optionHighlighted]}>
          <Icon name="bell" size={20} color="#000" style={styles.icon} />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        {/* Privacy Settings */}
        <TouchableOpacity style={styles.option}>
          <Icon name="lock" size={20} color="#000" style={styles.icon} />
          <Text style={styles.optionText}>Privacy Settings</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.option}>
          <Icon name="info" size={20} color="#000" style={styles.icon} />
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>

        {/* Dark Mode */}
        <TouchableOpacity style={styles.option}>
          <Icon name="sun" size={20} color="#000" style={styles.icon} />
          <Text style={styles.optionText}>Dark Mode</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  optionsContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionHighlighted: {
    backgroundColor: '#F3F4F6',
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});   