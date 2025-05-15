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

export default function BooksScreen() {
  // 2. Tipi belirterek useState kullan
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
      <Text style={styles.title}>📚 Kitaplar</Text>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.index}>{index + 1}.</Text>
            <Image source={{ uri: item.coverImage }} style={styles.image} />
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
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  card: {
    marginBottom: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 16,
  },
  index: { fontSize: 18, color: '#888', marginBottom: 4 },
  image: { width: 100, height: 150, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: '600', marginTop: 8 },
  author: { fontSize: 14, color: '#555' },
  price: { fontSize: 16, color: '#333', marginTop: 4 },
})
