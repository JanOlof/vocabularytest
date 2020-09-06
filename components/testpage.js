import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'; //https://icons.expo.fyi/



function TestPage({ route }) {
    const { Id } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputOk, setInputOk] = useState(false);
    const [hasShownCorrectAnswer, setHasShownCorrectAnswer] = useState(false);
    const [word1ToWord2, setWord1ToWord2] = useState(true);
    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [wordPairs, setWordPairs] = useState([]);
    const [wordPairsResult, setWordPairsResult] = useState([]);
    const [reLoading, setReLoading] = React.useState(null);

    //uppdaterar sidan varje gång man kommer till den. ToDO: fundera på om det är bra. Man vill kanske fortsätta där man var?
    useFocusEffect(
        React.useCallback(() => {
            // Om isLoading är sant hämtas data en gång från mitt API som körs lokalt.
            if (isLoading == true) {
                var baseURL = "http://193.10.202.70/WordLearn/api/wordtestcomplex?";
                //var baseURL = "http://192.168.10.134:50000/api/wordtestcomplex?"; //fetch ('http://193.10.202.70/WordLearn/api/wordtestcomplex?wordGroupId=1&languageCode1=sv-se&languageCode2=fr-fr')
                var url = baseURL + "wordGroupId=" + Id + "&languageCode1=sv-se&languageCode2=fr-fr"; //Hårdkodad fransk-svensk
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setLoading(false);
                        data = data.sort(() => Math.random() - 0.5);
                        setWordPairs(data);
                        initWordPairResults(data.length);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }, [])
    )

    function initWordPairResults(length) {
        var arr = [length];
        for (var i = 0; i < length; i++) {
            arr[i] = false;
        }
        setWordPairsResult(arr);
    }

    function changeLanguage() {
        if (word1ToWord2)
            setWord1ToWord2(false);
        else
            setWord1ToWord2(true);
    }

    function nextLetter() {
        var length = input.length;
        //Börja om från början första gången med bokstavshjälp
        if (hasShownCorrectAnswer == false) {
            length = 0;
        }
        setHasShownCorrectAnswer(true);

        if (word1ToWord2)
            setInput(wordPairs[currentIndex].Word2[0].Text.substring(0, length + 1));
        else
            setInput(wordPairs[currentIndex].Word1[0].Text.substring(0, length + 1));
    }

    function nextWord() {
        if (currentIndex < wordPairs.length - 1) {
            setCurrentIndex(getNextIndex());
            setHasShownCorrectAnswer(false);
            setInput('');
            setInputOk(false);
        }
    }

    function getNextIndex() {
        if (currentIndex < wordPairs.length - 1) {
            for (var i = currentIndex + 1; i < wordPairs.length; i++) {
                if (wordPairsResult[i] == false) {
                    return i;
                }
            }
        }
        alert("Du har nått till slutet")
        return currentIndex;
    }

    function restartErrors() {
        for (var i = 0; i < wordPairs.length; i++) {
            if (wordPairsResult[i] == false) {
                setCurrentIndex(i);
                setInput('');
                setInputOk(false);
                setHasShownCorrectAnswer(false);
                return;
            }
        }
        alert('Du har klarat alla :)')
    }
    function getLanguageInfo(index) {
        if (wordPairs.length > 0) {
            if ((word1ToWord2 && index == 0) || (!word1ToWord2 && index == 1)) {
                return wordPairs[0].Word1[0].Language;
            }
            else {
                return wordPairs[0].Word2[0].Language;
            }
        }
    }
    function restart() {
        initWordPairResults(wordPairs.length);
        setCurrentIndex(0);
        setInput('');
        setInputOk(false);
        setHasShownCorrectAnswer(false);
    }

    function showAnswer() {
        setHasShownCorrectAnswer(true);
        if (wordPairs.length > 0) {
            var wordText = "";
            if (word1ToWord2) {
                wordPairs[currentIndex].Word2.map((word) => (
                    wordText += word.Text + " "
                ));
            } else {
                wordPairs[currentIndex].Word1.map((word) => (
                    wordText += word.Text + " "
                ));
            }
            setInput(wordText);
        }
    }

    function getWordSummary() {
        var wordText = "";
        if (word1ToWord2) {
            wordPairs[currentIndex].Word1.map((word) => (
                wordText += word.Text + ", "
            ));
        }
        else {
            wordPairs[currentIndex].Word2.map((word) => (
                wordText += word.Text + ", "
            ));
        }
        wordText = wordText.substring(0, wordText.length - 2);
        return wordText;
    }

    function checkAnswer() {
        if (wordPairs.length > 0) {
            if (word1ToWord2) {
                wordPairs[currentIndex].Word2.map((word) => (
                    verifyWord(word.Text)
                ));
            }
            else {
                wordPairs[currentIndex].Word1.map((word) => (
                    verifyWord(word.Text)
                ));
            }
        }
    }

    function verifyWord(wordToCheck) {
        if (input.toLowerCase().trim() == wordToCheck.toLowerCase()) {
            setInputOk(true);
            if (hasShownCorrectAnswer == false)
                wordPairsResult[currentIndex] = true;
        }
    }

    useEffect(() => {
        setInputOk(false);
        checkAnswer();
    })

    return (
        <View style={styles.background}>
            <View style={styles.container} >
                {wordPairs.length > 0 ? (
                    <View>
                        <View style={styles.rowContainer} >
                            <Text style={styles.textGeneral}> {currentIndex + 1}/{wordPairs.length}</Text>
                            <View style={{ padding: 15 }} />
                            <TouchableOpacity onPress={() => changeLanguage()}>
                                <Text style={[styles.buttonBase, styles.buttonStyleTight]}>{getLanguageInfo(0)} <AntDesign name="swap" size={16} color="black" /> {getLanguageInfo(1)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.textStyleTestWord}> {getWordSummary()}</Text>
                        </View>

                        <TextInput
                            style={[inputOk ? styles.topInputOk : styles.topInput]}
                            autoCapitalize="none"
                            value={input}
                            onChangeText={(value) => {
                                setInput(value);
                                checkAnswer()
                            }} />
                        <TouchableOpacity onPress={() => showAnswer()}>
                            <Text style={[styles.buttonBase, styles.buttonStyleNormal]}>Svar</Text>
                        </TouchableOpacity>
                        <View style={styles.rowContainer} >
                            <View style={styles.buttonContainer} >
                                <TouchableOpacity onPress={() => restartErrors()}>
                                    <Text style={[styles.buttonBase, styles.buttonStyleNormal]}>Gör om fel <Entypo name="emoji-sad" size={15} color="black" /> </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ padding: 5 }} />
                            <View style={styles.buttonContainer} >
                                <TouchableOpacity onPress={() => restart()}>
                                    <Text style={[styles.buttonBase, styles.buttonStyleNormal]}>Gör om  <Entypo name="cycle" size={15} color="black" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.rowContainer} >
                            <TouchableOpacity onPress={() => nextLetter()}>
                                <Text style={[styles.buttonBase, styles.buttonStyleNormal]}>Nästa bokstav <AntDesign name="caretright" size={12} color="black" /></Text>
                            </TouchableOpacity>
                            <View style={{ padding: 5 }} />
                            <TouchableOpacity onPress={() => nextWord()}>
                                <Text style={[styles.buttonBase, styles.buttonStyleNormal]}>Nästa ord <AntDesign name="forward" size={12} color="black" /> </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : <Text> {/*Visas när  wordPairs.length = 0. Men är tom och hanteras nedan i isLoading istället*/}</Text>

                }

                {/*Laddar tills innehållet kommer fram*/}
                {isLoading == true && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Vänta medan dina glosor laddas...</Text>
                        <ActivityIndicator size="large" color="#aa0707" />
                    </View>}
                <ScrollView style={styles.imageContainer}>
                    <View style={styles.rowContainer}>
                        <Image source={require('../assets/pencil.png')} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default TestPage

