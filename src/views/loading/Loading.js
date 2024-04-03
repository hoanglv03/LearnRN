/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';

const Loading = () => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomLoading = ({size}) => {
    return (
      <MotiView
        from={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 0,
          shadowOpacity: 0.5,
        }}
        animate={{
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
          borderWidth: size / 10,
          shadowOpacity: 1,
        }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: true,
        }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 10,
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      />
    );
  };
  return (
    <View style={{flex: 1, ...styles.center}}>
      <CustomLoading size={100} />
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Loading;
