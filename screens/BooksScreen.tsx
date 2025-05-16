import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Banner from '../components/Banner';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import News from '../components/News';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
};

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentTopIndex, setCurrentTopIndex] = useState(0);
  const [currentRecommendIndex, setCurrentRecommendIndex] = useState(0);

  const topListRef = useRef<FlatList>(null);
  const recommendListRef = useRef<FlatList>(null);

  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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

  const handleTopNext = () => {
    const nextIndex = (currentTopIndex + 1) % Math.min(10, books.length);
    topListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentTopIndex(nextIndex);
  };

  const handleTopPrev = () => {
    const prevIndex =
      (currentTopIndex - 1 + Math.min(10, books.length)) % Math.min(10, books.length);
    topListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    setCurrentTopIndex(prevIndex);
  };

  const handleRecommendNext = () => {
    const nextIndex =
      (currentRecommendIndex + 1) % Math.min(10, books.length - 10);
    recommendListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentRecommendIndex(nextIndex);
  };

  const handleRecommendPrev = () => {
    const prevIndex =
      (currentRecommendIndex - 1 + Math.min(10, books.length - 10)) %
      Math.min(10, books.length - 10);
    recommendListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    setCurrentRecommendIndex(prevIndex);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top,
      }}
    >
      <ScrollView style={styles.container}>
        <Navbar />
        <Banner />

        {/* Top Sellers */}
        <Text style={styles.title}>Top Sellers</Text>
        <View style={styles.scrollContainer}>
          <TouchableOpacity onPress={handleTopPrev} style={styles.arrow}>
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>

          <FlatList
            ref={topListRef}
            data={books.slice(0, 10)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={() =>
                  router.push({ pathname: '/book/[id]', params: { id: item.id } })
                }
              />
            )}
          />

          <TouchableOpacity onPress={handleTopNext} style={styles.arrow}>
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Recommend Books */}
        <Text style={styles.title}>Recommend Books</Text>
        <View style={styles.scrollContainer}>
          <TouchableOpacity onPress={handleRecommendPrev} style={styles.arrow}>
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>

          <FlatList
            ref={recommendListRef}
            data={books.slice(10, 20)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={() =>
                  router.push({ pathname: '/book/[id]', params: { id: item.id } })
                }
              />
            )}
          />

          <TouchableOpacity onPress={handleRecommendNext} style={styles.arrow}>
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>

        <News />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
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
