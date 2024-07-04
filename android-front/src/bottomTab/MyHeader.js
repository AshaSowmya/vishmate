// MyHeader.js

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Colors from './Colors';
import LinearGradient from 'react-native-linear-gradient';

const IconSize = 24;

const MyHeader = ({
  style,
  menu,
  onPressMenu,
  back,
  onPressBack,
  title,
  right,
  titleFontFamily, // New prop for title font family
  rightIcon,
  onRightPress,
  optionalBtn,
  optionalBtnPress,
  headerBg, // New prop for header background color
  iconColor,
  titleAlight,
  optionalBadge,
  width, // New prop for header width
  titleColor,
  height, // New prop for title color
}) => {
  const color = titleColor || Colors.white;
  const backgroundColor = headerBg || 'transparent'; // Set default background color to transparent

  return (
    <LinearGradient
      colors={['#0F0C29', '#302B63', '#24243E']}
      style={[styles.header, style, { backgroundColor, width, height }]} // Set width and height
      useAngle={true} // Enable angle
      angle={45} // Set angle
    >
      <View style={styles.leftView}>
        {menu && (
          <TouchableOpacity onPress={onPressMenu}>
            <Feather name="menu" size={IconSize} color={color || iconColor} />
          </TouchableOpacity>
        )}
        {back && (
          <TouchableOpacity onPress={onPressBack}>
            <Feather name="arrow-left" size={IconSize} color={color || iconColor} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleView}>
      
        <Title style={{ color, textAlign: titleAlight, fontFamily: titleFontFamily }}>{title}</Title>
      </View>
      <View style={styles.rightView}>
        {optionalBtn && (
          <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
            <Feather name={optionalBtn} size={IconSize} color={color || iconColor} />
            {optionalBadge && (
              <Badge style={{ position: 'absolute', top: -5, right: -10 }}>{optionalBadge}</Badge>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onRightPress}>
          <Feather name={rightIcon} size={IconSize} color={color || iconColor} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  header: {
    height: 50,
    elevation: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftView: {
    marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    flex: 1,
  },
  rightView: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});
