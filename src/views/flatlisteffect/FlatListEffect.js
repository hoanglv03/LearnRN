import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {faker} from '@faker-js/faker';
const data = [...Array(30).keys()].map((_, i) => {
  //   return {key: faker.random.uuid(),image:`https://randomuser.me/api/portraits/${faker.helpers.}`};
});
export default function FlatListEffect() {
  return (
    <View>
      <Text>FlatListEffect</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
