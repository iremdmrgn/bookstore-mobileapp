import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

// 1. Kitap tipini tanımla
type Book = {
  id: string
  title: string
  author: string
  coverImage: string
  price: number
}

// 2. Local image dosyasını eşleştiren yardımcı fonksiyon
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

  useEffect(() => {
    const loadBooks = async () => {
      const response = await require('../assets/books.json')
      setBooks(response)
    }
    loadBooks()
  }, [])

  return (
    <View style={styles.container}>
     

      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={getImageSource(item.coverImage)} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.author}>by {item.author}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingLeft: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
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
})
