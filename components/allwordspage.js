import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';


function AllWordsPage({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [wordPairs, setWordPairs] = useState([]);
    const [reLoading, setReLoading] = React.useState(null);
    //uppdaterar sidan varje gång man kommer till den
    useFocusEffect(
      React.useCallback(() => {
    // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
    if (isLoading == true) {
        //fetch ('http://192.168.10.135:50000/api/wordtest?languageCode1=sv-se&languageCode2=fr-fr')
        fetch ('http://localhost:53645/api/wordtest?languageCode1=sv-se&languageCode2=fr-fr')
        .then(response=> response.json())
        .then(data => {
            console.log(data)
            setLoading(false);
            setWordPairs(data); 
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [])
  )
   
    return(
        <ScrollView style={styles.container}>
            {/*Laddar tills innehållet kommer fram*/}
            {isLoading == true && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Text>Please wait while fetching the movie information...</Text>
                          <ActivityIndicator size="large" color="#aa0707" /></View>}
              {/*loopar igenom json-datan och skriver ut de värdena som är angivna inom <Text/>
                 knapparna går vidare till olika sidor via navigation */}
            {wordPairs.map((wordPair, index) => (<View key={index} style = {styles.rowContainer}>
                <Text style = {styles.textGeneral}>{wordPair[0].Word1}</Text>
                <Text  style = {styles.textGeneral}>{wordPair[0].Word2}</Text>
                        </View>
            ))} 
          </ScrollView>
        )
}

export default AllWordsPage