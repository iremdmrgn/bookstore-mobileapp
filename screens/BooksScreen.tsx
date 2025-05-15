import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Banner from '../components/Banner'; // BANNER
import Navbar from '../components/Navbar'; // NAVBAR

type Book = {
  id: string
  title: string
  author: string
  coverImage: string
  price: number
}

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
  }
  return images[fileName]
}

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    const loadBooks = async () => {
      const response = await require('../assets/books.json')
      setBooks(response)
    }
    loadBooks()
  }, [])

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % books.length
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
    setCurrentIndex(nextIndex)
  }

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + books.length) % books.length
    flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true })
    setCurrentIndex(prevIndex)
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <Banner />

      <View style={styles.scrollContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrow}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
        <FlatList
          ref={flatListRef}
          data={books}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={getImageSource(item.coverImage)}
                style={styles.image}
              />
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.author}>by {item.author}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={handleNext} style={styles.arrow}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
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
  card: {
    width: 140,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 12,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  author: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
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
})
