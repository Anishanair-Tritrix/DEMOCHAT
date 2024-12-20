import React from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';


const chats = [
  { id: '1', name: 'Kanika Singh', message: 'Alright, I have booked our tickets. See you at the movies.', time: '12:42 PM', avatar: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Abhishek M.', message: 'Hey! Just a reminder about dinner plans.', time: 'Yesterday', avatar: 'https://via.placeholder.com/50' },
  { id: '3', name: 'Himanshi', message: 'Good morning! Hope you’re doing well.', time: 'Wed', avatar: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Aman', message: 'I came across an interesting article.', time: '19/09', avatar: 'https://via.placeholder.com/50' },
  { id: '5', name: 'Nikita', message: 'Let’s choose the first option.', time: '19/09', avatar: 'https://via.placeholder.com/50' },
];

export default function ChatList() {
  const router = useRouter();

  const renderChat = ({ item }: { item: typeof chats[0] }) => (
    <TouchableOpacity
    style={styles.chatItem}
    onPress={() => router.push(`/chat/${item.id}`)}
    accessibilityLabel={`Open chat with ${item.name}`}
 // Navigate to individual chat screen
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChat}
        contentContainerStyle={styles.chatList}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  chatList: {
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 10,
  },
});
