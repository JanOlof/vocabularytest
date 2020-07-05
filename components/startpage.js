import React from 'react';
import {Text, View, Button, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../styles';

export default function StartPage({route, navigation}) {
   // const { film } = route.params;

    return (
     
          <View  style = { styles.container }>
             <Button title ='Gör prov' onPress = {() =>  navigation.navigate('Test')} />   
             <View style={{padding:5} }>
            </View>
             <Button title ='Visa alla ord' onPress = {() =>  navigation.navigate('AllWords')} />   
          </View>
         )
}