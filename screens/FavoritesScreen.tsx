import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFavorites } from '../context/FavoriteContext';

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

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      {/* Silme butonu sağ üst */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(item.id)}
      >
        <FontAwesome name="trash" size={14} color="#fff" />
      </TouchableOpacity>

      <Image source={getImageSource(item.coverImage)} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.author}>by {item.author}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <TouchableOpacity style={styles.cartButton}>
        <Feather name="shopping-cart" size={14} color="#000" />
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome name="heart-o" size={60} color="#aaa" />
        <Text style={styles.emptyText}>No favorite books yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fefefe',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    width: '48%',
    alignItems: 'center',
    position: 'relative',

    // Gölge (hem Android hem iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    color: '#444',
    marginBottom: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#e53935',
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#facc15',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 24,
    marginTop: 4,
  },
  cartButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
  },
});
