import * as React from 'react';
import {
  Image,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Text} from 'moti';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const images = [
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const product = {
  title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
  description: [
    'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
  ],
  price: '29.99£',
};
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const BORDER_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;
export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar hidden />
      <View style={{height: ITEM_HEIGHT, overflow: 'hidden'}}>
        <Animated.FlatList
          data={images}
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate={'fast'}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={styles.image} />
          )}
        />
      </View>
      <View style={styles.pagination}>
        {images.map((_, index) => {
          return <View style={styles.dot} key={index + '123'} />;
        })}

        <Animated.View
          style={[
            styles.dotIndicator,
            {
              transform: [
                {
                  translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate(
                    {
                      inputRange: [0, 1],
                      outputRange: [0, BORDER_INDICATOR_SIZE],
                    },
                  ),
                },
              ],
            },
          ]}
        />
      </View>
      <BottomSheet snapPoints={[height - ITEM_HEIGHT, height]}>
        <BottomSheetScrollView style={{padding: 16, backgroundColor: 'white'}}>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {product.title}
          </Text>
          <Text>{product.price}</Text>
          <View style={{marginTop: 10}}>
            {product.description.map((text, index) => {
              return <Text key={index}>{text}</Text>;
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    top: 200,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'black',
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: BORDER_INDICATOR_SIZE,
    height: BORDER_INDICATOR_SIZE,
    borderRadius: BORDER_INDICATOR_SIZE,
    borderColor: 'black',
    borderWidth: 1,
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
});
