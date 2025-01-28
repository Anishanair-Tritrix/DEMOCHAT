import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const messagesData = [
  { id: '1', text: 'Hello! 😀', sender: 'user', type: 'text' },
  { id: '2', text: 'Hi there! 👋', sender: 'me', type: 'text' },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState(messagesData);
  const [inputText, setInputText] = useState('');
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

  // Send a message
  const sendMessage = () => {
    if (!inputText.trim() && !pickedImage) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: pickedImage || inputText,
        sender: 'me',
        type: pickedImage ? 'image' : 'text',
      },
    ]);

    setInputText('');
    setPickedImage(null);
  };

  // Pick an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPickedImage(result.assets[0].uri);
    }
  };

  // Pick a file
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (result.assets?.[0]) {
        const fileName = result.assets[0].name || 'Unnamed File';
        const fileUri = result.assets[0].uri;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: fileName,
            sender: 'me',
            type: 'file',
            uri: fileUri,
          },
        ]);
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  // Handle Emoji Selection
  const addEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    setEmojiPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Chat with {id}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.type === 'image' ? (
            <Image source={{ uri: item.text }} style={styles.imageMessage} />
          ) : (
            <Text style={[styles.message, item.sender === 'me' && styles.myMessage]}>
              {item.text}
            </Text>
          )
        }
        contentContainerStyle={styles.chatBody}
      />
      <View style={styles.chatInputContainer}>
        <TouchableOpacity onPress={() => setEmojiPickerVisible(!isEmojiPickerVisible)} style={styles.optionButton}>
          <Text style={styles.optionButtonText}>���</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.optionButton}>
          <Text style={styles.optionButtonText}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickFile} style={styles.optionButton}>
          <Text style={styles.optionButtonText}>📎</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.chatInput}
          placeholder="Type a message"
          placeholderTextColor="#aaa"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {isEmojiPickerVisible && (
        <View style={styles.emojiPicker}>
          <EmojiSelector
            onEmojiSelected={addEmoji}
            category={Categories.emotion}
            showSearchBar={false}
          />
        </View>
      )}
      {pickedImage && <Image source={{ uri: pickedImage }} style={styles.previewImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  chatHeader: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatBody: {
    flexGrow: 1,
    padding: 15,
  },
  message: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  chatInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  optionButton: {
    marginRight: 10,
    padding: 10,
  },
  optionButtonText: {
    fontSize: 20,
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 5,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  emojiPicker: {
    height: 300,
    backgroundColor: '#fff',
  },
});
