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
  Button,
} from 'react-native';
import {Card} from 'react-native-elements';
import {TESTS} from '../models/testItem';



const HomeScreen = ({navigation}) => {
  const onPressChangeScreen = () => {
    navigation.navigate('Results')
  };
  const renderTestItem = ({item}) => {
    return (
      <Card containerStyle={styles.cardStyle}>
        <Card.Title>
          <Text>{'Test: ' + item.name}</Text>
        </Card.Title>
        <Card.Divider />
        <Text>{item.description + '\n'}</Text>
        <Card.Divider />
        <Text style={styles.paragraph}>{'level: ' + item.level}</Text>
      </Card>
    );
  };
  return (
    <View style={styles.homeScreen}>
      <FlatList
        data={TESTS}
        keyExtractor={item => item.id}
        renderItem={renderTestItem}
      />
      <Card>
        <Card.Title>
          <Text>{'Get to know your ranking result'}</Text>
        </Card.Title>
        <Button title="Check" onPress={onPressChangeScreen} />
      </Card>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: '#222831',
  },
  cardStyle: {
    borderColor: '#222831',
    borderRadius: 8,
  },
  paragraph: {
    color: '#00ADB5',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
