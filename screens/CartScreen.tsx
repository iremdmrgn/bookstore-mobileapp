import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';


const getImageSource = (coverImage: string) => {
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

  return images[coverImage] || images['book-1.png'];
};

export default function CartScreen() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => clearCart() },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={getImageSource(item.coverImage)} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNumber}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
        <Feather name="trash" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="shopping-cart" size={64} color="#aaa" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Subtotal: ${total}</Text>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: 70, height: 100, borderRadius: 6, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600' },
  price: { fontSize: 13, color: '#444', marginVertical: 4 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#facc15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { fontSize: 16, fontWeight: 'bold' },
  qtyNumber: { fontSize: 14 },
  removeBtn: {
    backgroundColor: '#e53935',
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  checkoutBtn: {
    backgroundColor: '#facc15',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutText: {
    fontWeight: 'bold',
    color: '#000',
  },
  clearBtn: {
    alignItems: 'center',
    padding: 8,
  },
  clearText: {
    color: '#e53935',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
