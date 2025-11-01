import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBHK, setSelectedBHK] = useState('');
  const [rentRange, setRentRange] = useState('');

  // Sample property data - you can replace this with real data later
  const sampleProperties = [
    {
      id: '1',
      title: '2 BHK Apartment in Bandra',
      location: 'Bandra West, Mumbai',
      rent: '₹45,000',
      bhk: '2 BHK',
      area: '850 sq ft',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '2',
      title: '3 BHK Villa in Andheri',
      location: 'Andheri East, Mumbai',
      rent: '₹65,000',
      bhk: '3 BHK',
      area: '1200 sq ft',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '3',
      title: '1 BHK Studio in Powai',
      location: 'Powai, Mumbai',
      rent: '₹28,000',
      bhk: '1 BHK',
      area: '600 sq ft',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '4',
      title: '4 BHK Penthouse in Juhu',
      location: 'Juhu, Mumbai',
      rent: '₹1,20,000',
      bhk: '4 BHK',
      area: '2000 sq ft',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];
  const rentRanges = ['₹10k-25k', '₹25k-50k', '₹50k-75k', '₹75k-1L', '₹1L+'];

  const renderPropertyCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.propertyCard}>
      <View style={styles.propertyImagePlaceholder}>
        <Ionicons name="home" size={40} color="#666" />
      </View>
      <View style={styles.propertyDetails}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <View style={styles.propertyInfo}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.propertyLocation}>{item.location}</Text>
        </View>
        <View style={styles.propertySpecs}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Rent</Text>
            <Text style={styles.specValue}>{item.rent}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Type</Text>
            <Text style={styles.specValue}>{item.bhk}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Area</Text>
            <Text style={styles.specValue}>{item.area}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Property Adda</Text>
        <Text style={styles.headerSubtitle}>Find your perfect home</Text>
      </View>

      {/* Search Filters */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Find Properties</Text>

        {/* Location Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Location</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter city, locality or project"
              value={selectedLocation}
              onChangeText={setSelectedLocation}
            />
          </View>
        </View>

        {/* BHK Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>BHK Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
            {bhkOptions.map((bhk) => (
              <TouchableOpacity
                key={bhk}
                style={[
                  styles.optionButton,
                  selectedBHK === bhk && styles.optionButtonSelected
                ]}
                onPress={() => setSelectedBHK(selectedBHK === bhk ? '' : bhk)}
              >
                <Text style={[
                  styles.optionText,
                  selectedBHK === bhk && styles.optionTextSelected
                ]}>
                  {bhk}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Rent Range Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Rent Range</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
            {rentRanges.map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.optionButton,
                  rentRange === range && styles.optionButtonSelected
                ]}
                onPress={() => setRentRange(rentRange === range ? '' : range)}
              >
                <Text style={[
                  styles.optionText,
                  rentRange === range && styles.optionTextSelected
                ]}>
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="white" />
          <Text style={styles.searchButtonText}>Search Properties</Text>
        </TouchableOpacity>
      </View>

      {/* Properties Section */}
      <View style={styles.propertiesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Properties</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sampleProperties}
          renderItem={renderPropertyCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
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
  filtersContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filtersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  optionsScroll: {
    flexDirection: 'row',
  },
  optionButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionButtonSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  optionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: 'white',
  },
  searchButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  propertiesSection: {
    paddingHorizontal: 15,
    paddingBottom: 20,
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
  viewAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  propertyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  propertyImagePlaceholder: {
    height: 180,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyDetails: {
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
  propertySpecs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
});

export default HomeScreen;
