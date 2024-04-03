import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const API_KEY = 'JoVftrLnZNNhWOTeUZjspSySRLgeSB73Ew6mvwOGvoDEAkp0jIZBNJHQ';
const URL = 'https://api.pexels.com/v1/search?query=nature';

const {height, width} = Dimensions.get('screen');
const fetchImages = async () => {
  const data = await fetch(URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const result = await data.json();
  return result;
};
export default function Gallery() {
  const [images, setImages] = useState([]);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [isActive, setIsActive] = useState();
  useEffect(() => {
    const fetchRequest = async () => {
      const data = await fetchImages();
      setImages(data.photos);
    };
    fetchRequest();
  }, []);
  const sesIsActiveIndex = index => {
    setIsActive(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (100 + 10) - 100 / 2 > width / 2) {
      bottomRef?.current?.scrollToOffset({
        offset: index * (100 + 10) - 100 / 2 + 100 / 2,
        animated: true,
      });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          sesIsActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({item}) => (
          <View style={{height, width}}>
            <Image
              source={{uri: item.src.original}}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        )}
      />
      <FlatList
        ref={bottomRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: 80}}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => sesIsActiveIndex(index)}
            activeOpacity={0.8}>
            <Image
              source={{uri: item.src.original}}
              style={{
                height: 100,
                width: 100,
                borderRadius: 10,
                marginRight: 10,
                borderColor: 'white',
                borderWidth: isActive === index ? 2 : 0,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
