import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen: React.FC = () => {
  // Sample favorite properties
  const favoriteProperties = [
    {
      id: '1',
      title: '2 BHK Apartment in Bandra',
      location: 'Bandra West, Mumbai',
      rent: '₹45,000',
      bhk: '2 BHK',
      area: '850 sq ft',
      savedDate: '2 days ago',
    },
    {
      id: '2',
      title: '3 BHK Villa in Andheri',
      location: 'Andheri East, Mumbai',
      rent: '₹65,000',
      bhk: '3 BHK',
      area: '1200 sq ft',
      savedDate: '1 week ago',
    },
  ];

  const renderFavoriteCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.favoriteCard}>
      <View style={styles.cardHeader}>
        <View style={styles.propertyImagePlaceholder}>
          <Ionicons name="home" size={30} color="#666" />
        </View>
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <View style={styles.propertyInfo}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.propertyLocation}>{item.location}</Text>
        </View>
        
        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rent</Text>
            <Text style={styles.detailValue}>{item.rent}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>{item.bhk}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Area</Text>
            <Text style={styles.detailValue}>{item.area}</Text>
          </View>
        </View>
        
        <Text style={styles.savedDate}>Saved {item.savedDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>Your saved properties</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favoriteProperties.length}</Text>
            <Text style={styles.statLabel}>Saved Properties</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Price Alerts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Shortlisted</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Properties</Text>
          <TouchableOpacity>
            <Text style={styles.sortText}>Sort by Date</Text>
          </TouchableOpacity>
        </View>

        {favoriteProperties.length > 0 ? (
          <FlatList
            data={favoriteProperties}
            renderItem={renderFavoriteCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={60} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Start exploring properties and save your favorites here
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Properties</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sortText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  favoriteCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    position: 'relative',
  },
  propertyImagePlaceholder: {
    height: 150,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardContent: {
    padding: 15,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 5,
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  savedDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  exploreButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen;
