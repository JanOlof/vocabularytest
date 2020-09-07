import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {Text, View, SafeAreaView, Image, Button, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import styles from '../styles';

export default function StartPage({route, navigation}) {
   const [isLoading, setLoading] = useState(true);
   const [wordgroups, setWordgroups] = useState([]);
     //uppdaterar sidan varje gång man kommer till den
     useFocusEffect(
       React.useCallback(() => {
     // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
     if (isLoading == true) {
         fetch('http://193.10.202.70/WordLearn/api/wordgroups')
         //fetch('http://192.168.10.134:50000/api/wordgroups')
         .then(response=> response.json())
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
     <Text style={styles.textGeneral}>Övningar</Text>
       <SafeAreaView style={styles.container}>
        {isLoading == true && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Text>Vänta medan data laddas ...</Text>
           <ActivityIndicator size="large" color="#aa0707" />
            </View>}
 
        <FlatList
           data={wordgroups}
           keyExtractor={item => item.Id.toString()}
           renderItem={({item}) => 
           /* Skapar ett nytt objekt med property Id i stället för att skicka hela item -  förstår inte varför det krävs :( */
            <TouchableOpacity onPress={() => navigation.navigate('Test', {Id: item.Id})}> 
                <Text style = {[styles.buttonBase, styles.buttonStyleNormal, styles.buttonStyleList]}>{item.Description}</Text>
            </TouchableOpacity>          
            }
        />
        </SafeAreaView>
        <View style={{flex: 0, justifyContent: 'center', alignItems: 'flex-end'}}>
          <Image source={require('../assets/books.png')} style={{width: 100, height: 100}} />
        </View>
        <Text>Version 1.0.1</Text>     
     </View>
   </View>
   );
}