

  import React, {useState} from 'react';
  import { StyleSheet,Header, View, ScrollView,Text, TouchableOpacity, Image,  StatusBar, Input, TextInput, SafeAreaView } from 'react-native';
  import AppStatusBar from './AppStatusBar';

  export default function App() {
     const [userName, setUserName] = useState('');
      return (

        <ScrollView>
          <View style={{height: 24}}>
            <StatusBar
              translucent
              backgroundColor="#326b5d"
              barStyle="light-content"
              />
          </View>
          <View style={styles.headerbar}>
                <Text style={{textAlign: 'left', marginTop: 10, marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: 'white'}}>Lab 1</Text>
          </View>

          <View style={styles.ImageContainer}>
            <Image style={styles.image} source={require('./logo.png')}/>
          </View>
          <View style = { styles.lowerButtons }>
            <View style = { styles.upperButtons }>
              <TouchableOpacity style= { styles.buttons }  title = 'BUTTON'><Text style={{fontWeight:'100', fontSize: 13}}>BUTTON </Text></TouchableOpacity>
            </View>

            <View style = { styles.upperButtons }>
              <TouchableOpacity style= { styles.buttons }  title = 'BUTTON'><Text style={{fontWeight:'100', fontSize: 13}}>BUTTON </Text></TouchableOpacity>
            </View>
          </View>

          <View style = { styles.lowerButtons }>
            <View style = { styles.upperButtons }>
              <TouchableOpacity style= { styles.buttons }  title = 'BUTTON'><Text style={{fontWeight:'100', fontSize: 13}}>BUTTON </Text></TouchableOpacity>
            </View>

            <View style = { styles.upperButtons }>
              <TouchableOpacity style= { styles.buttons }  title = 'BUTTON'><Text style={{fontWeight:'100', fontSize: 13}}>BUTTON </Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>

          <View style={{paddingLeft: 20, flexDirection: 'row', paddingTop: 20}}>
            <Text style={{paddingTop: 20, paddingRight: 55, fontWeight: '900', color:'gray'}}>Email</Text>
              <TextInput
                value={userName}
                onChangeText={(userName) => setUserName(userName)}
                placeholder={''}
                style={styles.textField}
                selectionColor={'#bd1919'}

              />
          </View>
        </View>
      </ScrollView>

      );


  }

  const styles = StyleSheet.create({
    upperButtons: {

          flex: 1,
          flexDirection: 'column-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
      },
      lowerButtons: {

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      },
      buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 2,
        height: 20,
        padding: 19,
        width: 90,
        elevation: 3,
      },
      image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
      },
      ImageContainer:{
        flex: 1,
        alignItems: 'center',
        paddingBottom: 50,
      },
      headerbar:{
        flex: 1,
        backgroundColor: '#3d917d',
        height: 50,

      },
      textField:{
        height: 40,
        width: 200,
        borderBottomColor:'#bd1919',
        borderBottomWidth: 2,

      },
  })
