/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';

const _color = {
  active: '#2C2C2C',
  inactive: '#DCDCDC',
};

const transition = {
  type: 'timing',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};
export default function Switch() {
  const Switch = ({size, onPress, isActive}) => {
    const trackWidth = React.useMemo(() => {
      return size * 1.5;
    }, [size]);
    const trackHeight = React.useMemo(() => {
      return size * 0.4;
    }, [size]);
    const knobSize = React.useMemo(() => {
      return size * 0.6;
    }, [size]);
    return (
      <Pressable onPress={onPress}>
        <View style={styles.center}>
          <MotiView
            transition={transition}
            from={{backgroundColor: isActive ? _color.active : _color.inactive}}
            animate={{
              backgroundColor: isActive ? _color.inactive : _color.active,
            }}
            style={{
              position: 'absolute',
              width: trackWidth,
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: _color.active,
            }}
          />
          <MotiView
            transition={transition}
            animate={{translateX: isActive ? trackWidth / 4 : -trackWidth / 4}}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: '#fff',
              ...styles.center,
            }}>
            <MotiView
              transition={transition}
              animate={{
                width: isActive ? 0 : knobSize,
                borderColor: isActive ? _color.active : _color.inactive,
              }}
              style={{
                width: knobSize,
                height: knobSize,
                borderRadius: knobSize / 2,
                borderWidth: size * 0.1,
                borderColor: _color.active,
              }}
            />
          </MotiView>
        </View>
      </Pressable>
    );
  };
  const [isActive, setActive] = React.useState(false);
  return (
    <View style={{flex: 1, ...styles.center, backgroundColor: 'white'}}>
      <Switch
        size={60}
        onPress={() => setActive(active => !active)}
        isActive={isActive}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
