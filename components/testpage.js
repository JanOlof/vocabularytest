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
    const [isLoading, setLoading] = useState(true);
    const [filmer, setFilmer] = useState([]);
    const [reLoading, setReLoading] = React.useState(null);
    //uppdaterar sidan varje gång man kommer till den
    useFocusEffect(
      React.useCallback(() => {
    // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
    if (isLoading == true) {
        fetch ('http://192.168.10.135:50000/api/wordtest?languageCode1=sv-se&languageCode2=fr-fr')
        .then(response=> response.json())
        .then(data => {
            console.log(data)
            setLoading(false);
            setFilmer(data); 
            //setCurrentId(2); 
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [])
  )

  function buttonPushed(){
    if(currentId < filmer.length - 1) { 
        setCurrentId(currentId + 1);
    }
    //alert("klickad");
    }
    function nextWord(){
        if(currentId < filmer.length - 1) { 
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
        if(filmer.length > 0){
            setInput(filmer[currentId].Word2);
        }
    }
    function checkAnswer(){
        if(filmer.length > 0){
        //alert(input);
        if(input.toLowerCase().trim( ) == filmer[currentId].Word2.toLowerCase()){
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
              { filmer.length > 0 ? (<View>
                         {/* <Text> {input}</Text>
                         <Text> {inputOk}</Text>*/}
                          <Text style = {styles.textGeneral}> {currentId + 1}/{filmer.length}</Text> 
                          <Text style = {styles.textStyleHeader}> {filmer[currentId].Word1}</Text> 
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
            
            <View style={styles.flexDetailContainer} >
                <Button title ='Visa svar' onPress = {() => showAnswer()} />   
                <Button title ='<' onPress = {() => previousWord()} />   
                <Button title ='>' onPress = {() => nextWord()} />   
            </View>  
            


            {/*Laddar tills innehållet kommer fram*/}
            {isLoading == true && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Text>Please wait while fetching the movie information...</Text>
                          <ActivityIndicator size="large" color="#aa0707" /></View>}
          </View>
        )
}

export default TestPage

