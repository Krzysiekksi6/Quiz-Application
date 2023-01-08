import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
const Question = props => {
  const startTime = props.duration;
  const [seconds, setSeconds] = useState(startTime);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setSeconds(seconds => seconds - 1);
  //     }, 1000);
  //     if (interval === 0) {
  //       clearInterval(interval);
  //     }
  //   }, []);
  let timer;

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        setSeconds(prevCount => prevCount - 1);
      }, 1000);

    if (seconds === 0) {
      console.log('stop!');
      clearInterval(timer);
    }
  };

  useEffect(() => {
    updateCount();

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 30,
        }}>
        <Text style={{color: '#00ADB5', fontSize: 16}}>
          Question:{props.numberQuestion}/{props.allQuestionNumber}
        </Text>
        <Text style={{color: '#00ADB5', fontSize: 16}}>Time: {props.duration}</Text>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 25}}>
        <Text style={{color: '#eeeeee', fontSize: 16, textAlign: 'center'}}>
          {props.Question}{' '}
        </Text>
      </View>
    </>
  );
};

export default Question;
