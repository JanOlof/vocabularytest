import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 24,
        paddingRight: 24,        
      },
      background: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1, 
        backgroundColor: '#EDEEED',                
      },
     
    flexcontainer: {
        marginTop: 12, 
        width: '100%',
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        alignContent: 'flex-end',
      },

      listTextStyle: {
        fontSize: 16,
        marginBottom: 8,
        //fontWeight: 'bold',
        color: '#EDEEED',
        //backgroundColor: '#F0AD4B',
        backgroundColor: '#2A2946',
        padding: 5, 
    },
buttonBase: {
  backgroundColor: '#F0AD4B',
    paddingBottom: 4, 
    paddingTop: 4, 
    paddingStart: 15,
    paddingEnd: 15, 
    overflow:'hidden',
    borderRadius:15,
    textAlign: 'center',
    borderColor:'gray',
},
    buttonStyleTight: {
      fontSize: 12,
  },
  buttonStyleNormal: {    
     fontSize: 15,
     marginTop: 8,
     marginBottom: 0,
},
    topInput: {
        width: '100%',
        margin: 'auto',
       
        borderWidth: 1.5,
        borderRadius: 5,
        //marginBottom: 4,
        padding: 2,
        backgroundColor: '#fff',
        fontWeight: 'bold',
        fontSize: 16
      },
      topInputOk: {
        width: '100%',
        margin: 'auto',
        
        borderWidth: 1.5,
        borderRadius: 5,
        //marginBottom: 4,
        padding: 2,
        backgroundColor: '#87E881',
        fontWeight: 'bold',
        fontSize: 16
      },

      flexDetailContainer: {
        width: '100%',
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        //justifyContent: 'center',
        justifyContent: 'space-evenly',
        //padding: 10
      }, 
buttonContainer: {
  flex: 1,
},

    breadText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        marginLeft: 12,
        textAlign: "center"
      },
  
      textStyleTestWord: {
        textAlign: "center",
         marginBottom: 4,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2A2946'
      },
      textGeneral: {
        marginBottom: 12,
        color: '#2A2946',
       // marginLeft: 24,
       // marginRight: 24,
       fontSize: 16,
       fontWeight: 'bold'       
     },
     buttons: {
        paddingRight: 40,
        margin: 20,
     }

  });

  export default styles;