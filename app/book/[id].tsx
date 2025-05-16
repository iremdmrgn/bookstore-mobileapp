import { Feather, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import books from '../../assets/books.json';

const getImageSource = (fileName: string) => {
  const images: Record<string, any> = {
    'book-1.png': require('../../assets/images/book-1.png'),
    'book-2.png': require('../../assets/images/book-2.png'),
    'book-3.png': require('../../assets/images/book-3.png'),
    'book-4.png': require('../../assets/images/book-4.png'),
    'book-5.png': require('../../assets/images/book-5.png'),
    'book-6.png': require('../../assets/images/book-6.png'),
    'book-7.png': require('../../assets/images/book-7.png'),
    'book-8.png': require('../../assets/images/book-8.png'),
    'book-9.png': require('../../assets/images/book-9.png'),
    'book-10.png': require('../../assets/images/book-10.png'),
    'book-11.png': require('../../assets/images/book-11.png'),
    'book-12.png': require('../../assets/images/book-12.png'),
    'book-13.png': require('../../assets/images/book-13.png'),
    'book-14.png': require('../../assets/images/book-14.png'),
    'book-15.png': require('../../assets/images/book-15.png'),
    'book-16.png': require('../../assets/images/book-16.png'),
    'book-17.png': require('../../assets/images/book-17.png'),
    'book-18.png': require('../../assets/images/book-18.png'),
    'book-19.png': require('../../assets/images/book-19.png'),
    'book-20.png': require('../../assets/images/book-20.png'),
  };
  return images[fileName] || images['book-1.png'];
};

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const book = books.find((item) => item.id === id);

  const [activeTab, setActiveTab] = useState<'description' | 'details'>('description');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `"${book?.title}" added to your cart.`);
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Book not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={getImageSource(book.coverImage)} style={styles.image} />
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteBox}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={20}
            color="red"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.price}>${book.price}</Text>

      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Feather name="shopping-cart" size={14} color="#000" />
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab('description')}>
          <Text
            style={[styles.tabText, activeTab === 'description' && styles.activeTab]}
          >
            Description
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('details')}>
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTab]}>
            Details
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'description' && (
        <Text style={styles.description}>
          {book.description || 'No description available.'}
        </Text>
      )}

      {activeTab === 'details' && (
        <View style={styles.detailList}>
          <Text>📖 Paper Type: {book.paperType || 'Standard'}</Text>
          <Text>📄 Page Count: {book.pageCount || 'N/A'}</Text>
          <Text>📐 Dimensions: {book.dimensions || 'N/A'}</Text>
          <Text>🗓 Edition Year: {book.editionYear || 'N/A'}</Text>
          <Text>🔢 Edition Number: {book.editionNumber || 'N/A'}</Text>
          <Text>🗣 Language: {book.language || 'English'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 250,
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
favoriteBox: {
  position: 'absolute',
  top: 0,
  right: -50,
  backgroundColor: '#FFA726', // turuncu iç renk
  borderRadius: 8,
  padding: 6,
  borderWidth: 4,
  borderColor: '#FFA726', // dış kenar da turuncu


    
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
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9A825',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 16,
  },
  cartButtonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginLeft: 6,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginTop: 12,
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
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    color: '#007AFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  detailList: {
    gap: 6,
    marginTop: 8,
  },
});
