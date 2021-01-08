import React, { useState } from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,TextInput} from 'react-native';

const PasswordStrengthMeter = ({maxLen, }) => {


const [password, setPassword] = useState("");
const [passBarWidth, setPassBarWidth] = useState('0%')
const [passBarColor, setPassBarColor] = useState('#eceff1')
const [time, setTime] = useState('')
const [passBarText, setPassBarText] = useState('')
const [minLength,setMinLength] = useState(8)

//too short password callback hooks
const shortWidth = React.useCallback(
  () => setPassBarWidth('0%'),
  [passBarWidth, setPassBarWidth],
);
const shortColor = React.useCallback(
  () => setPassBarColor('lightgray'),
  [passBarColor, setPassBarColor],
 );
const shortText = React.useCallback(
  () => setPassBarText(`Too short (minimum ${minLength} characters)`),
  [passBarText, setPassBarText],
);

//weak password callback hooks
const weakWidth = React.useCallback(
 () => setPassBarWidth('25%'),
  [passBarWidth, setPassBarWidth],
);
const weakColor = React.useCallback(
  () => setPassBarColor('red'),
  [passBarColor, setPassBarColor],
);
const weakText = React.useCallback(
  () => setPassBarText('Weak'),
  [passBarText, setPassBarText],
);

//fair password callback hooks
const fairWidth = React.useCallback(
 () => setPassBarWidth('50%'),
  [passBarWidth, setPassBarWidth],
);
const fairColor = React.useCallback(
  () => setPassBarColor('orange'),
  [passBarColor, setPassBarColor],
);
const fairText = React.useCallback(
  () => setPassBarText('Fair'),
  [passBarText, setPassBarText],
);

//good password callback hooks
const goodWidth = React.useCallback(
  () => setPassBarWidth('75%'),
  [passBarWidth, setPassBarWidth],
);
const goodColor = React.useCallback(
  () => setPassBarColor('lightblue'),
  [passBarColor, setPassBarColor],
);
const goodText = React.useCallback(
  () => setPassBarText('Good'),
  [passBarText, setPassBarText],
);

//strong password callback hooks
const strongWidth = React.useCallback(
  () => setPassBarWidth('100%'),
  [passBarWidth, setPassBarWidth],
);
const strongColor = React.useCallback(
  () => setPassBarColor('green'),
  [passBarColor, setPassBarColor],
);
const strongText = React.useCallback(
  () => setPassBarText('Strong'),
  [passBarText, setPassBarText],
);


function isLowerCase(str){
  return str == str.toLowerCase() && str != str.toUpperCase();
 }

 function isUpperCase(str){
   return str == str.toUpperCase() && str != str.toLowerCase();
  }

function hasNumber(str) {
  return /\d/.test(str);
 }

function countSpecial(str){
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return format.test(str) ? true : false;
}

function secondsToYdhms(seconds) {
  seconds = Number(seconds);
  var y = Math.floor(seconds / (3600*24*365));
  var d = Math.floor(seconds % (3600*24)/ 365);
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var yDisplay = y > 0 ? y + (y == 1 ? " year, " : " years, ") : "";
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s + (s == 1 ? " second" : " seconds")
  setTime(yDisplay + dDisplay + hDisplay + mDisplay + sDisplay);
  return yDisplay + dDisplay + hDisplay + mDisplay + sDisplay;
}

 var calcEntropy = (text) => {
   var N = 0;
   var NoG = 20000000000;

   const badPasswords = ['123456', 'qwerty', '123456789','password','1234567',
   '12345678','12345','iloveyou','111111','123123','abc123','qwert123','1q2w3e4r','admin','qwertyuiop',
   '654321','555555','lovely','7777777','888888','princess','dragon','password1','123qwe','666666'];

   var isLowCase = isLowerCase(text);
   var isUpCase = isUpperCase(text);
   var isNumber = hasNumber(text);
   var isSpecial = countSpecial(text);

   //Determine entropy based on what the password contains
   //Lowercase: N =26
   //Uppercase: N =26
   //Numbers: N =10
   //Specials: N =33

   //Best entropy
   if(isLowCase && isUpperCase && isNumber && isSpecial){
     N = 95; //All possible combinations
   }
   //LowerCase
   else if(isLowCase && isUpperCase && isNumber){
     N = 62; // lowercase + uppercase + numbers
   }
   else if(isLowCase && isUpperCase && isSpecial){
     N = 85; // lowercase + uppercase + specials
   }
   else if (isLowerCase && isNumber && isSpecial){
     N = 69; // lowercase + numbers + specials
   }
   else if(isLowCase && isUpperCase){
     N = 52; // lowercase + uppercase
   }
   else if(isLowerCase && isSpecial){
     N = 59; // Lowercase + special
   }
   else if(isLowerCase && isNumber){
     N = 36;// Lowercase + number
   }
   else if(isLowCase){
     N = 26; // lowercase
   }

   //UpperCase
   else if (isUpperCase && isNumber && isSpecial){
     N = 69; // Uppercase + numbers + special
   }
   else if(isUpperCase && isNumber){
     N = 36; // Uppercase + numbers
   }
   else if(isUpperCase && isSpecial){
     N = 59; // Upperscase + specials
   }
   else if(isUpperCase){
     N = 26; // UpperCase
   }
   //isNumber
   else if(isNumber && isSpecial){
     N = 43; // Numbers + special
   }
   else if(isNumber){
     N = 10; //Numbers
   }

   //isSpecial
   else if (isSpecial) {
     N = 33; //Specials
   }
   else {
     N = 0; //No combinations
   }


  var L_min = Math.log(NoG * 1000)/Math.log(N); //Estimated shortest lenght for a good password (unnecesary for demenstration purposes)
  setMinLength(Math.floor(L_min));
  var entropy = Math.log2(Math.pow(N,text.length))


  //Eleminates bad passwords!
  //if(text.length <= L_min){
  //  entropy = 0;
  //}


  var rescaledEntropy = 1;
  if (maxLen <= 15){
    rescaledEntropy = Math.ceil(4*((entropy/Math.log2(Math.pow(N,13)))) +1);
  }
  else {
    rescaledEntropy = Math.ceil(4*((entropy/Math.log2(Math.pow(N,maxLen)))) +1);
  }

  var time = secondsToYdhms(Math.pow(N,text.length)/NoG);

  for (var i=0; i < badPasswords.length; i++) {
    if(text == badPasswords[i]){
      rescaledEntropy = 1
      time = 0;
    }
  }

   return rescaledEntropy;
 };


 const setStrength = React.useCallback((val) =>{
 //console.log(val);
   if(val == 1){
     shortColor();
     shortWidth();
     shortText();
     }
   if(val == 2){
     weakColor();
     weakWidth();
     weakText();
     }
   if(val == 3){
     fairColor();
     fairWidth();
     fairText();
   }
   if(val == 4){
     goodColor();
     goodWidth();
     goodText();
   }
   if(val == 5){
     strongColor();
     strongWidth();
     strongText();
   }

 }
 );

  return (

      <SafeAreaView style={styles.container}>
        <Text>Test your Password! </Text>
        <TextInput
          style={styles.input}
          maxLength={maxLen}
          secureTextEntry
          onChangeText={(password) => {setPassword(password); setStrength(calcEntropy(password))}}
        />

        <View style={styles.passBar}>
          <View style={{width: passBarWidth, height: 20, borderRadius: 3, backgroundColor:passBarColor}}></View>
        </View>
        <View style={styles.passBarTextStyle}>

          <Text style={{color: passBarColor, fontWeight: 'bold', fontSize: 15,}}>{passBarText}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 10,}}> Estimated time to crack: {time}</Text>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },

  input: {
     margin: 5,
     padding: 10,
     borderRadius: 8,
     marginBottom: 8,
     paddingHorizontal: 10,
     backgroundColor: "#eceff1",
     width: '95%',
   },
   passBar:{
     height: 21,
     width: '95%',
     borderRadius: 3,
     borderWidth: 0.5,

     borderColor: "lightgray",
   },
   passBarTextStyle:{
     flexDirection: 'column',
     alignItems: 'center',
   },

});

export default PasswordStrengthMeter;
