import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BookCard from './BookCard';

const { width } = Dimensions.get('window');

const categories = ['Business', 'Fiction', 'Horror', 'Adventure'];

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  category?: string;
};

type Props = {
  books: Book[];
};

export default function TopSellers({ books }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const carouselRef = useRef<any>(null); // ✅ Carousel type fix: use any instead of Carousel<Book>

  const filteredBooks = books.filter((book) =>
    selectedCategory ? book.category === selectedCategory.toLowerCase() : true
  );

  const duplicatedBooks = [...filteredBooks, ...filteredBooks];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Sellers</Text>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        renderItem={({ item }: { item: string }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.categoryButtonActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Left / Right Buttons */}
      <View style={styles.leftArrow}>
        <TouchableOpacity onPress={() => carouselRef.current?.snapToPrev()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.rightArrow}>
        <TouchableOpacity onPress={() => carouselRef.current?.snapToNext()}>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Carousel
        ref={carouselRef}
        data={duplicatedBooks}
        renderItem={({ item }: { item: Book }) => <BookCard book={item} />}
        sliderWidth={width}
        itemWidth={160}
        loop
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 10,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#F9A825',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  leftArrow: {
    position: 'absolute',
    top: 160,
    left: 10,
    zIndex: 10,
    backgroundColor: '#F9A825',
    borderRadius: 20,
    padding: 6,
  },
  rightArrow: {
    position: 'absolute',
    top: 160,
    right: 10,
    zIndex: 10,
    backgroundColor: '#F9A825',
    borderRadius: 20,
    padding: 6,
  },
});
