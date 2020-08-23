import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';


function TestPage({ route }) {
    const { Id } = route.params;
    //const { group } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputOk, setInputOk] = useState(false);
    const [hasShownCorrectAnswer, setHasShownCorrectAnswer] = useState(false);

    const [word1ToWord2, setWord1ToWord2] = useState(true);
    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(true);
    //const [isLoading, setLoading] = useState(false); //Bara för test utan API
    const [wordPairs, setWordPairs] = useState([]);
    const [wordPairsResult, setWordPairsResult] = useState([]);
    const [reLoading, setReLoading] = React.useState(null);

    //uppdaterar sidan varje gång man kommer till den
    useFocusEffect(
      React.useCallback(() => {

    // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
    if (isLoading == true) {
        var idString =  2;//JSON.parse(Id);
        var baseURL = "http://193.10.202.70/WordLearn/api/wordtestcomplex?"; 
        //var baseURL = "http://192.168.10.134:50000/api/wordtestcomplex?"; //fetch ('http://193.10.202.70/WordLearn/api/wordtestcomplex?wordGroupId=1&languageCode1=sv-se&languageCode2=fr-fr')
        var url = baseURL + "wordGroupId=" + Id + "&languageCode1=sv-se&languageCode2=fr-fr";
        fetch (url)
        .then(response=> response.json())
        .then(data => {
            console.log(data)
            setLoading(false);
            setWordPairs(data); 
            initWordPairResults(data.length);
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
        alert ("Du har nått till slutet")
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
                 <TouchableOpacity onPress={() => changeLanguage()}> 
                <Text style = {styles.buttonStyleTight}>Växla språk</Text>
           </TouchableOpacity>   
                          </View>
                          <View style={{padding:5} } />
                          <Text style = {styles.textStyleHeader}> {getWordSummary()}</Text> 
                         

           <TextInput 
            style={[inputOk ? styles.topInputOk : styles.topInput]}
            autoCapitalize = "none"
            value = {input}
            onChangeText={(value) => {
                setInput(value);
                checkAnswer()
            }}/>
            <View style={styles.flexDetailContainer} >
            <TouchableOpacity onPress={() => nextLetter()}> 
                <Text style = {styles.buttonStyleNormal}>Bokstavshjälp</Text>
           </TouchableOpacity> 
                <View style={{padding:5} } />
                <TouchableOpacity onPress={() => nextWord()}> 
                <Text style = {styles.buttonStyleNormal}>Nästa ord &gt; &gt;</Text>
           </TouchableOpacity>                 
            </View>  
            <TouchableOpacity onPress={() => showAnswer()}> 
                <Text style = {styles.buttonStyleNormal}>Svar</Text>
           </TouchableOpacity>              
            <TouchableOpacity onPress={() => restartErrors()}> 
                <Text style = {styles.buttonStyleNormal}>Gör om felen</Text>
           </TouchableOpacity>  
            <TouchableOpacity onPress={() => restart()}> 
                <Text style = {styles.buttonStyleNormal}>Gör om alla</Text>
           </TouchableOpacity>    

            </View>)
                          : <Text></Text>
                          
                          } 

            {/*Laddar tills innehållet kommer fram*/}
            {isLoading == true && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Text>Vänta medan dina glosor laddas...</Text>
                          <ActivityIndicator size="large" color="#aa0707" /></View>}
    
          </View>
        )
}

export default TestPage

