import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'moti';

const API_KEY = 'JoVftrLnZNNhWOTeUZjspSySRLgeSB73Ew6mvwOGvoDEAkp0jIZBNJHQ';
const URL = 'https://api.pexels.com/v1/search?query=japan';

const {height, width} = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = height * 0.5;

const fetchImages = async () => {
  const data = await fetch(URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const result = await data.json();
  return result;
};

const BlurScrollImage = () => {
  const [images, setImages] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  console.log({scrollX});
  useEffect(() => {
    const fetchRequest = async () => {
      const data = await fetchImages();
      setImages(data.photos);
    };
    fetchRequest();
  }, []);

  return (
    <>
      <StatusBar hidden />

      <View style={StyleSheet.absoluteFillObject}>
        {images?.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width + 1,
            (index + 20) * width,
          ];
          console.log({inputRange});
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{uri: item.src?.portrait}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={10}
            />
          );
        })}
      </View>

      <Animated.FlatList
        data={images}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        pagingEnabled
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{width, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: item.src.portrait}}
                style={{width: imageW, height: imageH, resizeMode: 'cover'}}
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default BlurScrollImage;

const styles = StyleSheet.create({});
