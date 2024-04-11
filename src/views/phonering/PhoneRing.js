import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';

const _color = '#6E01EF';
const _size = 100;

const PhoneRing = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1, ...styles.center}}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(10).keys()].map(index => {
          return (
            <MotiView
              key={index}
              from={{opacity: 0.5, scale: 1}}
              animate={{opacity: 0, scale: 4}}
              transition={{
                type: 'timing',
                duration: 2000,
                easing: Easing.out(Easing.ease),
                delay: index * 400,
                repeatReverse: false,
                loop: true,
              }}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Image source={require('../../assets/images/call.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PhoneRing;
