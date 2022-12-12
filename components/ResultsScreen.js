import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  RefreshControl
} from 'react-native';
import { DataTable } from 'react-native-paper';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const ResultsScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);


    return(
        <View style={{backgroundColor: "#92868F", flex: 1}}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }>
        <DataTable>
            <DataTable.Header style={styles.header}>
                <DataTable.Title><Text style={styles.headerText}>Nick</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.headerText}>Point</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.headerText}>Type</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.headerText}>Date</Text></DataTable.Title>
            </DataTable.Header>
            <DataTable.Row style={styles.oddRow}>
                <DataTable.Cell><Text style={styles.fontColor}>mostAk</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>3/20</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>Films</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>28.01.2005</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.evenRow}>
                <DataTable.Cell><Text style={styles.fontColor}>Big_John</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>20/20</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>Front-End</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>25.13.2021</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.oddRow}>
                <DataTable.Cell><Text style={styles.fontColor}>Santa Claus</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>18/20</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>Christmas</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>25.12.2023</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.evenRow}>
                <DataTable.Cell><Text style={styles.fontColor}>kaneWest</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>23/20</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>History</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.fontColor}>01.08.1944</Text></DataTable.Cell>
            </DataTable.Row>
        </DataTable>
        </ScrollView>
        </View>
    );
}

export default ResultsScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00ADB5",
    },
    fontColor: {
        color: "#eeeeee",
    },
    headerText: {
        color: "#eeeeee",
        fontSize: 18,

    },
    oddRow: {
        fontSize: 16,
        backgroundColor: "#393E46",
    },
    evenRow: {
        backgroundColor: "#222831",

    }
   
})