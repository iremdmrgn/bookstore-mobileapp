import {
    AntDesign,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      {/* Sol: Kitap ikonu + Başlık */}
      <View style={styles.brand}>
        <MaterialCommunityIcons name="book-open-page-variant" size={26} color="#000" />
        <Text style={styles.title}>Leaf & Chapter</Text>
      </View>

      {/* Sağ: Arama, Favori, Sepet, Profil */}
      <View style={styles.icons}>
        <TouchableOpacity>
          <Feather name="search" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="hearto" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="user-o" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
})
