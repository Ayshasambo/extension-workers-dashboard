import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface CardProps {
  iconName:keyof typeof MaterialIcons.glyphMap;
  heading: string;
  subtitle: string;
}

const Card: React.FC<CardProps> = ({ iconName, heading, subtitle, }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
       <View style={styles.iconContainer}>
       <MaterialIcons name={iconName} size={25} style={styles.icon} />
       </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={15} color="#36813A" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: hp('10%'),
    width: wp('42%'),
    //flexDirection: 'row',
    //flex:1,
    backgroundColor: '#F7F7FA',
    borderRadius: 10,
    //marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    //padding:14,
   
  },
  iconContainer: {
    width: wp('10%'),
    height: hp('5%'),
    backgroundColor: '#DDEEDE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
    marginRight: 10, 
  },
  icon: {
    color: '#5A5B6A',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    height:46,
    //width:'50%',
    flexWrap:'nowrap'

  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
   
  },
  subtitle: {
    fontSize: 14,
    color: '#36813A',
    fontWeight:'bold',
  }
});

export default Card