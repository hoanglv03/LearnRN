import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {faker} from '@faker-js/faker';
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

const AVATAR_SIZE = 70;
const SPACING = 10;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function FlatListEffect() {
  const [images, setImages] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchRequest = async () => {
      const data = await fetchImages();
      setImages(data.photos);
    };
    fetchRequest();
  }, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Animated.FlatList
        data={images}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacityRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];
          const opacity = scrollY.interpolate({
            inputRange: opacityRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: '#CCC',
                marginHorizontal: SPACING,
                borderRadius: SPACING,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 10},
                shadowOpacity: 0.5,
                shadowRadius: 10,
                transform: [{scale}],
                opacity: opacity,
              }}>
              <Image
                source={{uri: item.src.portrait}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                }}
              />
              <View style={{marginLeft: SPACING}}>
                <Text>{item.alt}</Text>
                <Text style={{color: 'green'}}>{item?.photographer}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
