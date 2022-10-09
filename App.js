import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers]}
        )

      if (data.length > 0) {
        setContacts(data);
        console.log(data);
      }
    }
  }

  return (
    <View style={styles.container} >
      <FlatList
        style={{marginLeft : '5%', marginTop: '20%'}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.phoneNumbers[0].number}</Text>
          </View>
        )}
        data={contacts}
      />
      <Button title="Get contacts" onPress={getContacts} />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
