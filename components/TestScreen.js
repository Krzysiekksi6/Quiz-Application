import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import {ProgressBar, MD3Colors, Button} from 'react-native-paper';

const TestScreen = () => {
  const renderItem = () => {
    return (
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text>Question number: 12</Text>
        <Text>Time: 28sec</Text>
      </View>
      <ProgressBar
        style={{width: '70%', margin: 50, height: 10}}
        progress={0.5}
        color={'#0FB345'}
      />
      <View style={styles.main}>
        <Text>W którym roku urodził się Adam Mickiewicz</Text>
        <Button
          style={{width: '40%'}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Answear A
        </Button>

        <Button
          style={{width: '40%'}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Answear B
        </Button>

        <Button
          style={{width: '40%'}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Answear C
        </Button>

        <Button
          style={{width: '40%'}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Answear D
        </Button>
      </View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  main: {
    flex: 4,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'stretch',
  },
});
