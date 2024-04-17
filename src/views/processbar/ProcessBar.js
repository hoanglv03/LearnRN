/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const Process = ({step, steps, height}) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);
  return (
    <>
      <Text>
        {step}/{steps}
      </Text>
      <View
        onLayout={ev => setWidth(ev.nativeEvent.layout.width)}
        style={{
          height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: height,
          overflow: 'hidden',
        }}>
        <Animated.View
          style={{
            height,
            width: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            transform: [{translateX: animatedValue}],
          }}></Animated.View>
      </View>
    </>
  );
};

export default function ProcessBar() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [index]);
  return (
    <View style={styles.container}>
      <Process step={index} steps={10} height={20} />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});
