import React from 'react';
import {
    FlatList,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const news = [
  {
    id: '1',
    title: 'Global Climate Summit Calls for Urgent Action',
    description:
      'World leaders gather to discuss strategies to combat climate change.',
    image: require('../assets/images/news-1.png'), // ✅ doğru path
    portalLink: 'https://www.bbc.com/news/science-environment-56901261',
  },
  {
    id: '2',
    title: 'Breakthrough in AI Technology Announced',
    description:
      'Researchers announce advancements that promise to revolutionize industries.',
    image: require('../assets/images/news-2.png'),
    portalLink: 'https://www.wired.com/story/mira-murati-thinking-machines-lab/',
  },
  {
    id: '3',
    title: 'AI-Powered Medicine: The Future of Healthcare',
    description: 'AI is transforming diagnosis, treatment, and healthcare systems.',
    image: require('../assets/images/news-3.png'),
    portalLink: 'https://www.cnn.com/health',
  },
];

export default function News() {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't open URL", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Latest News</Text>

      <FlatList
        data={news}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => handleOpenLink(item.portalLink)}>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingLeft: 16,
    marginBottom:32,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  listContent: {
    paddingRight: 16,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1e40af',
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
});
