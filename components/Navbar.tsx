import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavbarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabPress }) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
    },
    {
      id: 'search',
      label: 'Search',
      icon: 'search-outline',
      activeIcon: 'search',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'heart-outline',
      activeIcon: 'heart',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'chatbubble-outline',
      activeIcon: 'chatbubble',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person-outline',
      activeIcon: 'person',
    },
  ];

  return (
    <View style={styles.navbar}>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onTabPress(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <Ionicons
                name={isActive ? item.activeIcon as any : item.icon as any}
                size={24}
                color={isActive ? '#2563eb' : '#6b7280'}
              />
            </View>
            <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingBottom: 25,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
  activeIconContainer: {
    backgroundColor: '#eff6ff',
  },
  navLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default Navbar;
