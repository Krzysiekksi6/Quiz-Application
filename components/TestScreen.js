import { shuffle } from 'lodash';
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
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import SQLite from 'react-native-sqlite-storage';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {ProgressBar, MD3Colors, Button} from 'react-native-paper';
import Answer from './Answer';
import Question from './Question';

const db = SQLite.openDatabase(
  {name: 'user_db', location: 'default'},
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);

const TestScreen = ({route, navigation}) => {
  const {itemId} = route.params;
  const [start, setStart] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState(null);

  const [test, setTest] = React.useState([]);
  const [testDB, setTestDB] = React.useState([]);
  const [questions, setQuest] = React.useState([{question: null, answers: []}]);

  const [currentIndex, setIndex] = React.useState(0);
  const [currentQuestion, setQuestion] = React.useState(
    questions[currentIndex],
  );

  const [netinfo, setNetInfo] = React.useState('');

  const [currentPoints, setCurrentPoints] = React.useState(0);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'quiz' +
          '(id TEXT, quiz_data TEXT);',
      );
    });
  };

  // CREATE TABLE "quiz" (
  //   "id"	TEXT NOT NULL,
  //   "quiz_data"	TEXT NOT NULL,
  //   PRIMARY KEY("id")
  // )

  const getTestFromDatabase = () => {
    console.log('baza danych');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT quiz_data FROM quiz where id=?',
        [itemId],
        (tx, results) => {
          setTestDB(JSON.parse(results.rows.item(0).quiz_data));
          //to load from database 2 lines  V
          setTest(JSON.parse(results.rows.item(0).quiz_data));
          setQuest((JSON.parse(results.rows.item(0).quiz_data).tasks));
          console.log("SETQUEST",(JSON.parse(results.rows.item(0).quiz_data).tasks));
          setLoading(false);
          // setQuestion(questions[currentIndex]);      
        },
      );
    });
  };

  const saveDatainDB = data => {
    console.log(typeof data);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO quiz (id, quiz_data) VALUES (?,?)',
        [itemId, data],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Save!');
          } else console.log('Save Failed');
        },
      );
    });
  };
  
  const getTestFromApiAsync = async () => {
    const URL_GET = `https://tgryl.pl/quiz/test/${itemId}`;
    console.log("POBRANIE DANYCH Z INTERNETU");
    try {
      const response = await fetch(URL_GET);
      const json = await response.json();
      saveDatainDB(JSON.stringify(json))
      // setTest(json);
      // await setQuest(shuffle(json.tasks));
    } catch (error) {
      console.log(error);
    } finally {
      getTestFromDatabase();
      // setQuestion(questions[currentIndex]);
      setLoading(false);
    }
  };

  const handleGetInfoNet = () => {
    NetInfo.fetch().then(state => {
      setNetInfo(state.isConnected);
    });
  };

  const sendResultToApiAsync = async () => {
    const URL = 'http://tgryl.pl/quiz/result';
    console.log('POST METHOD');
    if(netinfo === true) {

      try {
      fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nick: username,
          score: currentPoints,
          total: test.tasks.length,
          type: test.name,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    Alert.alert("Brak neta mój przyjacielu")
  }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setIndex(currentIndex + 1);
      setQuestion(questions[currentIndex + 1]);
    } else {
      sendResultToApiAsync();
      netinfo ?  navigation.navigate('Results') : navigation.navigate('Home');
      Alert.alert('Points: ' + currentPoints + '/' + questions.length);
    }
  };

  const checkAnswer = answer => {
    if (answer === true) {
      setCurrentPoints(currentPoints + 1);
    }
    nextQuestion();
  };

  React.useEffect(() => {
    createTable();
    handleGetInfoNet();
    if (netinfo === true) {
      getTestFromApiAsync();
    }
    if (netinfo === false) {
      getTestFromDatabase();
    }
    
  }, [netinfo]);

 

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#00ADB5"
          style={styles.loading}
        />
      ) : (
        <View style={styles.content}>
          {!start ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#eeeeee',
                  fontSize: 24,
                  margin: 15,
                  textAlign: 'center',
                }}>
                Enter your Nickname:
              </Text>
              <TextInput
                style={{
                  color: '#eeeeee',
                  borderWidth: 2,
                  borderColor: '#eeeeee',
                  borderRadius: 8,
                  margin: 12,
                  padding: 15,
                }}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor={'#eeeeee'}></TextInput>
              <TouchableOpacity
                style={{
                  margin: 50,
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: '#eeeeee',
                  backgroundColor: '#00ADB5',
                }}
                onPress={() => {
                  setQuestion(questions[currentIndex]);
                  setStart(true);
                }}>
                <Text
                  style={{fontSize: 25, textAlign: 'center', color: '#EEEEEE'}}>
                  start
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.content}>
              {console.log("Q!!", currentQuestion.question)}
              <Question
                Question={currentQuestion.question}
                numberQuestion={currentIndex + 1}
                allQuestionNumber={questions.length}
                duration={currentQuestion.duration}
              />
              <Answer answerss={currentQuestion.answers} click={checkAnswer} />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#393E46',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#393E46',
  },
});
