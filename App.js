import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
// import socketIOClient from 'socket.io-client';
import socketIOClient from 'socket.io-client';
// import "./App.css";
const host = 'http://192.168.1.244:3000';

function App() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();
  const scrollIntoView = useRef();
  console.log('id', id);
  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host); //Kết nối tới server

    socketRef.current.on('getId', data => {
      //On nhận về 1 id
      console.log('data id', data);
      setId(data);
    });

    socketRef.current.on('sendDataServer', dataGot => {
      //On nhận nội dung tin nhắn và id
      console.log('dataGot', dataGot);
      setMess(oldMsgs => [...oldMsgs, dataGot.data]);
      scrollIntoView.current.scrollTo({ x: 0, y: 100000, animated: true });
    });

    return () => {
      socketRef.current.disconnect(); //ngắt kết nối
    };
  }, []);

  const scrollToElement =(indexOf)=>{
    scrollIntoView.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  useEffect(() => {
    scrollToBottom();
  }, [mess]);

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
      };
      console.log('msg', msg);
      socketRef.current.emit('sendDataClient', msg); //emit phát tín hiệu (gửi đi) tới server tin nhắn và ID
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    console.log(1);
    return; // messagesEnd.current.scrollIntoView({behavior: 'smooth', bottom: 0});
  };

  const handleChange = e => {
    setMessage(e);
  };

  const renderMess = mess.map((m, index) => {
    return (
      <View key={index}>
        <View
          key={index}
          style={m.id === id ? styles.yourMessage : styles.otherPeople}>
          {m.id !== id ? (
            <View>
              <Text style={{color: '#54ea54'}}>
                Người gửi: <Text>{m.id}</Text>
              </Text>
            </View>
          ) : null}
          {m.id !== id ? (
            <Text style={{color: '#000', fontWeight: '500'}}>
              Nội dung: <Text>{m.content}</Text>
            </Text>
          ) : (
            <Text>Tôi: {m.content}</Text>
          )}
        </View>
      </View>
    );
  });

  return (
    <View style={styles.boxChat}>
      <Text style={{textAlign: 'center', color: 'red'}}>DŨNG THỢ CODE</Text>
      <ScrollView
        ref={ref => {
          scrollIntoView.current = ref;
          scrollIntoView.current.scrollTo(); // !!
        }}
        style={styles.boxChatMessage}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          {renderMess}
        </View>
      </ScrollView>

      <View style={styles.sendBox}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={message}
          placeholder="Nhập tin nhắn ..."
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  boxChatMessage: {
    height: 60,
    maxHeight: '80%',
    // backgroundColor: 'red'
  },
  sendBox: {
    position: 'absolute',
    bottom: 0,
    // display: "flex",
    // justifyContent: 'space-between'
  },
  boxChat: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red',
  },
  yourMessage: {
    display: 'flex',
    backgroundColor: '#009bff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    color: 'white',
    width: '50%',
    alignSelf: 'flex-end',
  },

  otherPeople: {
    backgroundColor: '#868686',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    color: 'white',
    textAlign: 'left',
    width: '50%',
  },
  input: {
    // borderColor: '#000',
    // borderWidth: 1
  },
});

// chatItem: {
//   width: '50%'
// },
// sendBox: {
//   width:'100%',
//   paddingTop: '1rem',
//   display: 'flex',
//   justifyContent: 'space-between',
// },
// boxChatMessage: {
//   minHeight: '60vh',
//   maxHeight: '60vh',
//   // over: auto;
// },
// boxChat: {
//   flex: 1,
//   // width:'100%',
//   // margin: '0 auto',
//   // marginTop: '100px',
//   // boxShadow: '0 0 10px 0 black',
//   // borderRadius: '1em',
//   // backgroundColor: "red"
// },
// chatItem :{
//   width: '50%',
// },
// yourMessage: {
//   backgroundColor:'#009bff',
//   margin: '1em',
//   borderRadius: '1em',
//   padding: '1em',
//   color: 'white',
//   float: 'right',
// width: '50%',
// },

// otherPeople:  {
//   backgroundColor: '#868686',
//   margin: '1em',
//   borderRadius: '1em',
//   padding: '1em',
//   color: 'white',
//   textAlign: 'left',
//   float: 'left',
// width: '50%',
// }
