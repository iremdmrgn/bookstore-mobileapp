import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import BooksScreen from '../../screens/BooksScreen';

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <BooksScreen />
    </View>
  );
}
