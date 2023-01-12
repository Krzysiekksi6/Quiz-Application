import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, StyleSheet} from 'react-native';

import {shuffle} from 'lodash';
import TestScreen from './TestScreen';

const RandomTest = ({navigation}) => {
  const [tests, setTest] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const getTestFromApiAsync = async () => {
    const URL_GET = `https://tgryl.pl/quiz/tests`;

    try {
      const response = await fetch(URL_GET);
      const json = await response.json();
      setTest(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getTestFromApiAsync();
    shuffle(tests);
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#00ADB5"
          style={styles.loading}
        />
      ) : (
        navigation.navigate('Test', {
          itemId: tests[Math.floor(Math.random()*tests.length)].id,
        })
      )}
    </>
  );
};

export default RandomTest;

const styles = StyleSheet.create({
    loading: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#393E46',
    },
  });
