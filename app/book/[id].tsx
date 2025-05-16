import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import books from '../../assets/books.json'; // ✅ kitapları JSON'dan al

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const book = books.find((item) => item.id === id);

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Book not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.coverImage }} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.price}>${book.price}</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
        Morbi nec leo eu purus facilisis porttitor nec ut urna.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: 'gray',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 18,
    color: 'red',
  },
});
