import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, SafeAreaView, Image, Button, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles';

export default function StartPage({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [wordgroups, setWordgroups] = useState([]);
  //uppdaterar sidan varje gång man kommer till den
  useFocusEffect(
    React.useCallback(() => {
      // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
      if (isLoading == true) {
        fetch('http://193.10.202.70/WordLearn/api/wordgroups')
          //fetch('http://192.168.10.134:50000/api/wordgroups')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setLoading(false);
            setWordgroups(data)
          })
          .catch(error => {
            console.log("Nu är det fel");
            console.error(error);
          });
      }
    }, [])
  )

  return (
    <View style={styles.background}>

      <View style={styles.container}>
        
        <SafeAreaView style={styles.container}>
          {isLoading == true && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Vänta medan data laddas ...</Text>
            <ActivityIndicator size="large" color="#aa0707" />
          </View>}
          <View style={styles.rowContainer} >
                <View style={styles.buttonContainer} >
                   
                    <Text style={styles.textGeneral}>Öva ord</Text>
                  
                </View>
                <View style={styles.buttonContainer} >
                  
                <Text style={styles.textGeneral}>Visa ordlista</Text>
                 
                </View>
              </View>
          <FlatList
            data={wordgroups}
            keyExtractor={item => item.Id.toString()}
            renderItem={({ item }) =>
              /* Skapar ett nytt objekt med property Id i stället för att skicka hela item -  förstår inte varför det krävs :( */
              <View style={styles.rowContainer} >
                <View style={styles.buttonContainer} >
                  <TouchableOpacity onPress={() => navigation.navigate('Test', { Id: item.Id })}>
                    <Text style={[styles.buttonBase, styles.buttonStyleNormal, styles.buttonStyleList]}>{item.Description}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer} >
                  <TouchableOpacity onPress={() => navigation.navigate('AllWords', { Id: item.Id })}>
                    <Text style={[styles.buttonBase, styles.buttonStyleNormal, styles.buttonStyleList]}>{item.Description}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </SafeAreaView>
        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end' }}>
          <Image source={require('../assets/books.png')} style={{ width: 116, height: 100 }} />
        </View>
        <Text>Version 1.0.2</Text>
      </View>
    </View>
  );
}