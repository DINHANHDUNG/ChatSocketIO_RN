import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  chatItem: {
    width: '50%'
  },
  sendBox: {
    width:'100%',
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxChatMessage: {
    minHeight: '60vh',
    maxHeight: '60vh',
    // over: auto;
  },
  boxChat: {
    flex: 1,
    // width:'100%',
    // margin: '0 auto',
    // marginTop: '100px',
    // boxShadow: '0 0 10px 0 black',
    // borderRadius: '1em',
    // backgroundColor: "red"
  },
  chatItem :{
    width: '50%',
  },
  yourMessage: {
    backgroundColor:'#009bff',
    margin: '1em',
    borderRadius: '1em',
    padding: '1em',
    color: 'white',
    float: 'right',
  },
  
  otherPeople:  {
    backgroundColor: '#868686',
    margin: '1em',
    borderRadius: '1em',
    padding: '1em',
    color: 'white',
    textAlign: 'left',
    float: 'left',
  }
});
