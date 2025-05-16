import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import books from '../assets/books.json';

const getImageSource = (fileName: string) => {
  const images: Record<string, any> = {
    'book-1.png': require('../assets/images/book-1.png'),
    'book-2.png': require('../assets/images/book-2.png'),
    'book-3.png': require('../assets/images/book-3.png'),
    'book-4.png': require('../assets/images/book-4.png'),
    'book-5.png': require('../assets/images/book-5.png'),
    'book-6.png': require('../assets/images/book-6.png'),
    'book-7.png': require('../assets/images/book-7.png'),
    'book-8.png': require('../assets/images/book-8.png'),
    'book-9.png': require('../assets/images/book-9.png'),
    'book-10.png': require('../assets/images/book-10.png'),
    'book-11.png': require('../assets/images/book-11.png'),
    'book-12.png': require('../assets/images/book-12.png'),
    'book-13.png': require('../assets/images/book-13.png'),
    'book-14.png': require('../assets/images/book-14.png'),
    'book-15.png': require('../assets/images/book-15.png'),
    'book-16.png': require('../assets/images/book-16.png'),
    'book-17.png': require('../assets/images/book-17.png'),
    'book-18.png': require('../assets/images/book-18.png'),
    'book-19.png': require('../assets/images/book-19.png'),
    'book-20.png': require('../assets/images/book-20.png'),
  };
  return images[fileName] || images['book-1.png'];
};

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      {/* ÜST: Logo ve Başlık */}
      <View style={styles.brandContainer}>
        <MaterialCommunityIcons name="book-open-page-variant" size={28} color="#000" />
        <Text style={styles.title}>Leaf & Chapter</Text>
      </View>

      {/* ALT: Search input + iconlar */}
      <View style={styles.bottomRow}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search books..."
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Feather name="search" size={20} color="#000" style={styles.searchIcon} />
        </View>

        <View style={styles.icons}>
          <TouchableOpacity>
            <AntDesign name="hearto" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="user-o" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Arama Sonuçları */}
      {searchQuery !== '' && (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          style={styles.searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => router.push({ pathname: '/book/[id]', params: { id: item.id } })}
            >
              <Image source={getImageSource(item.coverImage)} style={styles.resultImage} />
              <Text style={styles.resultText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    height: 36,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchResults: {
    maxHeight: 300,
    backgroundColor: '#fff',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 8,
  },
  resultImage: {
    width: 40,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 4,
    marginRight: 12,
  },
  resultText: {
    fontSize: 14,
    flexShrink: 1,
  },
});
