import React, { useState, useEffect } from "react";
import {
  Picker,
  StyleSheet,
  Header,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Input,
  TextInput,
  SafeAreaView,
  ImageBackground,
  TouchableHighlight,

} from "react-native";
import FlipCard from "react-native-flip-card";
const ReactApp = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setcardName] = useState("");
  const [userCVV, setUserCVV] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");

  const [isToggled, setIsToggled] = React.useState(false);

  const [ isNumberPress, setIsPress ] = React.useState(false);
  const [ isNamePress, setIsNamePress ] = React.useState(false);
  const [ isMonthPress, setIsMonthPress ] = React.useState(false);
  const [ isCVVPress, setIsCVVPress ] = React.useState(false);
  const [ isYearPress, setIsYearPress ] = React.useState(false);
  const [ imageIndex, setImageIndex ] = React.useState(0);

  var images= [require('./Images/visa.png'),
              require('./Images/mastercard.png'),
              require('./Images/discover.png'),
  ];

  const toggle = React.useCallback(
      () => setIsToggled(!isToggled),
      [isToggled, setIsToggled],
      //console.log('toggle: '+ isToggled),
    );

  const toggleFront = React.useCallback(
      () => setIsToggled(isToggled),
      [isToggled, setIsToggled],

      );
//toggle numbers
  const toggleNumberBorders = React.useCallback(
      () => setIsPress(true),
      [isNumberPress, setIsPress],

      );
  const deToggleNumberBorders = React.useCallback(
      () => setIsPress(false),
      [isNumberPress, setIsPress],
      //console.log('detoggle: '+ isNumberPress),
      );
  // toggle month
  const toggleMonthBorders = React.useCallback(
      () => setIsMonthPress(true),
      [isMonthPress, setIsMonthPress],
      );

  const deToggleMonthBorders = React.useCallback(
      () => setIsMonthPress(false),
      [isMonthPress, setIsMonthPress],
      //console.log('month: '+isMonthPress),
      );
// toggle name
  const toggleNameBorders = React.useCallback(
      () => setIsNamePress(true),
      [isNamePress, setIsNamePress],

      );

  const deToggleNameBorders = React.useCallback(
      () => setIsNamePress(false),
      [isNamePress, setIsNamePress],
      //console.log('detoggle: '+ isNamePress),
      );

    //toggle cvv borders
  const toggleCVVBorders = React.useCallback(
      () => setIsCVVPress(true),
      [isCVVPress, setIsCVVPress],
          //console.log(isCVVPress),
      );

  const deToggleCVVBorders = React.useCallback(
      () => setIsCVVPress(false),
      [isCVVPress, setIsCVVPress],
        //console.log('detoggle: '+ isNamePress),
      );
    //test to change picker val
  const toggleYearBorders = React.useCallback(
        () => setIsYearPress(true),
        [isYearPress, setIsYearPress],
            //console.log(isYearPress),
        );

  const deToggleYearBorders = React.useCallback(
        () => setIsYearPress(false),
        [isYearPress, setIsYearPress],
          //console.log('detoggle: '+ isNamePress),
        );



    const numberTrue = React.useCallback(() =>{
      deToggleNameBorders();
      toggleNumberBorders();
      deToggleMonthBorders();
      deToggleCVVBorders();
      deToggleYearBorders();
    }
    );

    const nameTrue = React.useCallback(() =>{
      toggleNameBorders();
      deToggleNumberBorders();
      deToggleMonthBorders();
      deToggleCVVBorders();
      deToggleYearBorders();
    }
    );


    const monthTrue = React.useCallback(() =>{
      deToggleNameBorders();
      deToggleNumberBorders();
      deToggleCVVBorders();
      toggleMonthBorders();
      deToggleYearBorders();

    }
    );

    const cvvTrue = React.useCallback(() =>{
      deToggleNameBorders();
      deToggleNumberBorders();
      deToggleMonthBorders();
      toggleCVVBorders();
      toggle();
      deToggleYearBorders();
    }
    );

    const yearTrue = React.useCallback(() =>{
      deToggleNameBorders();
      deToggleNumberBorders();
      deToggleMonthBorders();
      deToggleCVVBorders();
      toggleYearBorders();
    }
    );



  const CODE_LENGTH = new Array(20).fill(0);
  const values = cardNumber.split("");



  var HandleNumbers = (text) => {
    let formattedText = text.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }

    return formattedText;
  };

  const lengthCVV = new Array(3).fill(0);

  var HandleCVV = (text) => {
    let formattedText = text.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }

    return formattedText;
  };

  var HandleText = (text) => {

    let textOutput = text.split(" ").join("");

    if (textOutput.length > 0) {
      textOutput = text;
    }
    return textOutput;
  };

  var onChanged = (text) => {
    // code to remove non-numeric characters from text
      return text.replace(/[^A-Za-z +]/ig, '')
  }


  return (
    <View style={styles.Background}>
      <FlipCard
        style={styles.Card}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        clickable={false}
        flip={isToggled}
      >
        {/* Face Side */}
        <View  style={styles.face}>
          <ImageBackground
            source={require("./Images/13.jpeg")}
            style={cardStyles.card}
            imageStyle={{ borderRadius: 8 }}
          >

            <View style={cardStyles.visaChipCont}>
              <View style={cardStyles.chipContainer}><Image style={cardStyles.chip} source={require('./Images/chip.png')}/></View>

              <View style={cardStyles.visaContainer}><Image style={cardStyles.visa} source={values[0]==4 ? images[0]:values[0]==5 ?images[1]:values[0]==6 ?images[2]:images[0]}/></View>
            </View>

            <View style={cardStyles.middleContainer}>

              <View style={isNumberPress ? cardStyles.numberContainerToggle: cardStyles.numberContainer}>
                <View style={styles.container}>
                  <View style={styles.wrap}>
                    {CODE_LENGTH.map((v, index) => {
                      const removeBorder =
                        index === CODE_LENGTH.length - 1
                          ? styles.noBorder
                          : undefined;

                      if (
                        index == 4 ||
                        index == 9 ||
                        index == 14 ||
                        index == 19
                      ) {
                        return (
                          <Text style={styles.text}>
                            {values[index] || " "}
                          </Text>
                        );
                      }
                      return (
                        <Text style={styles.text}>{values[index] || "#"}</Text>
                      );
                    })}
                  </View>
                </View>
              </View>

            </View>

            <View style={cardStyles.textCont} >
              <View style={isNamePress ? cardStyles.cardHoldertextToggle: cardStyles.cardHoldertext}>
                <Text style={cardStyles.headerText} numberOfLines={5}>
                  Card Holder
                </Text>

                <Text
                  onPress={() => {
                    setcardName("My Changed Text");
                  }}

                  style={cardStyles.subText}
                >
                  {cardName || "Name"}
                </Text>
              </View>
              <View style={cardStyles.expiresText}>
                <View style={isMonthPress || isYearPress ? styles.borderExpiresToggle : styles.borderExpires}>
                <Text style={cardStyles.headerText} numberOfLines={5}>
                  Expires
                </Text>
                <Text
                  onPress={() => setcardName("My Changed Text")}
                  style={cardStyles.subText}

                >
                  {selectedMonth || "Month"} {"/"} {selectedYear || "Year"}

                </Text>
              </View>
              </View>
            </View>
            </ImageBackground>
          </View>

          {/* Back Side */}
        <View  style={styles.back}>
          <ImageBackground
            source={require("./Images/13.jpeg")}
            style={cardStyles.card}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={{backgroundColor:'black', width: 300, height: 30, marginTop:15}}>
            </View>
            <View style={styles.container}>
            <Text style={{color:'white', fontSize:11, paddingLeft:240}}> CVV </Text>
              <View style={styles.wrapBack}>
                {lengthCVV.map((v, index) => {
                  const removeBorder =
                    index === CODE_LENGTH.length - 1
                      ? styles.noBorder
                      : undefined;

                  return (

                      <Text style={styles.textCVV}>{userCVV[index] || "*"}</Text>

                  );
                })}
              </View>
              <View style={cardStyles.visaContainer}><Image style={cardStyles.visaBack} source={values[0]==4 ? images[0]:values[0]==5 ?images[1]:values[0]==6 ?images[2]:images[0]}/></View>
            </View>
            </ImageBackground>
          </View>
      </FlipCard>

      <View style={styles.Container}>
        <View style={{ paddingTop: 60 }}>
          <Text style={styles.cardNumberBox}>Card number</Text>

            <TextInput
              value={cardNumber}
              onChangeText={(cardNumber) =>
                setCardNumber(HandleNumbers(cardNumber))
              }

              onClick={ toggleFront}
              onFocus={numberTrue}
              //onClick={deToggleNameBorders}
              keyboardType="numeric"
              placeholder={""}
              style={isNumberPress ? styles.textFieldToggle: styles.textField}
              selectionColor={"black"}
              maxLength={20}
            />

        </View>

        <View style={{ justifyContent: "center", paddingTop: 20 }}>
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              fontWeight: "900",
              color: "black",
            }}
          >
            Card name
          </Text>
          <TextInput
            value={cardName}
            onChangeText={(cardName) => setcardName(onChanged(HandleText(cardName)))}
            placeholder={""}
            onClick={toggleFront}
            onFocus={nameTrue}
            //onBlur={toggleNameBorders}
            style={isNamePress ? styles.textFieldToggle: styles.textField}
            selectionColor={"black"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "900", color: "black", paddingLeft: 20 }}>
            Expiration Date
          </Text>
          <Text style={{ fontWeight: "900", color: "black", paddingLeft: 150 }}>
            CVV
          </Text>
        </View>
        <View style={{ flexDirection: "row", paddingLeft: 15, paddingTop: 0 }}>
          <View style={isMonthPress ? styles.dropDownToggle : styles.dropDown}>
            <Picker
              selectedValue={selectedMonth}
              //onClick={toggleFront}
              //onClick={monthTrue}
              style={{
                height: 50,
                width: 90,
                borderWidth: 1,
                borderColor: "gray",

              }}
              onValueChange={(selectedMonth) => {setSelectedMonth(HandleText(selectedMonth)); monthTrue()}}
              //onValueChange={pickerMonthChange()}
              //={monthTrue}

            >

              <Picker.Item label="01" value="01" />
              <Picker.Item label="02" value="02" />
              <Picker.Item label="03" value="03" />
              <Picker.Item label="04" value="04" />
              <Picker.Item label="05" value="05" />
              <Picker.Item label="06" value="06" />
              <Picker.Item label="07" value="07" />
              <Picker.Item label="08" value="08" />
              <Picker.Item label="09" value="09" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
            </Picker>
          </View>

          <View style={isYearPress ? styles.dropDownToggle : styles.dropDown}>

            <Picker
              onClick={toggleFront}
              selectedValue={selectedYear}
              style={styles.monthBorder }
              onValueChange={(selectedYear) => {setSelectedYear(HandleText(selectedYear)); yearTrue()}}
              //onValueChange={monthTrue}
            >
              <Picker.Item label="Year" value="" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
              <Picker.Item label="2025" value="2025" />
              <Picker.Item label="2026" value="2026" />
              <Picker.Item label="2027" value="2027" />
              <Picker.Item label="2028" value="2028" />
              <Picker.Item label="2029" value="2029" />
              <Picker.Item label="2030" value="2030" />
              <Picker.Item label="2031" value="2031" />
            </Picker>
          </View>

          <TextInput
            value={userCVV}
            onChangeText={(userCVV) => setUserCVV(HandleCVV(userCVV))}
            placeholder={""}
            style={isCVVPress ? styles.textFieldCVVToggle : styles.textFieldCVV}
            selectionColor={"black"}
            onFocus={cvvTrue}

            onSubmitEditing={toggle}
            maxLength={3}
          />
        </View>
        <View style={styles.upperButtons}>
          <TouchableOpacity style={styles.buttons} title="BUTTON">
            <Text style={{ fontWeight: "100", fontSize: 17, color: "white" }}>
              Submit{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  face:{
      position:'absolute',
      backgroundColor:'red',
      borderRadius: 10,
      height:200,
      width:300,

    },
    cardNumberBox:{
      marginLeft: 20,
      marginRight: 20,
      fontWeight: "900",
      color: "black",
    },
    borderExpires:{
      height: 30,
      width: 70,

    },
    borderExpiresToggle:{
      borderWidth:1,
      height: 30,
      borderColor: 'gray',
      width: 70,
      borderRadius: 5,
    },
    monthBorder:{
      height: 50,
      width: 110,
      borderWidth: 1,
      borderColor: "gray",
    },
    monthBorderToggle:{
      height: 50,
      width: 90,
      borderWidth: 2,
      borderColor: 'blue',
    },
    back:{
      position:'absolute',
      backgroundColor:'red',
      borderRadius: 10,
      height:200,

      width:300,

    },

  upperButtons: {
    flex: 1,
    flexDirection: "column-reverse",
    margin: 20,
    elevation: 10,
    paddingBottom: 30,
  },
  Background: {
    width: 1000,
    height: 5500,
    backgroundColor: "lightblue",


  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    borderRadius: 8,
    height: 20,
    padding: 19,
    elevation: 3,
  },

  textFieldCVV: {
    paddingLeft: 25,
    margin: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 2,
  },
  textFieldCVVToggle: {
    paddingLeft: 25,
    margin: 5,
    borderWidth: 2,
    borderColor: "lightblue",
    borderRadius: 5,
  },

  Container: {
    position: "absolute",
    margin: 5,
    marginTop: 200,
    flex: 1,
    justifyContent: "center",
    width: 350,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: -2,
  },
  Card: {
    position: "absolute",
    margin: 30,
    marginTop: 30,
    borderRadius: 10,
    height: 200,
    width: 300,


  },

  textField: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  textFieldToggle:{
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "lightblue",
    borderWidth: 2,
  },
  dropDown: {
    paddingLeft: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 2,
  },
  dropDownToggle: {
    paddingLeft: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 2,
  },

  wrap: {
    position: "relative",
    flexDirection: "row",


  },
  wrapBack: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: 'white',
    width: 280,
    height: 28,
    borderRadius: 3,
    paddingTop:7,
    paddingLeft:260,
  },
  display: {
    borderRightWidth: 1,
    borderRightColor: "rgba(0, 0, 0, 0.2)",
    width: 32,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  textCVV:{
    fontSize: 10,
    color: "black",

  },
  textNumber: {
    fontSize: 80,
    color: "white",
  },
  noBorder: {
    borderRightWidth: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerBack: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 4,
    backgroundColor: 'white',
  },

  borderOnPress: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 2,
  },

});

const cardStyles = StyleSheet.create({
  card: {
    position:'absolute',
    width: 300,
    height: 200,
    borderRadius: 10,
    elevation: 10,

  },
  cardBack: {
    paddingLeft:30,

  },
  visaChipCont: {
    width: 256.8,
    height: 20,
    flexDirection: "row",
  },
  chip: {
    width: 40,
    height: 30,
    borderRadius: 5,
  },
  visa: {
    resizeMode: 'contain',
    height: '500%',
    width: '500%',
    paddingLeft: 10,


  },
  visaBack: {
    resizeMode: 'contain',
    width: 60,
    height: 32,

  },
  chipContainer: {
    paddingLeft: 15,
    paddingTop: 14,
  },
  visaContainer: {
    paddingLeft: 170,
    paddingTop: 14,
  },
  cardHoldertextToggle: {
    height: 30,
    width: 210,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  cardHoldertext: {
    height: 30,
    width: 210,
    paddingLeft: 10,

  },
  expiresText: {
    position: "absolute",
    fontSize: 80,
    paddingTop: 33,
    paddingLeft: 220,

  },
  textCont: {
    paddingTop: 33,
    paddingLeft: 5,
    width: 210.8,
    height: 40,
    flexDirection: "row",


  },
  textCont1: {
    width: 256.8,
    height: 20,
    flexDirection: "row",
    borderWidth: 1,
  },
  headerText: {
    marginLeft: 5,
    fontSize: 8,
    color: "#b3b5b4",
    elevation: 10,
  },
  subText: {
    marginLeft: 5,
    fontSize: 10,
    color: "white",
  },
  numbers: {
    color: "white",
  },
  numberContainerToggle: {
    height: 35,
    borderWidth:1,
    borderColor: 'gray',
    borderRadius: 5,


  },
  numberContainer: {
    height: 35,

  },
  middleContainer: {
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  numberText: {
    fontSize: 17,
    color: "white",
  },
});

export default ReactApp;
