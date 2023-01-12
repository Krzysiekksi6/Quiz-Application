import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
const Answer = props => {
  const answer = props.answerss;
  const correctAnswer = props.click;
  const mapAnswer = answer.map((anstab, index) => (
    <TouchableOpacity
      key={index}
      style={{
        display: 'flex',
        backgroundColor: '#00ADB5',
        borderRadius: 8,
        padding: 10,
        maxWidth: '50%',
        minWidth: '50%',
        maxHeight: '50%',
      }}
      onPress={() => {
        {
          correctAnswer(anstab.isCorrect);
        }
      }}>
      <Text style={{color: '#eeeeee', textAlign: 'center'}}>
        {anstab.content}
      </Text>
    </TouchableOpacity>
  ));
  return <View style={styles.answerBox}>{mapAnswer}</View>;
};

const styles = StyleSheet.create({
  answerBox: {
    flex: 2,
    display: 'flex',
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'stretch',
    backgroundColor: '#222831',
  },
});

export default Answer;
