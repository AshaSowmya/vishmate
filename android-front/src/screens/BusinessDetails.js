// businessDetails
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon, { Icons } from '../bottomTab/Icons'; // Assuming you have the Icons component properly set up
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-animatable';
import MyHeader from '../bottomTab/MyHeader';
 
const businessDetails = () => {
 
    const navigation = useNavigation();
 
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [text, setText] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
 
 
    const linearGradientColors = ['#0F0C29', '#302B63', '#24243E']; // Define gradient colors here
 
    const handleChoosePhoto = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setSelectedImage(image.path);
            const splitPath = image.path.split('/');
            setFileName(splitPath[splitPath.length - 1]); // Extracting file name from the path
        }).catch(error => {
            console.log('ImagePicker Error: ', error);
        });
    };
 
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
 
 
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
 
 
    const handleMobileNumberChange = (input) => {
        // Remove any non-numeric characters from the input
        const formattedInput = input.replace(/[^\d]/g, '');
        let formattedNumber = '';
 
        // Format the number in the format (XXX) XXX-XXXX
        if (formattedInput.length > 3) {
            formattedNumber += `(${formattedInput.substring(0, 3)}) `;
        }
        if (formattedInput.length > 6) {
            formattedNumber += `${formattedInput.substring(3, 6)}-`;
        }
        if (formattedInput.length >= 7) {
            formattedNumber += formattedInput.substring(6, 10);
        }
 
        setMobileNumber(formattedNumber);
    };
    const handleMobileChange = (input) => {
        // Remove any non-numeric characters from the input
        const formattedInput = input.replace(/[^\d]/g, '');
        let formattedNumber = '';
 
        // Format the number in the format (XXX) XXX-XXXX
        if (formattedInput.length > 3) {
            formattedNumber += `(${formattedInput.substring(0, 3)}) `;
        }
        if (formattedInput.length > 6) {
            formattedNumber += `${formattedInput.substring(3, 6)}-`;
        }
        if (formattedInput.length >= 7) {
            formattedNumber += formattedInput.substring(6, 10);
        }
 
        setMobile(formattedNumber);
    };
    return (
 
 
        <ScrollView >
            <View style={styles.content}>
            <MyHeader
            back={true}
            onPressBack={() => navigation.goBack()}
            right="more-vertical"
            onRightPress={() => console.log('right')}
            height={84} // Adjust width as needed
            // Set title color to white
            headerBg="transparent"
          />
                <Image
                    source={require('../assets/images/firstpart/image.png')}
                    style={{ marginTop: 10, top: 25, marginLeft: -280,top:55 }}
                // Adjust margin as needed
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',left:-38 }}>Jewelry</Text>
                </View>
                <Text style={{ fontSize: 14, color: 'black',right:11 }}> jewelry@gmail.com</Text>
                <Text style={styles.label}>Upload Logo</Text>
                <TouchableOpacity onPress={handleChoosePhoto} style={styles.textfield}>
                    <View style={styles.uploadIcon}>
                        <Text style={styles.uploadText}>{fileName ? fileName : 'Choose File...'}</Text>
                        <Icon type={Icons.Feather} name="upload" size={20} color="black" />
 
                    </View>
                </TouchableOpacity>
 
                <Text style={styles.label}>Select Category *</Text>
                <Dropdown
                    style={[styles.textfield, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Category' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                        <Icon
                            type={Icons.Feather}
                            name="chevron-down"
                            size={20}
                            style={{ color: 'black' }} // Apply white color to the icon
                        />
                    )}
                />
                <Text style={styles.label}>Business Name *</Text>
                <TextInput
                    style={styles.textfield}
                    onChangeText={setText}
                    value={text}
                    placeholder="Business name"
                    placeholderTextColor="black" // Set placeholder text color to white
 
                />
                <Text style={styles.label}>Address *</Text>
                <TextInput
                    style={styles.textfield1}
                    onChangeText={setAddress}
                    value={address}
                />
                <Text style={styles.label}>Mobile Number *</Text>
                <TextInput
                    style={styles.textfield}
                    keyboardType="numeric"
                    value={mobileNumber}
                    onChangeText={handleMobileNumberChange}
                />
                <Text style={styles.label}>Alternate Mobile Number</Text>
                <TextInput
                    style={styles.textfield}
                    keyboardType="numeric"
                    value={mobile}
                    onChangeText={handleMobileChange}
                />
                <Text style={styles.label}>Email *</Text>
                <TextInput
                    style={styles.textfield}
                    keyboardType="email-address"
                    value={email}
                    placeholder="demo@gmail.com"
                    onChangeText={setEmail}
                    placeholderTextColor="black"
                />
 
                <Text style={styles.label}>Website</Text>
                <TextInput
                    style={styles.textfield}
                    value={website}
                    onChangeText={setWebsite}
                    placeholder="Ex : domain.com"
                    placeholderTextColor="black"
 
                />
 
                <Text style={styles.label1}></Text>
 
 
 
                <Text style={styles.label1}></Text>
            </View>
        </ScrollView>
 
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontFamily: "Lora-Bold",
        color: 'black',
        marginBottom: 20,
        top: 35
    },
    label: {
        fontSize: 16,
        fontFamily: "Montserrat-Medium",
        color: 'black',
        top: 20,
        alignSelf: 'flex-start',
        marginLeft: 22, // Adjust the margin as needed
        marginTop: 25
    },
    label1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        top: 20,
        alignSelf: 'flex-start',
        marginLeft: 22, // Adjust the margin as needed
        marginTop: 30,
    },
 
    textfield: {
        backgroundColor: '#E3E3E3', // Transparent white background
        padding: 10,
        borderRadius: 5,
        height: 45,
        width: 370,
        top: 28,
        left: 2,
        fontFamily: "Lora-VariableFont_wght"
    },
    textfield1: {
        backgroundColor: '#E3E3E3', // Transparent white background
        padding: 10,
        borderRadius: 5,
        height: 100,
        width: 370,
        top: 28,
        left: 2,
    },
    uploadIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    uploadText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Lora-VariableFont_wght'
 
    },
    icon: {
        marginRight: 5,
    },
 
    placeholderStyle: {
        fontSize: 14,
        color: 'black', // Set placeholder color to white
        fontFamily: 'Lora-VariableFont_wght'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#FFFFFF', // Set selected text color to white
    },
    iconStyle: {
        marginLeft: 10, // Add left margin to create space between text and icon
        width: 20,
        height: 20,
        color: '#FFFFFF', // Set icon color to white
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    buttons: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 370,
        borderColor: '#fff', // Add borderColor
    },
});
 
export default businessDetails;
 