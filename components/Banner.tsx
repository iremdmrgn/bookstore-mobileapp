import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'

const banners = [
  require('../assets/images/banner.png'),
  require('../assets/images/valentines-sale.png'),
  require('../assets/images/winter-sale.png'),
]

const { width } = Dimensions.get('window')

const Banner = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} resizeMode="cover" />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  image: {
    width: width,
    height: 200,
    borderRadius: 12,
  },
})

export default Banner
