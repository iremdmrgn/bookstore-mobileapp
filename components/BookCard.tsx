import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
};

type Props = {
  book: Book;
  onPress?: () => void;
};

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

export default function BookCard({ book, onPress }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `"${book.title}" added to your cart.`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Favori kalp ikonu */}
      <TouchableOpacity onPress={handleToggleFavorite} style={styles.heartIcon}>
        <FontAwesome
          name={isFavorite ? 'heart' : 'heart-o'}
          size={18}
          color="red"
        />
      </TouchableOpacity>

      {/* Kitap görseli */}
      <Image source={getImageSource(book.coverImage)} style={styles.image} />

      {/* Kitap bilgileri */}
      <Text style={styles.name} numberOfLines={1}>
        {book.title}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        by {book.author}
      </Text>
      <Text style={styles.price}>${book.price}</Text>

      {/* Sepete ekle butonu */}
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Feather name="shopping-cart" size={14} color="#000" />
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 145,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 12,
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 6,
    right: 2,
    zIndex: 10,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    color: '#333',
    marginTop: 4,
    marginBottom: 8,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9A825',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cartButtonText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
    marginLeft: 4,
  },
});
