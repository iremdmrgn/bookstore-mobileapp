import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const Banner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/banner.png')} // banner.png buraya
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textOverlay}>
    
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#eee',
    marginTop: 8,
  },
})

export default Banner
