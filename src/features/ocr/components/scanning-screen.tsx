import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);



const TransmittingScreen = ({ stopTransmitting }) => {

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const takePicture = async (camera) => {
  if (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    if ("base64" in data) {
      const response = await sendPhotoToGoogle(data.base64 as string);
      const text = response.data.responses[0].fullTextAnnotation.text;
      const parsedText = text.split(/\n/);

      let foodItems = [];


      const options = {
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/classify?locale=en_us",
        headers: {
          "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": "a22928d6f9mshb93b86039d73110p147973jsn5fe883b86237",
          "Content-Type": "application/json"
        },
        data: { "title": "G.M M-GRN CHEERIOS", "upc": "", "plu_code": "" },
        method: 'POST'
      }
      parsedText.forEach(async string => {
        if (string.contains('$')) {
          const regex = /[1-9]+.[1-9]+/g
          const found = string.match(regex);
          foodItems.push({
            name: '',
            price: found
          })
        }
        else {
          const res = await axios(options);
          console.log(res);
        }
      })

    }
  }
};

const sendPhotoToGoogle = async (base64ImageString: string) => {
  const API_KEY = "AIzaSyCd7jEXStbHUvIIhjg0elLo835l28R10kU";
  return axios.post(
    `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
    {
      requests: [
        {
          image: {
            content: base64ImageString
          },
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1
            }
          ]
        }
      ]
    }
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    alignSelf: "stretch",
    backgroundColor: 'white'
  },
  preview: {
    minHeight: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default TransmittingScreen