/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: '../../assets/images/pizza.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: '../../assets/images/taco.png',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: '../../assets/images/fast-food.png',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: '../../assets/images/hot-dog.png',
  },
];

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(_ => _),
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  );
};
const Indicator = ({scrollX}) => {
  return (
    <View style={{flexDirection: 'row', position: 'absolute', bottom: 100}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scaleAnimation = scrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1.3, 0.7],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1.3, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#ccc',
              margin: 10,
              opacity,
              transform: [{scale: scaleAnimation}],
            }}
          />
        );
      })}
    </View>
  );
};

const Square = ({scrollX}) => {
  const JOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );
  const rotate = JOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
    extrapolate: 'clamp',
  });
  const translateX = JOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        left: -height * 0.3,
        top: -height * 0.5,
        transform: [{rotate}, {translateX}],
      }}
    />
  );
};
export default function Onboarding() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={32}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => {
          return (
            <View style={{width, alignItems: 'center', padding: 16}}>
              <View style={{flex: 0.7, alignItems: 'center'}}>
                <Image
                  source={require('../../assets/images/hot-dog.png')}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{fontWeight: '800', fontSize: 22, color: '#fff'}}>
                  {item.title}
                </Text>
                <Text style={{marginTop: 10, color: '#fff'}}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
