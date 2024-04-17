/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import useImage from '../../hooks/useImage';

const {width} = Dimensions.get('screen');

const imageW = width * 0.65;
const imageH = imageW * 0.7;
const SPACING = 20;
const SwitchItemAnimated = () => {
  const images = useImage();

  const Content = ({item}) => {
    return (
      <>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            textTransform: 'uppercase',
            fontWeight: '600',
          }}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {item?.alt}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            textTransform: 'uppercase',
            fontWeight: '400',
            marginTop: 10,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {item?.photographer}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            textTransform: 'uppercase',
            fontWeight: '400',
            marginTop: 10,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {item?.photographer_id}
        </Text>
      </>
    );
  };
  const scrollX = useRef(new Animated.Value(0)).current;
  const process = Animated.modulo(Animated.divide(scrollX, width), width);
  return (
    <View style={{backgroundColor: 'pink', flex: 1}}>
      <StatusBar hidden />
      <SafeAreaView style={{marginTop: SPACING * 4}} />
      <View style={{height: imageH * 2.1}}>
        <Animated.FlatList
          data={images}
          keyExtractor={item => item.id.toString()}
          pagingEnabled
          horizontal
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          bounces={false}
          style={{flexGrow: 0, zIndex: 999999}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: imageH + SPACING * 2,
            paddingHorizontal: SPACING,
            zIndex: 9999,
          }}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [50, 0, 20],
            });
            return (
              <Animated.View
                style={{
                  width,
                  paddingVertical: SPACING,
                  opacity,
                  transform: [{translateY}],
                }}>
                <Image
                  source={{uri: item.src.portrait}}
                  style={{height: imageH, width: imageW}}
                />
              </Animated.View>
            );
          }}
        />
        <Content item={images[0]} />
      </View>
      <Animated.View
        style={{
          width: imageW + SPACING * 2,
          height: imageH * 2,
          backgroundColor: '#FFF',
          position: 'absolute',
          zIndex: -1,
          backfaceVisibility: true,
          top: SPACING * 4,
          left: 10,
          transform: [
            {perspective: imageW * 4},
            {
              rotateY: process.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '180deg', '360deg'],
              }),
            },
          ],
        }}
      />
    </View>
  );
};

export default SwitchItemAnimated;

const styles = StyleSheet.create({});
