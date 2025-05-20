import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [phone, setPhone] = useState('+90 555 123 4567');
  const [selectedTab, setSelectedTab] = useState('userInfo');

  // Dummy state for orders, addresses, payments
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);

  // New Address State
  const [newAddress, setNewAddress] = useState({
    title: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // New Payment Method
  const [newPayment, setNewPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    holder: '',
  });

  const handleUpdate = () => {
    Alert.alert('Profile Updated', 'Your information has been saved successfully.');
  };

  const handleAddAddress = () => {
    if (!newAddress.title || !newAddress.street) {
      Alert.alert('Missing Info', 'Please fill out all address fields.');
      return;
    }
    setAddresses([...addresses, newAddress]);
    setNewAddress({ title: '', street: '', city: '', postalCode: '', country: '' });
    Alert.alert('Address Added', 'New address has been saved.');
  };

  const handleAddPayment = () => {
    if (!newPayment.cardNumber || !newPayment.expiry) {
      Alert.alert('Missing Info', 'Please fill out all payment fields.');
      return;
    }
    setPayments([...payments, newPayment]);
    setNewPayment({ cardNumber: '', expiry: '', cvv: '', holder: '' });
    Alert.alert('Payment Added', 'New payment method saved.');
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'userInfo':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>User Information</Text>
            {['First Name', 'Last Name', 'Email', 'Phone'].map((label, idx) => (
              <View key={idx} style={styles.inputGroup}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={
                    label === 'First Name'
                      ? firstName
                      : label === 'Last Name'
                      ? lastName
                      : label === 'Email'
                      ? email
                      : phone
                  }
                  onChangeText={(text) => {
                    if (label === 'First Name') setFirstName(text);
                    else if (label === 'Last Name') setLastName(text);
                    else if (label === 'Email') setEmail(text);
                    else setPhone(text);
                  }}
                  keyboardType={
                    label === 'Email'
                      ? 'email-address'
                      : label === 'Phone'
                      ? 'phone-pad'
                      : 'default'
                  }
                />
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update Info</Text>
            </TouchableOpacity>
          </View>
        );

      case 'orders':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>My Orders</Text>
            {orders.length === 0 ? (
              <Text style={styles.placeholderText}>No orders yet.</Text>
            ) : (
              orders.map((order, index) => (
                <Text key={index} style={styles.listItem}>
                  {order}
                </Text>
              ))
            )}
          </View>
        );

      case 'addresses':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>My Addresses</Text>
            {addresses.map((addr, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText}>{addr.title}</Text>
                <Text style={styles.cardText}>{addr.street}, {addr.city}</Text>
              </View>
            ))}
            {['title', 'street', 'city', 'postalCode', 'country'].map((field, idx) => (
              <TextInput
                key={idx}
                placeholder={field}
                style={styles.input}
                value={newAddress[field]}
                onChangeText={(text) =>
                  setNewAddress({ ...newAddress, [field]: text })
                }
              />
            ))}
            <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
              <Text style={styles.buttonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        );

      case 'payment':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>My Payment Methods</Text>
            {payments.map((p, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText}>**** **** **** {p.cardNumber.slice(-4)}</Text>
                <Text style={styles.cardText}>Exp: {p.expiry}</Text>
              </View>
            ))}
            {['cardNumber', 'expiry', 'cvv', 'holder'].map((field, idx) => (
              <TextInput
                key={idx}
                placeholder={field}
                style={styles.input}
                value={newPayment[field]}
                onChangeText={(text) =>
                  setNewPayment({ ...newPayment, [field]: text })
                }
              />
            ))}
            <TouchableOpacity style={styles.button} onPress={handleAddPayment}>
              <Text style={styles.buttonText}>Add Payment</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.tabContainer}>
          {[
            { key: 'userInfo', label: 'User Info' },
            { key: 'orders', label: 'Orders' },
            { key: 'addresses', label: 'Addresses' },
            { key: 'payment', label: 'Payment' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
              onPress={() => setSelectedTab(tab.key)}
            >
              <Text style={styles.tabText}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderTabContent()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  tabContainer: {
    marginBottom: 24,
  },
  tab: {
    backgroundColor: '#F9A825',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 10,
  },
  activeTab: {
    backgroundColor: '#F9A825',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#F9A825',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  listItem: {
    fontSize: 16,
    color: '#000',
    marginVertical: 4,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: {
    color: '#000',
    fontSize: 14,
  },
});

export default ProfileScreen;
