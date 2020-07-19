import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView} from 'react-native';
//import {FontAwesome, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';

//import React from 'react';
//import {Text, View, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
//import {FontAwesome, AntDesign } from '@expo/vector-icons';
//import styles from '../styles';
//import Footer from './footer';


function TestPage({ navigation }) {
    const [currentId, setCurrentId] = useState(0);
    const [inputOk, setInputOk] = useState(false);
    const [input, setInput] = useState('');
    //const [isLoading, setLoading] = useState(true);
    const [isLoading, setLoading] = useState(false); //Bara för test utan API
    const [wordPairs, setWordPairs] = useState([]);
    const [reLoading, setReLoading] = React.useState(null);

    //uppdaterar sidan varje gång man kommer till den
    useFocusEffect(
      React.useCallback(() => {
        //Bara för test utan API
        var localDataSimple = '[ { "Id": 1, "Word1": "Hej", "Word2": "Salut" }, { "Id": 2, "Word1": "Köpa Handla", "Word2": "Acheter" }, { "Id": 3, "Word1": "Hus", "Word2": "Maison" }, { "Id": 6, "Word1": "Bil", "Word2": "Voiture" }, { "Id": 7, "Word1": "Åka köra", "Word2": "Aller" }, { "Id": 8, "Word1": "Sol", "Word2": "Soleil" }, { "Id": 9, "Word1": "Regn", "Word2": "Pleut" }, { "Id": 10, "Word1": "Dator", "Word2": "Ordinateur" }, { "Id": 12, "Word1": "instängd", "Word2": "confine" }, { "Id": 13, "Word1": "Strand", "Word2": "Plage" }]';
        var localDataComplex = '[ { "Id": 1, "Word1": [ { "Id": 1, "Text": "Hej", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 2, "Text": "Salut", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 2, "Word1": [ { "Id": 6, "Text": "Köpa", "Language": "Svenska", "LanguageId": 1 }, { "Id": 13, "Text": "Handla", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 7, "Text": "Acheter", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 3, "Word1": [ { "Id": 14, "Text": "Hus", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 15, "Text": "Maison", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 6, "Word1": [ { "Id": 4, "Text": "Bil", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1020, "Text": "Voiture", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 7, "Word1": [ { "Id": 1021, "Text": "Åka", "Language": "Svenska", "LanguageId": 1 }, { "Id": 1023, "Text": "köra", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1022, "Text": "Aller", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 8, "Word1": [ { "Id": 1025, "Text": "Sol", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1024, "Text": "Soleil", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 9, "Word1": [ { "Id": 1028, "Text": "Regn", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1029, "Text": "Pleut", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 10, "Word1": [ { "Id": 1033, "Text": "Dator", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1034, "Text": "Ordinateur", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 12, "Word1": [ { "Id": 1037, "Text": "instängd", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1038, "Text": "confine", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 13, "Word1": [ { "Id": 1039, "Text": "Strand", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1040, "Text": "Plage", "Language": "Franska", "LanguageId": 2 } ] }]';
        var data = JSON.parse(localDataComplex);
        setWordPairs(data); 


    // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
    if (isLoading == true) {
        fetch ('http://192.168.10.135:50000/api/wordtest?languageCode1=sv-se&languageCode2=fr-fr')
        .then(response=> response.json())
        .then(data => {
            console.log(data)
            setLoading(false);
            setWordPairs(data); 
            //setCurrentId(2); 
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [])
  )

  function buttonPushed(){
    if(currentId < wordPairs.length - 1) { 
        setCurrentId(currentId + 1);
    }
    //alert("klickad");
    }
    function nextWord(){
        if(currentId < wordPairs.length - 1) { 
            setCurrentId(currentId + 1);
            setInput('');
        }
    }
    function previousWord(){
        if(currentId > 0) { 
            setCurrentId(currentId - 1);
            setInput('');
        }
    }
    function showAnswer(){
        if(wordPairs.length > 0){
            setInput(wordPairs[currentId].Word2[0].Text);
        }
    }

    function getWordSummary(){
        var wordText = "";
        wordPairs[currentId].Word1.map((word) =>(  
             wordText += word.Text + " "
        )); 
        return wordText;
    }

    function checkAnswer(){
        if(wordPairs.length > 0){
        //alert(input);
        if(input.toLowerCase().trim( ) == wordPairs[currentId].Word2[0].Text.toLowerCase()){
        setInputOk(true);
        //nextWord();
         //alert("true");
        }
        else {
            setInputOk(false);
           // alert("false");
        }
        //alert("klickad");
    }
    }
    useEffect(() => {
        checkAnswer(); 
    })
 
  
    return(
        
           
        <View  style = { styles.container } >   
              { wordPairs.length > 0 ? (<View>
                         {/* <Text> {input}</Text>
                         <Text> {inputOk}</Text>*/}
                          <Text style = {styles.textGeneral}> {currentId + 1}/{wordPairs.length}</Text> 
                          <Text style = {styles.textStyleHeader}> {getWordSummary()}</Text> 
                          </View>)
                          : <Text> {currentId} Ännu ej klar</Text>}

           
           {/* <Button title ='Kontrollera svar' onPress = {() => checkAnswer()} />    */}
           <TextInput 
            style={[inputOk ? styles.topInputOk : styles.topInput]}
            autoCapitalize = "none"
            value = {input}
            onChangeText={(value) => {
                setInput(value);
                checkAnswer()
            }}/>
            <Button title ='Nästa ord' onPress = {() => nextWord()} />   
            <View style={{padding:5} } />
            <Button title ='Visa svar' onPress = {() => showAnswer()} />  
            <View style={{padding:5} } />
            <View style={styles.flexDetailContainer} >
                
                
                <Button title ='<' onPress = {() => previousWord()} />   
                <View style={{padding:15} } /> 
                <Button title ='>' onPress = {() => nextWord()} />   
            </View>  
            


            {/*Laddar tills innehållet kommer fram*/}
            {isLoading == true && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Text>Vänta medan dina glosor laddas...</Text>
                          <ActivityIndicator size="large" color="#aa0707" /></View>}
          </View>
        )
}

export default TestPage

