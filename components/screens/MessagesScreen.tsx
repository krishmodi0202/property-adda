import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessagesScreen: React.FC = () => {
  // Sample messages/conversations
  const conversations = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      role: 'Property Owner',
      lastMessage: 'The property is available for viewing tomorrow',
      time: '2 min ago',
      unread: true,
      property: '2 BHK Apartment in Bandra',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      role: 'Agent',
      lastMessage: 'I have sent you the property documents',
      time: '1 hour ago',
      unread: false,
      property: '3 BHK Villa in Andheri',
    },
    {
      id: '3',
      name: 'Mumbai Properties',
      role: 'Agency',
      lastMessage: 'New properties matching your criteria',
      time: '3 hours ago',
      unread: true,
      property: 'Multiple Properties',
    },
  ];

  const renderConversationItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        
        <Text style={styles.contactRole}>{item.role}</Text>
        <Text style={styles.propertyName}>{item.property}</Text>
        
        <Text style={[
          styles.lastMessage,
          item.unread && styles.unreadMessage
        ]}>
          {item.lastMessage}
        </Text>
      </View>
      
      <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Stay connected with property owners</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="add-circle" size={24} color="#2563eb" />
            <Text style={styles.quickActionText}>New Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="call" size={24} color="#2563eb" />
            <Text style={styles.quickActionText}>Schedule Call</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Conversations</Text>
          <TouchableOpacity>
            <Text style={styles.markAllRead}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {conversations.length > 0 ? (
          <FlatList
            data={conversations}
            renderItem={renderConversationItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={60} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptySubtitle}>
              Start a conversation with property owners and agents
            </Text>
            <TouchableOpacity style={styles.startChatButton}>
              <Text style={styles.startChatButtonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <TouchableOpacity style={styles.helpItem}>
            <Ionicons name="help-circle-outline" size={20} color="#2563eb" />
            <Text style={styles.helpText}>Chat Guidelines</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#2563eb" />
            <Text style={styles.helpText}>Safety Tips</Text>
          </TouchableOpacity>
        </View>
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
  quickActions: {
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
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  quickActionText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
    marginTop: 8,
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
  markAllRead: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: 'white',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  messageTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  contactRole: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  propertyName: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
  },
  unreadMessage: {
    color: '#1f2937',
    fontWeight: '500',
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
  startChatButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startChatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  helpSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#2563eb',
    marginLeft: 10,
    fontWeight: '500',
  },
});

export default MessagesScreen;
