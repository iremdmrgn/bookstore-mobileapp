import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  {
    title: "New Releases This Week",
    description:
      "Discover the hottest new releases and add fresh titles to your reading list this week.",
    imgSrc: require('../assets/images/banner.png'),
    extraImg: require('../assets/images/forbanner.png'),
    bgColor: '#001f3d',
  },
  {
    title: "Valentine's Day Sale 💖",
    description:
      "Fall in love with our exclusive Valentine's Day discounts.",
    imgSrc: require('../assets/images/valentines-sale.png'),
    extraImg: require('../assets/images/valentines-sale2.png'),
    bgColor: '#FFB6C1',
  },
  {
    title: "Winter Book Sale!! ❄️",
    description:
      "Stay warm with great reads at unbeatable prices.",
    imgSrc: require('../assets/images/winter-sale.png'),
    extraImg: require('../assets/images/winter-sale2.png'),
    bgColor: '#ADD8E6',
  },
];

const Banner = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item, index }: { item: typeof banners[0]; index: number }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.bgColor }]}>
        <View style={styles.content}>
          {/* Left Image (if any) */}
          {item.extraImg && (
            <Image source={item.extraImg} style={styles.sideImage} />
          )}

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Right Main Image */}
          <Image source={item.imgSrc} style={styles.mainImage} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    marginBottom: 16,
  },
slide: {
  width: width,
  height: 240,
  justifyContent: 'center', // tekrar ortala
  alignItems: 'center',
  paddingTop: 0,             // eski haline getir
},
content: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 12,
  width: '100%',
  marginTop: -32,
},

  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Lobster-Regular', // Eğer font yüklü ise
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#eee',
    fontFamily: 'serif',
  },
  sideImage: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  mainImage: {
    width: 90,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 12,
  },
});

export default Banner;
