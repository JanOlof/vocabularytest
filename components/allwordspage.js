import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';


function AllWordsPage({ route }) {
  const { Id } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [wordPairs, setWordPairs] = useState([]);
  const [reLoading, setReLoading] = React.useState(null);

    function getWordSummary(wordGroup) {
      var wordText = "";
        wordGroup.map((word) => (
              wordText += word.Text + ", "
          ));
      wordText = wordText.substring(0, wordText.length - 2);
      return wordText;
  }

  //uppdaterar sidan varje gång man kommer till den
  useFocusEffect(
    React.useCallback(() => {
      // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
      if (isLoading == true) {
        var baseURL = "http://193.10.202.70/WordLearn/api/wordtestcomplex?";
        var url = baseURL + "wordGroupId=" + Id + "&languageCode1=sv-se&languageCode2=fr-fr"; //Hårdkodad fransk-svensk
        fetch(url)
          .then(response => response.json())
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

  return (
    <ScrollView style={styles.container}>
      {/*Laddar tills innehållet kommer fram*/}
      {isLoading == true && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#aa0707" /></View>}
      {/*loopar igenom json-datan och skriver ut de värdena som är angivna inom <Text/>
                 knapparna går vidare till olika sidor via navigation */}
      {wordPairs.map((wordPair, index) => (<View key={index} style={styles.rowContainer2}>
        <Text style={styles.textGeneral}> {getWordSummary(wordPair.Word2)}
        </Text>
        
        <Text style={styles.textGeneral}> - </Text>
        
        <Text style={styles.textGeneral}>{getWordSummary(wordPair.Word1)}</Text>
      </View>
      ))}
    </ScrollView>
  )
}

export default AllWordsPage