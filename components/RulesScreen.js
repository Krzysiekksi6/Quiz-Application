import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Modal, Portal, Provider, Button} from 'react-native-paper';

const RulesScreen = ({navigation: {navigate}}) => {
  const [visible, setVisible] = React.useState(true);
  const hideModal = () => setVisible(false);

  const handleSubmit = async () => {
    await AsyncStorage.setItem('@storage_Key', 'rules')
    navigate('QuizApp');
    hideModal();
  };

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
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
