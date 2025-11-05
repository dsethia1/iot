import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
<Link href="/settings">Settings</Link>

export default function About() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About Page</Text>
    </View>
    );
    }   