import React, { Component } from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,TextInput} from 'react-native';
import PasswordStrengthMeter from './components/PasswordStrengthMeter'
import CarouselApp from './components/carousel'

class App extends Component {
    render() {
        return(
          <ScrollView>
          <PasswordStrengthMeter maxLen={12}/>
          <View style={{height: '100%'}}>
            <CarouselApp
              carouselLenght={6}
              pageScroll={true}
              horizontal = {true}
              spacing={0.1}
              imageWidthScale={0.9}
              imageHeightScale={0.9}
              imageInput={"https://picsum.photos/1120/1242?random"}
            />
          </View>
        </ScrollView>

        )
    }
}

export default App;
