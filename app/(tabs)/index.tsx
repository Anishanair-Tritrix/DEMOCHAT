import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const chats = [
  { id: '1', name: 'Kanika Singh', message: 'Alright, I have booked our tickets.', time: '12:42 PM', avatar: '' },
  { id: '2', name: 'Abhishek M.', message: 'Hey! Just a reminder about dinner plans.', time: 'Yesterday', avatar: '' },
  { id: '3', name: 'Himanshi', message: 'Good morning! Hope you’re doing well.', time: 'Wed', avatar: '' },
  { id: '4', name: 'Aman', message: 'I came across an interesting article.', time: '19/09', avatar: '' },
  { id: '5', name: 'Nikita', message: 'Let’s choose the first option.', time: '19/09', avatar: '' },
];

export default function ChatList() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);

  const renderChat = ({ item }: { item: typeof chats[0] }) => (
    <TouchableOpacity
    style={styles.chatItem}
    onPress={() => router.push(`/chat/${item.id}`)}
    accessibilityLabel={`Open chat with ${item.name}`}
 // Navigate to individual chat screen
    >
      {item.avatar ? (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      ) : (
        renderFallbackAvatar(item.name)
      )}
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  React.useEffect(() => {
    setFilteredChats(
      chats.filter(chat =>
        chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
        chat.message.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderChat}
        contentContainerStyle={styles.chatList}
        ListEmptyComponent={<Text style={styles.noResultsText}>No results found.</Text>} // Handle no results
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
  fallbackAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lavender', // Updated to lavender
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  fallbackAvatarText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
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
  noResultsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});
function renderFallbackAvatar(name: string): React.ReactNode {
  throw new Error('Function not implemented.');
}

