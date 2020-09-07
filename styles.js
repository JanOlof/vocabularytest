import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    paddingRight: 12,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#EDEEED',
  },

  imageContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: '100%',
    flexDirection: 'column-reverse',
  },

  buttonBase: {
    backgroundColor: '#F0AD4B',
    paddingBottom: 6,
    paddingTop: 6,
    paddingStart: 10,
    paddingEnd: 10,
    overflow: 'hidden',
    borderRadius: 10,
    textAlign: 'center',
    borderColor: 'gray',
  },
  buttonStyleTight: {
    fontSize: 11,
    paddingBottom: 3,
    paddingTop: 3,
  },
  buttonStyleNormal: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 0,
  },
  buttonStyleList: {
    width: '75%',
  },
  topInput: {
    width: '100%',
    margin: 'auto',
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 2,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  topInputOk: {
    width: '100%',
    margin: 'auto',
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 2,
    backgroundColor: '#87E881',
    fontWeight: 'bold',
    fontSize: 20
  },

  rowContainer: {
    width: '100%',
    display: 'flex',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonContainer: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default styles;