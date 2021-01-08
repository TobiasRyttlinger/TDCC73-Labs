import React, { useState } from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,TextInput,Dimensions,FlatList,Image} from 'react-native';
// Reach size of app window
const { width: width, height: height } = Dimensions.get("window");

//Variables to change the behaviour of the carousel
//carouselLenght  Change amount of images shown
var imageHeightScale = 0.9//Change height percentage of window size
var imageWidthScale= 0.9; // Change width percentage of window size
var pageScroll = true; //Enable or disable locked page scroll
var horizontal = true; // change between horizontal and vertical scroll
var spacing = 10;
var borderRad = 3;
//var imageInput = "https://picsum.photos/1120/1242?random";
const CarouselApp = ({carouselLenght, pageScroll, horizontal, spacing, imageHeightScale, imageWidthScale, imageInput}) => {

 //Generate an array of dummy images
  const imageList = Array.from({ length: carouselLenght }).map((_, i) => {
    return {
      id: i,
      image: `${imageInput}=${i}`,
    };
  });


  //Function that gets the array of images and rescales them accordingly to the window size
  //then returns a view element containing the image
  function GenerateImages({ data }) {
    return (
      <View style={styles.swiper}>
        <Image
          source={{ uri: data.image }}
          style={{width: width * imageWidthScale, height: height * imageHeightScale, justifyContent: "center", alignItems: 'center', borderRadius: borderRad,}}
        />
      </View>
    );
  }

  return (
      <SafeAreaView>
        <FlatList
          data={imageList}
          pagingEnabled = {pageScroll}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={true}
          ItemSeparatorComponent={
                    () => <View style={{width: spacing}}/>
          }
          renderItem={({ item }) => {
            return <GenerateImages data={item} />; //Reaching each view containing an image.
          }}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   swiper:{
     width: width,
     height: height,
     justifyContent: "center",
     alignItems: 'center',

   },
   seperator:{
      width: spacing,
   },
   imageStyle:{
     width: width * imageWidthScale,
     height: height * imageHeightScale,
     justifyContent: "center",
     alignItems: 'center',
     borderRadius: borderRad,
   },

});

export default CarouselApp;
