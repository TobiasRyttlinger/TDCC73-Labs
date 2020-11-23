import React, { useState } from "react";
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
} from "react-native";
import FlipCard from "react-native-flip-card";
const ReactApp = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setcardName] = useState("");
  const [userCVV, setUserCVV] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");

  const [isToggled, setIsToggled] = React.useState(false);


  const toggle = React.useCallback(
      () => setIsToggled(!isToggled),
      [isToggled, setIsToggled],
    );

    const toggleFront = React.useCallback(
        () => setIsToggled(isToggled),
        [isToggled, setIsToggled],
      );

  var onPressed = false;

  var changeColo = () => {
    setState({ color: "red" });
  };
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

  var TextFun = (text) => {
    var inputBool = false;
    let textOutput = text.split(" ").join("");

    if (textOutput.length > 0) {
      textOutput = text;
    }
    return textOutput;
  };



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

              <View style={cardStyles.visaContainer}><Image style={cardStyles.visa} source={require('./Images/visa.png')}/></View>
            </View>

            <View style={cardStyles.middleContainer}>
              <View style={cardStyles.numberContainer}>
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
                        <Text style={styles.text}>{values[index] || "*"}</Text>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>

            <View style={cardStyles.textCont}>
              <View style={cardStyles.cardHoldertext}>
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
              <View style={cardStyles.visaContainer}><Image style={cardStyles.visa} source={require('./Images/visa.png')}/></View>
            </View>
            </ImageBackground>
          </View>
      </FlipCard>

      <View style={styles.Container}>
        <View style={{ paddingTop: 60 }}>
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              fontWeight: "900",
              color: "black",
            }}
          >
            Card number
          </Text>
          <TextInput
            value={cardNumber}
            onChangeText={(cardNumber) =>
              setCardNumber(HandleNumbers(cardNumber))
            }
            onClick={toggleFront}
            keyboardType="numeric"
            placeholder={""}
            style={styles.textField}
            selectionColor={"black"}
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
            onChangeText={(cardName) => setcardName(TextFun(cardName))}
            placeholder={""}
            onClick={toggleFront}
            style={styles.textField}
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
          <View style={styles.dropDown}>
            <Picker
              selectedValue={selectedMonth}
              onClick={toggleFront}
              style={{
                height: 50,
                width: 90,
                borderWidth: 1,
                borderColor: "gray",
              }}
              onValueChange={(selectedMonth, itemIndex) =>
                setSelectedMonth(TextFun(selectedMonth))
              }
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

          <View style={styles.dropDown}>
            <Picker
              onClick={toggleFront}
              selectedValue={selectedYear}
              style={{
                height: 50,
                width: 100,
                borderWidth: 1,
                borderColor: "gray",
              }}
              onValueChange={(selectedYear, itemIndex) =>
                setSelectedYear(TextFun(selectedYear))
              }
            >
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
            style={styles.textFieldCVV}
            selectionColor={"black"}
            onFocus={toggle}
            onSubmitEditing={toggle}
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
    borderRadius: 2,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  dropDown: {
    paddingLeft: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "lightgray",
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
    width: 60,
    height: 32,
    borderRadius: 5,
    paddingRight: 1,
  },
  chipContainer: {
    paddingLeft: 15,
    paddingTop: 14,
  },
  visaContainer: {
    paddingLeft: 170,
    paddingTop: 14,
  },
  cardHoldertext: {
    paddingTop: 33,
    paddingLeft: 10,
  },
  expiresText: {
    position: "absolute",
    fontSize: 80,
    paddingTop: 33,
    paddingLeft: 230,
  },
  textCont: {
    width: 256.8,
    height: 20,
    flexDirection: "row",
  },
  textCont1: {
    width: 256.8,
    height: 20,
    flexDirection: "row",
    borderWidth: 1,
  },
  headerText: {
    fontSize: 8,
    color: "#b3b5b4",
    elevation: 10,
  },
  subText: {
    fontSize: 10,
    color: "white",
  },
  numbers: {
    color: "white",
  },
  numberContainer: {
    height: 25,
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
