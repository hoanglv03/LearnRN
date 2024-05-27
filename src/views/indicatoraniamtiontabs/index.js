/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useState, useEffect, useCallback} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  findNodeHandle,
  Pressable,
} from 'react-native';

const {height, width} = Dimensions.get('screen');
const images = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Tab = forwardRef(({item, onPressItem}, ref) => {
  return (
    <Pressable onPress={onPressItem}>
      <View ref={ref}>
        <Text
          style={{
            color: 'white',
            fontSize: 84 / data.length,
            fontWeight: '700',
          }}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
});

const Indicator = ({measures, scrollX}) => {
  const inputRange = data.map((_, i) => i * width);
  console.log(scrollX);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        bottom: -10,
        height: 3,
        width: indicatorWidth,
        left: 0,
        transform: [{translateX}],
      }}
    />
  );
};
const Tabs = ({scrollX, value, onPressItem}) => {
  const containerRef = React.useRef();
  const [measures, setMeasures] = useState([]);
  useEffect(() => {
    let m = [];
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({x, y, width, height});
          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, []);

  return (
    <View style={{position: 'absolute', top: 100, width}}>
      <View
        ref={containerRef}
        style={{flexDirection: 'row', justifyContent: 'space-evenly', flex: 1}}>
        {value.map((item, index) => {
          return (
            <Tab
              item={item}
              key={item.key}
              ref={item.ref}
              onPressItem={() => onPressItem(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

export default function AnimationTabs() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onPressItem = useCallback(itemIndex => {
    ref.current.scrollToOffset({
      offset: itemIndex * width,
      animated: true,
    });
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <View style={{height, width}}>
              <Image
                source={{uri: item.image}}
                resizeMode="cover"
                style={{flex: 1}}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: 'rgba(0,0,0,0.3)'},
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} value={data} onPressItem={onPressItem} />
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
