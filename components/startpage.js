import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {Text, View, SafeAreaView, Button, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import styles from '../styles';

export default function StartPage({route, navigation}) {
   const [isLoading, setLoading] = useState(true);
   const [wordgroups, setWordgroups] = useState([]);
     //uppdaterar sidan varje gång man kommer till den
     useFocusEffect(
       React.useCallback(() => {
     // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
     if (isLoading == true) {
         fetch('https://193.10.202.70/WordLearn/api/wordgroups')
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
       <SafeAreaView style={styles.container}>
        {isLoading == true && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Text>Vänta medan data laddas ...</Text>
           <ActivityIndicator size="large" color="#aa0707" />
            </View>}
 
         <FlatList
           data={wordgroups}
           renderItem={({item}) => 
           /* Skapar ett nytt objekt med property Id i stället för att skicka hela item -  förstår inte varför det krävs :( */
           <TouchableOpacity onPress={() => navigation.navigate('Test', {Id: item.Id})}> 
             <Text style = {styles.listTextStyle}>{item.Description}</Text>
           </TouchableOpacity>          
         }
           keyExtractor={item => item.Id.toString()}
         />
       </SafeAreaView>
     </View>
   </View>
   );
}