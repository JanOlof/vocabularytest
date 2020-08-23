import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        marginTop: 12,
        marginLeft: 24,
        paddingRight: 24,                
      },
      background: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,    
      },
     
    flexcontainer: {
        marginTop: 12, 
        width: '100%',
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        alignContent: 'flex-end'
      },

      listTextStyle: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        //color: 'darkblue',
        backgroundColor: '#54C3E5',
        padding: 5, 
    },

    buttonStyleTight: {
      fontSize: 16,
      fontWeight: 'bold',
      //color: 'darkblue',
      backgroundColor: '#54C3E5',
      paddingBottom: 2, 
      paddingTop: 2, 
      paddingStart: 10,
      paddingEnd: 10, 
      overflow:'hidden',
      borderRadius:5,
      borderWidth: 1.5,
      textAlign: 'center',
      borderColor:'gray',
  },
  buttonStyleNormal: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    //color: 'darkblue',
    backgroundColor: '#54C3E5',
    paddingBottom: 2, 
    paddingTop: 2, 
    paddingStart: 10,
    paddingEnd: 10, 
    overflow:'hidden',
    borderRadius:5,
    borderWidth: 1.5,
    textAlign: 'center',
    borderColor:'gray',
},
    topInput: {
        width: '100%',
        margin: 'auto',
       
        borderWidth: 1.5,
        borderRadius: 5,
        marginBottom: 8,
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
        marginBottom: 8,
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
        //justifyContent: 'space-evenly',
        //padding: 10
      }, 
    breadText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        marginLeft: 12,
        textAlign: "center"
      },
  
      textStyleHeader: {
         marginBottom: 4,
        // marginLeft: 24,
        // marginRight: 24,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0027FF'
      },
      textGeneral: {
        marginBottom: 12,
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