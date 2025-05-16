import { FontAwesome } from '@expo/vector-icons'; // FaFacebook, FaTwitter, FaInstagram yerini alır
import React from 'react';
import { Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  const handleLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't open URL", err));
  };

  return (
    <View style={styles.container}>
      {/* Logo & Nav */}
      <View style={styles.section}>
        <Image
          source={require('../assets/images/footer-logo.png')} // ✅ kendi logonu buraya koy
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.navLinks}>
          <Text style={styles.link}>Home</Text>
          <Text style={styles.link}>Services</Text>
          <Text style={styles.link}>About Us</Text>
          <Text style={styles.link}>Contact</Text>
        </View>
      </View>

      {/* Newsletter */}
      <View style={styles.section}>
        <Text style={styles.newsText}>
          Subscribe to our newsletter to receive the latest updates, news, and offers!
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom: Privacy + Social */}
      <View style={styles.bottomSection}>
        <View style={styles.privacyLinks}>
          <Text style={styles.link}>Privacy Policy</Text>
          <Text style={styles.link}>Terms of Service</Text>
        </View>
        <View style={styles.social}>
          <TouchableOpacity onPress={() => handleLink('https://facebook.com')}>
            <FontAwesome name="facebook" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('https://twitter.com')}>
            <FontAwesome name="twitter" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('https://instagram.com')}>
            <FontAwesome name="instagram" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 0,
  },
  logo: {
    width: 50,
    height: 60,
    marginBottom: 12,
  },
  navLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  link: {
    color: '#ccc',
    fontSize: 14,
    marginRight: 16,
    marginBottom: 4,
  },
  newsText: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 13,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#F9A825',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privacyLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  social: {
    flexDirection: 'row',
    gap: 16,
  },
});
