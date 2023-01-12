import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  RefreshControl,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import {RESULTS} from '../models/resultItem';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ResultsScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [resultData, setResultData] = React.useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const URL = 'https://tgryl.pl/quiz/results';

  React.useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(json => setResultData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderResultItem = ({item, index}) => {
    return index % 2 ? (
      <DataTable.Row style={styles.oddRow}>
        <DataTable.Cell>
          <Text style={styles.fontColor}>{item.nick}</Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={styles.fontColor}>
            {item.score}/{item.total}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={styles.fontColor}>{item.type}</Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={styles.fontColor}>{item.date}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    ) : (
      <DataTable.Row style={styles.evenRow}>
        <DataTable.Cell>
          <Text style={styles.fontColor}>{item.nick}</Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={styles.fontColor}>
            {item.score}/{item.total}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={styles.fontColor}>{item.type}</Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={styles.fontColor}>{item.date}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <View style={{backgroundColor: '#92868F', flex: 1}}>
      {/* <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title>
              <Text style={styles.headerText}>Nick</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Point</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Type</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Date</Text>
            </DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={resultData}
            keyExtractor={(item, index) => index}
            renderItem={renderResultItem}></FlatList>
        </DataTable>
      {/* </ScrollView> */}
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00ADB5',
  },
  fontColor: {
    color: '#eeeeee',
  },
  headerText: {
    color: '#eeeeee',
    fontSize: 18,
  },
  oddRow: {
    fontSize: 16,
    backgroundColor: '#393E46',
  },
  evenRow: {
    backgroundColor: '#222831',
  },
});
