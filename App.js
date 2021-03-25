import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import * as Sharing from 'expo-sharing';

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null)

let openImagePickerAsync = async ()=>{
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

  if(permissionResult.granted === false){
    alert ('Los permisos son requeridos');
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync()
  if (pickerResult.calceled === true){
    return;
  }
  setSelectedImage({localUri: pickerResult.uri})
};

const openShareDialog = async () => {
 if (! (await Sharing.isAvailableAsync())) {
   alert('Sharing is not available on your platform')
   return;
 }

 await Sharing.shareAsync(selectedImage.localUri);
}


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
       Pick an Anime!!!
      </Text>
      <TouchableOpacity
          onPress = {openImagePickerAsync }
      >
      <Image
        source={{uri: 
          selectedImage !== null 
          ? selectedImage.localUri 
          : 'https://img.favpng.com/19/5/4/iphone-apple-icon-image-format-computer-icons-png-favpng-kUE73cWd8KdZuahBVtFHaBhAc.jpg',
        }} 
        style={styles.image}
      />

      </TouchableOpacity>
      { selectedImage ? (
          <TouchableOpacity 
            onPress = {openShareDialog}
            style = {styles.button}
          >
            <Text style={styles.textButton}>
              Share this image
            </Text>
          </TouchableOpacity>
        ) : (
          <View/>
          )}
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 30
  },
  image:{
    marginTop: 20,
    height: 250,
    width: 250,
    borderRadius: 100,
    resizeMode: "cover",
  },
  button:{
    backgroundColor: "deepskyblue",
    padding: 7,
    marginTop: 10,
    borderRadius: 10
  }, 
  textButton:{
    fontSize: 20,
    color: "white"

  }
});
