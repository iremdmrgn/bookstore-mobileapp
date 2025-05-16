import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Banner from '../components/Banner';
import BookCard from '../components/BookCard';
import Navbar from '../components/Navbar';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
};

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: '' });
  }, [navigation]);

  useEffect(() => {
    const loadBooks = async () => {
      const response = await require('../assets/books.json');
      setBooks(response);
    };
    loadBooks();
  }, []);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % Math.min(10, books.length);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + Math.min(10, books.length)) % Math.min(10, books.length);
    flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    setCurrentIndex(prevIndex);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Banner />

      <Text style={styles.title}>Top Sellers</Text>

      <View style={styles.scrollContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrow}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={books.slice(0, 10)} // 🔥 sadece ilk 10 kitap
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard book={item} />}
        />

        <TouchableOpacity onPress={handleNext} style={styles.arrow}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 20,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 8,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  arrow: {
    width: 30,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 24,
    color: '#555',
  },
});
