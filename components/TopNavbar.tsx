import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TopNavbar = () => {
  const router = useRouter();
  
  const handleLoginPress = () => {
    // Navigate to the login screen
    router.push('/login');
  };
  
  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => {
          // Handle menu press (you can add a drawer navigation here if needed)
        }}
      >
        <Ionicons name="menu" size={24} color="#1f2937" />
      </TouchableOpacity>
      
      <Text style={styles.title}>PropertyAdda</Text>
      
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLoginPress}
        testID="login-button"
      >
        <Ionicons name="person" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    zIndex: 1,
  },
  loginButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default TopNavbar;
