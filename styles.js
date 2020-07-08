import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        marginTop: 24,
        marginLeft: 24,
        paddingRight: 24,                
      },

    // footerTextStyle: {
    //     margin: 20,
    //     fontSize: 12,
    //     color: '#000',
    //     textAlign: 'center'
    //   },
      
    flexcontainer: {
        marginTop: 12, 
        width: '100%',
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        alignContent: 'flex-end'
      },

    // headButtonContainer: {
    //     backgroundColor: '#000',
    //     borderRadius: 5,
    //     padding: 10,
    //     marginBottom: 20,
    //     width: '100%'
    //   },

    // headButtonText: {
    //     fontSize: 20,
    //     color: '#aa0707',
    //     textAlign: 'center',
    //     fontWeight: 'bold'
    //   },

    //   buttonContainer: {
    //     backgroundColor: '#000',
    //     borderBottomLeftRadius: 5,
    //     borderTopLeftRadius: 5,
    //     paddingLeft: 2,
    //     paddingRight: 2,
    //     paddingTop: 10,
    //     width: '80%',
    //     marginBottom: 10,
    //     height: 47
    //     },
  
    // buttonText: {
    //     fontSize: 16,
    //     color: '#aa0707',
    //     textAlign: 'center',
    //     fontWeight: 'bold'
    //   },

    // addButtonContainer: {
    //     backgroundColor: '#000',
    //     borderRadius: 5,
    //     padding: 10,
    //     marginTop: 16,
    //     width: '100%'
    //   },

    // deleteButtonContainer: {
    //     backgroundColor: '#000',
    //     padding: 5,
    //     paddingTop: 12,
    //     height: 47, 
    //     width: '10%',
    //     marginBottom: 10,
    //     borderLeftColor: '#aa0707',
    //     borderLeftWidth: 1
    //   },

    // editButtonContainer: {
    //     backgroundColor: '#000',
    //     borderTopRightRadius: 5,
    //     borderBottomRightRadius: 5,
    //     padding: 5,
    //     height: 47, 
    //     width: '10%',
    //     marginBottom: 10,
    //     borderLeftColor: '#aa0707',
    //     borderLeftWidth: 1,
    //     paddingTop: 13
    //   },

    // footerContainer: {
    //     backgroundColor: 'rgba(250, 250, 250, 0.3)',
    //     marginTop: 10
    //   },

    // input: {
    //     width: '100%',
    //     margin: 'auto',
    //     borderColor: '#aa0707',
    //     borderWidth: 2,
    //     borderRadius: 5,
    //     marginBottom: 8,
    //     padding: 4,
    //     backgroundColor: '#fff',
    //     fontWeight: 'bold'
    //   },

    topInput: {
        width: '100%',
        margin: 'auto',
       
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 8,
        padding: 4,
        backgroundColor: '#fff',
        fontWeight: 'bold'
      },
      topInputOk: {
        width: '100%',
        margin: 'auto',
        
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 8,
        padding: 4,
        backgroundColor: '#87E881',
        fontWeight: 'bold'
      },

    // detailView: {
    //     width: '100%',
    //     borderColor: '#aa0707',
    //     borderWidth: 2,
    //     borderRadius: 5,
    //     backgroundColor: '#fff',
    //     padding: 4,
        
    //   },

    //   flexDetailContainer: {
    //     width: '100%',
    //     display: 'flex',
    //     flex: 0,
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     padding: 10
    //   }, 

    // headText: {
    //     color: '#aa0707',
    //     fontWeight: 'bold',
    //     fontSize: 24,
    //     textAlign: "center"
    //   },

    breadText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        marginLeft: 12,
        textAlign: "center"
      },
  
      textStyleHeader: {
         marginBottom: 12,
        // marginLeft: 24,
        // marginRight: 24,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'darkblue'
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