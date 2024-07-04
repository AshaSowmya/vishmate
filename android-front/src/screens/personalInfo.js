import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Modal, TextInput, Button, TouchableOpacity, Alert ,Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import MyHeader from '../bottomTab/MyHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_GATEWAY_URL } from '@env';
 
const PersonalInfo = () => {
 
    const navigation = useNavigation();
 
    const [isAccountDetailsModalVisible, setIsAccountDetailsModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [planPrice, setPlanPrice] = useState('');
    const [Preminium, setPreminium] = useState('');
    const [customerId, setCustomerId] = useState(null);
    const [businessName, setBusinessName] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [bussinessId, setBussinessId] = useState('');
    const [user, setUser] = useState({
        name: "",
        email: "",
        customer_id: "",
        mobile: "",
        plan_price: ""
    });
 
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
     
    const handleInputChange = (key, value) => {
        setUser({ ...user, [key]: value });
    };
 
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
 
    const toggleAccountDetailsModal = () => {
        setIsAccountDetailsModalVisible(!isAccountDetailsModalVisible);
    };
 
    const [businessData, setBusinessData] = useState({ upload_logo: "", business_name: "" });
    const terms = () => {
        Linking.openURL('https://vishmate.com/termsAndConditions.html'); // Replace with your actual URL
      };
 
    const handlePasswordChange = async () => {
        if (newPassword === confirmPassword) {
            try {
                const response = await axios.put(
                    `${REACT_APP_API_GATEWAY_URL}/api/user/${customerId}`, // Using customer_id: 1 explicitly
                    { newPassword: newPassword },
                    {
                        headers: {
                            Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
                            'Content-Type': 'application/json', // Ensure correct content type
                        },
                    }
                );
                console.log('Password updated successfully:', response.data);
                Alert.alert('Success', 'Password updated successfully');
                toggleModal();
            } catch (error) {
                console.error('Error updating password:', error);
                Alert.alert('Error', 'Failed to update password');
            }
        } else {
            Alert.alert('Error', 'Passwords do not match');
        }
    };
 
    useEffect(() => {
        const fetchCustomerId = async () => {
            try {
                const storedCustomerId = await AsyncStorage.getItem('customerId');
                const parsedCustomerId = JSON.parse(storedCustomerId); // Parse the JSON string
                console.log("customer_id:", parsedCustomerId);
 
                if (parsedCustomerId !== null) {
                    setCustomerId(parsedCustomerId);
                }
            } catch (error) {
                console.error('Error fetching customer ID from storage:', error);
            }
        };
 
        fetchCustomerId();
    }, [customerId]);
 
    useEffect(() => {
        if (customerId) {
            const fetchBusinessData = async () => {
                try {
                    const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/addbussinessesbyid/${customerId}`, {
                        headers: {
                            Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
                        },
                    });
 
                    console.log('API Response addbusiness:', response.data);
 
                    if (response.data && Array.isArray(response.data.AddBussiness) && response.data.AddBussiness.length > 0) {
                        const profile = response.data.AddBussiness[0];
                        const baseUrl = 'https://gurutheatre.s3.ap-south-1.amazonaws.com/'; // Update base URL
                        setSelectedImage(`${baseUrl}${profile.upload_logo}`);
                        console.log('Full Image URL:', `${baseUrl}${profile.upload_logo}`);
                        setBusinessName(profile.bussiness_name || '');
                        setBussinessId(profile.bussiness_id || '');
                    } else {
                        console.error('Unexpected response structure:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching business data:', error);
                }
            };
 
            fetchBusinessData();
 
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/userbyid/${customerId}`, {
                        headers: {
                            Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
                        },
                    });
 
                    console.log('API Response user:', response.data);
 
                    if (response.data && response.data.User && Array.isArray(response.data.User) && response.data.User.length > 0) {
                        const userData = response.data.User[0];
                        setUser({
                            name: userData.name,
                            email: userData.email,
                            mobile: userData.mobile,
                            customer_id: userData.customer_id,
                        });
                        setPlanPrice(userData.plan_price);
                        setPreminium(userData.select_plan);
                    } else {
                        console.error('Unexpected response structure:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
 
            fetchUserData();
        }
    }, [customerId]);
 
    const handleChoosePhoto = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            // Display the selected image
            setSelectedImage(image.path);
            console.log("image", image.path)
 
            // Make a PUT request to update the image in the database
            const formData = new FormData();
            formData.append('upload_logo', {
                uri: image.path,
                name: 'image.jpg',
                type: 'image/jpeg',
            });
 
            axios.put(`${REACT_APP_API_GATEWAY_URL}/api/addbussinesses/${bussinessId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
                },
            }).then(response => {
                console.log('businessId', bussinessId);
                console.log('Image updated successfully:', response.data);
                // Optionally, you can update the local state or perform any other action upon successful update
            }).catch(error => {
                console.error('Error updating image:', error);
            });
 
        }).catch(error => {
            console.log('ImagePicker Error: ', error);
        });
    };
 
    const renderModalContent = () => (
        <View style={styles.modalContent}>
 
            <LinearGradient colors={['#0F0C29', '#302B63', '#24243E']} style={styles.linearGradient}>
                <Text style={styles.modalTitle}>Change Password</Text>
            </LinearGradient>
            <Text style={{ marginBottom: 15, right: 75, color: 'black', fontFamily: 'Montserrat-Medium' }}>New Password *</Text>
            <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
                <TextInput
                    secureTextEntry={true}
                    style={[styles.input ,{ color:darkMode ? 'black' : 'black'}]}
                    onChangeText={setNewPassword}
                    value={newPassword}
                />
 
            </View>
            <Text style={{ marginBottom: 15, right: 64, color: 'black', fontFamily: 'Montserrat-Medium' }}>Confirm Password *</Text>
            <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
                <TextInput
                    secureTextEntry={true}  
                    style={[styles.input ,{ color:darkMode ? 'black' : 'black'}]}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
            </View>
            <LinearGradient
                colors={['#0F0C29', '#302B63', '#24243E']}
                style={{ borderRadius: 10 }}
                start={{ x: 0, y: 0.6 }}
                end={{ x: 0, y: 0 }}>
                <TouchableOpacity style={styles.buttons} onPress={handlePasswordChange}>
 
                    <Text style={styles.buttonText}>Save</Text>
 
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
 
    const renderAccountDetailsModalContent = () => (
        <View style={styles.modalContent}>
            <LinearGradient colors={['#0F0C29', '#302B63', '#24243E']} style={styles.linearGradient}>
                <Text style={styles.modalTitle}>Account Details</Text>
            </LinearGradient>
            <Text style={{ marginBottom: 15, right: 109, color: 'black', fontFamily: 'Montserrat-Medium' }}>Name *</Text>
            <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
                <TextInput
                    style={styles.input}
                    onChangeText={value => handleInputChange('name', value)}
                    value={user.name}
                />
            </View>
            <Text style={{ marginBottom: 15, right: 110, color: 'black', fontFamily: 'Montserrat-Medium' }}>Email *</Text>
            <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
                <TextInput
                    style={styles.input}
                    onChangeText={value => handleInputChange('email', value)}
                    value={user.email}
                />
            </View>
            <Text style={{ marginBottom: 15, right: 75, color: 'black', fontFamily: 'Montserrat-Medium' }}>Mobile Number *</Text>
            <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
                <TextInput
                    style={styles.input}
                    onChangeText={value => handleInputChange('mobile', value)}
                    value={user.mobile}
                />
            </View>
            <LinearGradient
                colors={['#0F0C29', '#302B63', '#24243E']}
                style={{ borderRadius: 10 }}
                start={{ x: 0, y: 0.6 }}
                end={{ x: 0, y: 0 }}>
                <TouchableOpacity style={styles.buttons} onPress={toggleAccountDetailsModal}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
 
 
 
 
 
    return (
        <View style={styles.container}>
            <MyHeader
                back={true}
                onPressBack={() => navigation.goBack()}
                right="more-vertical"
                onRightPress={() => console.log('right')}
                height={84} // Adjust width as needed
                // Set title color to white
                headerBg="transparent"
            />
            <Text style={{ top: -55, color: 'white', left: 80,fontFamily:'Lora-Bold',fontSize:19}}>PersonalInfo</Text>
            <View style={{ marginBottom: 200 }}>
                {/* {imageUri ? (
               <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
                <TouchableOpacity onPress={handleImageUpload} >
                    <Image source={require('../assets/images/products/flowbite_edit-solid.png')} style={styles.proimage}/>
                </TouchableOpacity>
            )} */}
                <TouchableOpacity onPress={handleChoosePhoto}>
                    <View style={styles.profileImageContainer}>
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage }}
                                style={[styles.imageThumbnail, { borderRadius: 65, marginBottom: -80, top: 55, left: 140 }]} // 25 is half of 50
                            />
                        ) : (
                            <Image
                                source={{ uri: businessData.upload_logo }}
                                style={[styles.imageThumbnail, { borderRadius: 65, marginBottom: -80, top: 55, left: 140 }]} // 25 is half of 50
                            />
                        )}
                        <Image source={require('../assets/images/firstpart/flowbite_edit-solid.png')} style={styles.proimage} />
                    </View>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', top: 137, left: -8, fontWeight: 'bold', fontFamily: 'Montserrat-Medium', }}>{businessName}</Text>
            </View>
 
            <Text style={{ fontSize: 20, fontFamily: 'Lora-Bold', marginLeft: 20, color: 'black', marginBottom: 20 }}>
                Subscription Plan
            </Text>
 
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <View style={styles.row}>
                    <Image
                        source={require('../assets/images/firstpart/Frame.png')}
                        style={styles.image}
 
                    />
                    <Text style={styles.ptext} >{Preminium}</Text>
                    <Text style={styles.textp} >{planPrice}</Text>
                </View>
 
            </View>
            {/* <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={toggleAccountDetailsModal}>
                    <View style={styles.row}>
                        <Image
                            source={require('../assets/images/firstpart/list.png')}
                            style={styles.image}
                        />
                        <Text style={styles.text}>Account Details</Text>
                    </View>
                </TouchableOpacity>
                <Image
                    source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
                    style={styles.cornerimage}
                    alignSelf='flex-end' // Align the image to the right side
                />
            </View> */}
 
            <TouchableOpacity  onPress={toggleModal}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <View style={styles.row}>
                    <Image
                        source={require('../assets/images/firstpart/tabler_password-fingerprint.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text} onPress={toggleModal}>Change password</Text>
                </View>
                <Image
                    source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}
                    style={styles.cornerimage}
                    alignSelf='flex-end'
                />
            </View>
            </TouchableOpacity>
 
            <Modal
                // animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    {renderModalContent()}
                </View>
            </Modal>
            <Modal
                transparent={true}
                visible={isAccountDetailsModalVisible}
                onRequestClose={toggleAccountDetailsModal}
            >
                <View style={styles.modalContainer}>
                    {renderAccountDetailsModalContent()}
                </View>
            </Modal>
            <TouchableOpacity onPress={terms}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
                <View style={styles.row}>
                    <Image
                        source={require('../assets/images/firstpart/carbon_rule-locked.png')} // Provide the path to your left image
                        style={styles.image}
                    />
                    <Text style={styles.text}>Terms and Service</Text>
                </View>
                <Image
                    source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
                    style={styles.cornerimage}
                    alignSelf='flex-end' // Align the image to the right side
                />
            </View>
            </TouchableOpacity>
 
        </View>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'left',
        alignItems: 'left',
        backgroundColor:'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    text: {
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 36,
        color: 'black'
        , marginBottom: 10// Adjust as needed to add spacing between the images and text
    },
    ptext: {
        fontSize: 15,
        fontFamily: 'Lora-Bold',
        marginLeft: 26,
        color: 'black'
        , marginBottom: 10// Adjust as needed to add spacing between the images and text
    },
    textp: {
        fontSize: 15,
        left:190,
        fontFamily: 'Lora-Bold',
        marginLeft: 26,
        color: 'black'
        , marginBottom: 10// Adjust as needed to add spacing between the images and text
    },
    Stext: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 36,
        color: 'red'
        , marginBottom: 10// Adjust as needed to add spacing between the images and text
    },
    image: {
        width: 24, // Adjust the width of the images as needed
        height: 24, // Adjust the height of the images as needed
        left: 15,
        marginBottom: 10
    },
    proimage: {
        width: 25, // Adjust the width of the images as needed
        height: 25, // Adjust the height of the images as needed
        left: 225,
        top: 108
    },
    cornerimage: {
        width: 24, // Adjust the width of the images as needed
        height: 24, // Adjust the height of the images as needed
        marginBottom: 10,
        left: -15
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        height: 'auto',
        width: 300
    },
    modalTitle: {
        fontSize: 19,
 
        left: -49,
        top: 3,
        color: 'white',
        fontFamily: 'Lora-Bold',
    },
    input: {
        width: 250,
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        height: 50,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 85, // Make it a circle
        left: 135,
        top: 100
    },
    uploadButton: {
        width: 200,
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 16,
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
    },
    linearGradient: {
        height: 65,
        width: 300,
        top: -20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15
    },
    buttons: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 110,
 
        // Add borderWidth
        borderColor: '#fff', // Add borderColor
        position: 'flex'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    uploadIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    imageThumbnail: {
        width: 115,
        height: 115,
    }
 
});
 
export default PersonalInfo;