import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface NotificationProps{
    title: string,
    iconName: keyof typeof MaterialIcons.glyphMap;
    tags?: [],
    distance: string

}



const NotificationCard = ({iconName, title, tags, distance}: NotificationProps) => {
  return (
    <View style={styles.resourceContainer}>
    <View style={styles.leftIconContainer}>
        <MaterialIcons name={iconName} size={24} color="#36813A" />
    </View>

    <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.characteristicsContainer}>
            {tags?.map((characteristics:string, index:number) => (
                <View key={index} style={styles.characteristicsBox}>
                    <Text style={styles.characteristics} numberOfLines={2} ellipsizeMode="tail">{characteristics}</Text>
                </View>
            ))}
        </View>
    </View>

    <View style={styles.distanceIconContainer}>
        <View style={styles.distanceItem}>
            <MaterialIcons name="place" size={15} color="#5F6368" />
            <Text style={styles.distancetext}>{distance}</Text>
        </View>

        <View style={styles.distanceItem}>
            <MaterialIcons name="merge" size={15} color="#5F6368" />
            <Text style={styles.distancetext}>Go</Text>
        </View>
    </View>
</View>
  )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex:1,
    },
    innerContainer:{
        width: '100%', 
       alignSelf:'center',
       marginTop:20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F7F7FA',
        borderRadius: 7,
        paddingHorizontal: 10, 
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        shadowColor: '#5A5B6A', 
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        elevation: 5, 
    },
    searchBar: {
        flex: 1, 
        height: 40,
    },
    searchIcon: {
        marginRight: 10, 
    },
    tuneIcon: {
        marginLeft: 10,  
    },
    resourceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#F7F7FA',
        borderRadius: 7,
        padding: 15,
        marginVertical: 5,
        height:hp('10%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    leftIconContainer: {
        width: wp('8%'),
        height: hp('4%'),
        backgroundColor: '#DDEEDE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center', 
        paddingLeft: 5,
        marginTop:10

    },
    titleContainer: {
       marginVertical:5
    },
    characteristicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    characteristicsBox: {
        backgroundColor: "#EDEDF0",
        padding: 5,
        borderRadius: 99,
        marginRight: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3A3A44',
    },
    characteristics: {
        fontSize: 12,
        color: '#666',
    },
    distanceIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    distanceItem: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    distancetext: {
        fontSize: 12,
        color: '#219653',
        marginTop: 2,
    },
    categoriesContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        marginTop: 5,
    },
    categoryItem: {
        // flexDirection:'row',
        paddingVertical:5 ,
        paddingHorizontal: 5,
        backgroundColor: "#EDEDF0",
        borderRadius:70,
        marginVertical:10
    },
    categoryText: {
        fontSize: 10,
        color: '#333333',
    },
});

export default NotificationCard