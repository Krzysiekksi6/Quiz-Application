import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal, Portal, Provider, Button} from 'react-native-paper';

const RulesScreen = ({navigation}) => {
  const [visible, setVisible] = React.useState(true);
  const hideModal = () => setVisible(false);

  
  const getData = async() => {
    try {

      await AsyncStorage.getItem('@storage_Key').then (value => {
        if (value != null) {
          navigation.navigate('Home')
        }
      })
    } catch (error) {
      console.log(error);
    }
  
  }
    const handleSubmit = () => {
      // setVisible(false);
      try {
        AsyncStorage.setItem('@storage_Key', 'rules')
        hideModal()
      } catch (e) {
        console.log(e);
      }
      // hideModal();
      navigation.navigate('Home');
    };


  const containerStyle = {backgroundColor: 'white', padding: 20};

  React.useEffect(() => {
    getData();
  },[])

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          
          contentContainerStyle={containerStyle}>
          <Text style={{margin: 10, textAlign: 'center', fontWeight: 'bold'}}>
            Regulamin
          </Text>
          <Text>
            Niniejszy regulamin określa warunki konkursu organizowanego w ramach
            audycji pod tytułem „Milionerzy”, zwany dalej „Regulaminem”. 2.
            Regulamin nie określa warunków prowadzenia Konkursu w odcinkach
            wskazanej audycji oznaczanych jako specjalne. Zasady prowadzenia
            Konkursu w takich odcinkach Organizator ustali w odrębnym
            regulaminie.
          </Text>
          <Button style={{marginTop: 30}} onPress={handleSubmit}>
            Accept
          </Button>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default RulesScreen;
