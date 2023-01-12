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
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Card} from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import {shuffle} from 'lodash';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'user_db', location: 'default'},
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({navigation}) => {
  const URL = 'https://tgryl.pl/quiz/tests';
  const [testData, setTestData] = React.useState([]);
  const [testDataDB, setTestDataDB] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [netinfo, setNetInfo] = React.useState('');

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'quizes' +
          '(id TEXT, name TEXT, description TEXT, level TEXT);',
      );
    });
  };

  const handleGetInfoNet = () => {
    NetInfo.fetch().then(state => {
      setNetInfo(state.isConnected);
      if (!state.isConnected) {
        alert(`Brak internetu`);
      }
    });
  };

  const getTests = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      saveDatainDB(json);
      setTestData(shuffle(json));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTestFromDatabase = async () => {
    await db.transaction(tx => {
      tx.executeSql('SELECT * FROM quizes;', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log('NAJWAZNEIJSZY:', results.rows.item(i));
        }
        setTestData(shuffle(temp));
        setLoading(false);
      });
    });
  };

  const saveDatainDB = async data => {
    for (let i = 0; i < data.length; i++) {
      console.log('start saving:', typeof data[i].id);
      await db.transaction(function async(tx) {
        tx.executeSql(
          'INSERT INTO quizes (id, name, description, level) VALUES (?, ?, ?, ?);',
          [data[i].id, data[i].name, data[i].description, data[i].level],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('Save!');
            } else console.log('Save Failed');
          },
        );
      });
    }
  };

  const sql = () => {
    console.log('SELECT');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, name, description, level FROM quizes;',
        [],
        (tx, results) => {
          let len = results.rows.length;
          console.log('LENGTH:', len);
          if (len > 0) {
            let id = results.rows(0).ID;
            console.log('WAZNY TEST: ', id);
          }
        },
      );
    });
    console.log('Baza2');
  };

  React.useEffect(() => {
    createTable();
    handleGetInfoNet();
    {
      netinfo ? getTests() : getTestFromDatabase();
    }
  }, [netinfo]);

  const onPressChangeScreen = () => {
    navigation.navigate('Results');
  };

  const moveToTest = testId => {
    console.log(testId);
    navigation.navigate('Test', {
      itemId: testId,
    });
  };

  const renderTestItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          moveToTest(item.id);
        }}>
        <Card containerStyle={styles.cardStyle}>
          <Card.Title>
            <Text>{'Test: ' + item.name}</Text>
          </Card.Title>
          <Card.Divider />
          <Text>{item.description + '\n'}</Text>
          <Card.Divider />
          <Text style={styles.paragraph}>{'level: ' + item.level}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.homeScreen}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={shuffle(testData)}
          keyExtractor={item => item.id}
          renderItem={renderTestItem}
        />
      </ScrollView>

      <Card>
        <Card.Title>
          <Text>{'Get to know your ranking result'}</Text>
        </Card.Title>
        <Button title="Check" onPress={sql} />
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
  Roboto: {
    fontFamily: 'Roboto-Regular',
  },
});
