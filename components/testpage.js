import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';


function TestPage({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputOk, setInputOk] = useState(false);
    const [hasShownCorrectAnswer, setHasShownCorrectAnswer] = useState(false);

    const [word1ToWord2, setWord1ToWord2] = useState(true);
    const [input, setInput] = useState('');
    //const [isLoading, setLoading] = useState(true);
    const [isLoading, setLoading] = useState(false); //Bara för test utan API
    const [wordPairs, setWordPairs] = useState([]);
    const [wordPairsResult, setWordPairsResult] = useState([]);
    const [reLoading, setReLoading] = React.useState(null);

    //uppdaterar sidan varje gång man kommer till den
    useFocusEffect(
      React.useCallback(() => {
        //Bara för test utan API
        var localDataSimple = '[ { "Id": 1, "Word1": "Hej", "Word2": "Salut" }, { "Id": 2, "Word1": "Köpa Handla", "Word2": "Acheter" }, { "Id": 3, "Word1": "Hus", "Word2": "Maison" }, { "Id": 6, "Word1": "Bil", "Word2": "Voiture" }, { "Id": 7, "Word1": "Åka köra", "Word2": "Aller" }, { "Id": 8, "Word1": "Sol", "Word2": "Soleil" }, { "Id": 9, "Word1": "Regn", "Word2": "Pleut" }, { "Id": 10, "Word1": "Dator", "Word2": "Ordinateur" }, { "Id": 12, "Word1": "instängd", "Word2": "confine" }, { "Id": 13, "Word1": "Strand", "Word2": "Plage" }]';
        var localDataComplex = '[ { "Id": 1, "Word1": [ { "Id": 1, "Text": "Hej", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 2, "Text": "Salut", "Language": "Franska", "LanguageId": 2 },  { "Id": 10, "Text": "Bonjour", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 2, "Word1": [ { "Id": 6, "Text": "Köpa", "Language": "Svenska", "LanguageId": 1 }, { "Id": 13, "Text": "Handla", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 7, "Text": "Acheter", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 3, "Word1": [ { "Id": 14, "Text": "Hus", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 15, "Text": "Maison", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 6, "Word1": [ { "Id": 4, "Text": "Bil", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1020, "Text": "Voiture", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 7, "Word1": [ { "Id": 1021, "Text": "Åka", "Language": "Svenska", "LanguageId": 1 }, { "Id": 1023, "Text": "köra", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1022, "Text": "Aller", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 8, "Word1": [ { "Id": 1025, "Text": "Sol", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1024, "Text": "Soleil", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 9, "Word1": [ { "Id": 1028, "Text": "Regn", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1029, "Text": "Pleut", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 10, "Word1": [ { "Id": 1033, "Text": "Dator", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1034, "Text": "Ordinateur", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 12, "Word1": [ { "Id": 1037, "Text": "instängd", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1038, "Text": "confine", "Language": "Franska", "LanguageId": 2 } ] }, { "Id": 13, "Word1": [ { "Id": 1039, "Text": "Strand", "Language": "Svenska", "LanguageId": 1 } ], "Word2": [ { "Id": 1040, "Text": "Plage", "Language": "Franska", "LanguageId": 2 } ] }]';
        var data = JSON.parse(localDataComplex);
        setWordPairs(data); 
        initWordPairResults(data.length);


    // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
    if (isLoading == true) {
        fetch ('http://192.168.10.135:50000/api/wordtest?languageCode1=sv-se&languageCode2=fr-fr')
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

  function initWordPairResults(length){
    var arr =  [length]; 
    for (var i = 0; i < length; i++) {
        arr[i] = false;
    }
    setWordPairsResult (arr);
  }

    function changeLanguage(){
        if(word1ToWord2)  
            setWord1ToWord2(false);
        else
            setWord1ToWord2(true);
    }

    function nextLetter(){
        setHasShownCorrectAnswer(true);
        var length = input.length;
        if(word1ToWord2)
            setInput(wordPairs[currentIndex].Word2[0].Text.substring(0, length + 1));
        else
            setInput(wordPairs[currentIndex].Word1[0].Text.substring(0, length + 1));
    }

    function nextWord(){
        if(currentIndex < wordPairs.length - 1) { 
            setCurrentIndex(getNextIndex());
            setHasShownCorrectAnswer(false);
            setInput('');
            setInputOk(false);
        }
    }
   
    function getNextIndex(){
        if(currentIndex < wordPairs.length - 1) {
            for (var i = currentIndex + 1; i < wordPairs.length; i++) {
                if(wordPairsResult[i] == false){
                    return i;
                }
            }
        }
        alert ('Du har kommit till slutet')
        return currentIndex;
    }

    function restartErrors(){
        for (var i = 0; i < wordPairs.length; i++) {
            if(wordPairsResult[i] == false){
                setCurrentIndex(i);
                setInput('');
                setInputOk(false);
                setHasShownCorrectAnswer(false);
                return;
            }
        }
        alert ('Du har klarat alla :)')
    }

    function restart(){
        initWordPairResults( wordPairs.length);
        setCurrentIndex(0);
        setInput('');
        setInputOk(false);
        setHasShownCorrectAnswer(false);
    }

    function showAnswer(){
        setHasShownCorrectAnswer(true);
        if(wordPairs.length > 0){
            var wordText = "";
            if(word1ToWord2){
            wordPairs[currentIndex].Word2.map((word) =>(  
                 wordText += word.Text + " "
            )); 
            }else{
            wordPairs[currentIndex].Word1.map((word) =>(  
                wordText += word.Text + " "
                )); 
            }
            setInput(wordText);
        }
    }

    function getWordSummary(){
        var wordText = "";
        if(word1ToWord2){
        wordPairs[currentIndex].Word1.map((word) =>(  
             wordText += word.Text + " "
        )); 
        }
        else{
            wordPairs[currentIndex].Word2.map((word) =>(  
                wordText += word.Text + " "
           )); 
        }
        return wordText;
    }

    function checkAnswer(){
        if(wordPairs.length > 0){
            if(word1ToWord2){
            wordPairs[currentIndex].Word2.map((word) =>(  
                verifyWord(word.Text)
                )); 
            }
            else{
                wordPairs[currentIndex].Word1.map((word) =>(  
                    verifyWord(word.Text)
                )); 
            }
        }
    }

    function verifyWord(wordToCheck){
        if(input.toLowerCase().trim( ) == wordToCheck.toLowerCase()){
            setInputOk(true);
            if(hasShownCorrectAnswer == false)
                wordPairsResult[currentIndex] = true;
        }
    }

    useEffect(() => {
        setInputOk(false);
        checkAnswer(); 
    })
   
    return(
        <View  style = { styles.container } >   
              { wordPairs.length > 0 ? (<View>
                <View style={styles.flexDetailContainer} >
                          <Text style = {styles.textGeneral}> {currentIndex + 1}/{wordPairs.length}</Text> 
                          <View style={{padding:15} } /> 
                <Button title ='Växla språk' onPress = {() => changeLanguage()} />   
                          </View>
                          <View style={{padding:5} } />
                          <Text style = {styles.textStyleHeader}> {getWordSummary()}</Text> 
                          </View>)
                          : <Text> {currentIndex} Hämtar ordlista...</Text>}

           <TextInput 
            style={[inputOk ? styles.topInputOk : styles.topInput]}
            autoCapitalize = "none"
            value = {input}
            onChangeText={(value) => {
                setInput(value);
                checkAnswer()
            }}/>
            <View style={styles.flexDetailContainer} >
                <Button title ='Bokstavshjälp' onPress = {() => nextLetter()} /> 
                <View style={{padding:15} } />
                <Button title ='Nästa ord >>' onPress = {() => nextWord()} /> 
            </View>  
            <View style={{padding:5} } />
            <Button title ='Svar' onPress = {() => showAnswer()} />  
            <View style={{padding:5} } />
            <Button title ='Gör om felen' onPress = {() => restartErrors()} />   
            <View style={{padding:5} } />
            <Button title ='Gör om alla' onPress = {() => restart()} />   

            {/*Laddar tills innehållet kommer fram*/}
            {isLoading == true && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Text>Vänta medan dina glosor laddas...</Text>
                          <ActivityIndicator size="large" color="#aa0707" /></View>}
          </View>
        )
}

export default TestPage

