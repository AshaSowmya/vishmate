import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon, { Icons } from '../bottomTab/Icons';
import MyHeader from '../bottomTab/MyHeader';
import { useNavigation } from '@react-navigation/native';

const GridOverlay = ({ width, height, cellSize }) => {
  const rows = Math.floor(height / cellSize);
  const cols = Math.floor(width / cellSize);
  
  const rowLines = [];
  const colLines = [];
  
  for (let i = 0; i <= rows; i++) {
    rowLines.push(
      <View key={`row-${i}`} style={[styles.gridLine, { width: width, top: i * cellSize }]} />
    );
  }
  
  for (let i = 0; i <= cols; i++) {
    colLines.push(
      <View key={`col-${i}`} style={[styles.gridLine, { height: height, left: i * cellSize }]} />
    );
  }
  
  return (
    <>
      {rowLines}
      {colLines}
    </>
  );
};

const Frame = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [isModalVisibled, setIsModalVisibled] = useState(false);
  const [isEyeVisible, setIsEyeVisible] = useState(true);
  const [isLockVisible, setIsLockVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isLogoLockVisible, setIsLogoLockVisible] = useState(true);
  const [isNumberVisible, setIsNumberVisible] = useState(true);
  const [isNumberLockVisible, setIsNumberLockVisible] = useState(true);
  const [isIdVisible, setIsIdVisible] = useState(true);
  const [isIdLockVisible, setIsIdLockVisible] = useState(true);
  const [isWebVisible, setIsWebVisible] = useState(true);
  const [isWebLockVisible, setIsWebLockVisible] = useState(true);
  const [isLocationVisible, setIsLocationVisible] = useState(true);
  const [isLocationLockVisible, setIsLocationLockVisible] = useState(true);
  const [isMediaVisible, setIsMediaVisible] = useState(true);
  const [isMediaLockVisible, setIsMediaLockVisible] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(true);
  const [isContactLockVisible, setIsContactLockVisible] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const navigation = useNavigation();

  const { goldValue, silverValue } = route.params;

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const toggleModals = () => setIsModalVisibles(!isModalVisibles);
  const toggleModald = () => setIsModalVisibled(!isModalVisibled);

  const handleChoosePhoto = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectedImage(image.path);
      const splitPath = image.path.split('/');
      setFileName(splitPath[splitPath.length - 1]); // Extracting file name from the path
    }).catch(error => console.log('ImagePicker Error: ', error));
  };

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <LinearGradient colors={['#0F0C29', '#302B63', '#24243E']} style={styles.linearGradient}>
        <Text style={styles.modalTitle}>Add Text</Text>
      </LinearGradient>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setGoldValue(value)}
        value={goldValue}
        placeholder="Add Text here"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.buttons, styles.cancelButton]} onPress={toggleModal}>
          <Text style={styles.cbuttonTexts}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons, styles.signupButton, styles.linearGradients]} onPress={toggleModal}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderModalContents = () => (
    <View style={styles.modalContent}>
      <LinearGradient colors={['#0F0C29', '#302B63', '#24243E']} style={styles.linearGradient}>
        <Text style={styles.modalTitle}>Add Image</Text>
      </LinearGradient>
      <Text style={{ marginBottom: 20, color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 17 }}>
        Select an image from gallery or camera
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.buttons, styles.cancelButtons]} onPress={handleChoosePhoto}>
          <Text style={styles.buttonTexts}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons, styles.signupButtond, styles.linearGradients]} onPress={toggleModals}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderModalContentd = () => (
    <View style={styles.modalContents}>
      <LinearGradient colors={['#A9A0FA', '#302B63', '#24243E']} style={styles.linearGradiend}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={toggleModald}>
            <Image source={require('../assets/images/firstpart/arow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Layers</Text>
        </View>
        <View style={styles.layerItem}>
          <TouchableOpacity onPress={() => setIsEyeVisible(!isEyeVisible)}>
            <Icon type={Icons.Feather} name={isEyeVisible ? 'eye' : 'eye-off'} color="white" style={styles.layerIcon} />
          </TouchableOpacity>
          <Text style={styles.layerText}>PM Towers kalavasal mad</Text>
          <TouchableOpacity onPress={() => setIsLockVisible(!isLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isLockVisible ? 'lock' : 'lock-open'} color="white" />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={styles.layerImage} />
        </View>
        {/* Similar structure for other layer items */}
      </LinearGradient>
    </View>
  );

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const posterWidthFromFigma = 1080;
  const posterHeightFromFigma = 1080;

  const widthRatio = screenWidth / posterWidthFromFigma;
  const heightRatio = screenHeight / posterHeightFromFigma;
  const minRatio = Math.min(widthRatio, heightRatio);

  const posterWidth = posterWidthFromFigma * minRatio;
  const posterHeight = posterHeightFromFigma * minRatio;

  const translateX = (screenWidth - posterWidth) / 2;

  const scaledGoldX = goldPosition.x * minRatio;
  const scaledGoldY = goldPosition.y * minRatio;

  const scaledSilverX = silverPosition.x * minRatio;
  const scaledSilverY = silverPosition.y * minRatio;

  return (
    <View style={styles.container}>
      <MyHeader
        back={true}
        onPressBack={() => navigation.goBack()}
        headerBg="transparent"
        titleFontFamily="Lora-Bold"
        onRightPress={() => console.log('right')}
        height={84}
      />
      <View style={[styles.borderBox, { width: posterWidth, height: posterHeight, left: translateX }]}>
        <Image source={require('../assets/images/thirdpart/S1.jpg')} style={[styles.imageInBox, { width: posterWidth, height: posterHeight }]} />
        <GridOverlay width={posterWidth} height={posterHeight} cellSize={50} />
        <View style={[styles.textContainer, { left: scaledGoldX, top: scaledGoldY }]}>
          <Text style={styles.text}>{goldValue}</Text>
        </View>
        <View style={[styles.textContainer, { left: scaledSilverX, top: scaledSilverY }]}>
          <Text style={styles.text}>{silverValue}</Text>
        </View>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100, position: 'absolute', left: 100, top: 100 }} />
        )}
      </View>
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={toggleModal}>
          <Image source={require('../assets/images/secondpart/1.png')} style={styles.tabImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={toggleModals}>
          <Image source={require('../assets/images/secondpart/2.png')} style={styles.tabImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={toggleModald}>
          <Image source={require('../assets/images/secondpart/3.png')} style={styles.tabImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('FirstScreen')}>
          <Image source={require('../assets/images/secondpart/4.png')} style={styles.tabImage} />
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>{renderModalContent()}</Modal>
      <Modal isVisible={isModalVisibles}>{renderModalContents()}</Modal>
      <Modal isVisible={isModalVisibled}>{renderModalContentd()}</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  borderBox: {
    borderColor: 'black',
    borderWidth: 1,
    position: 'absolute',
  },
  imageInBox: {
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    padding: 10,
  },
  tabImage: {
    width: 40,
    height: 40,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linearGradient: {
    padding: 10,
    borderRadius: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  signupButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  modalHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  layerIcon: {
    marginRight: 10,
  },
  layerText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  layerImage: {
    width: 20,
    height: 20,
  },
});

export default Frame;
