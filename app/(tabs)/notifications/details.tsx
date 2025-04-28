import { COLORS, FONTS } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, FlatList, Image, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const defaultImages = [
  { id: '1', img: require('./../../../assets/images/cow.jpg') },
  { id: '2', img: require('./../../../assets/images/cows.jpg') },
  { id: '3', img: require('./../../../assets/images/cow.jpg') },
];

const SingleNotification = () => {
  const { title, body, date, iconName, affectedAreas, severity, lga, state, action } = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1 }}>
      
      {/* Image Slider */}
      <FlatList
        data={defaultImages}
        horizontal
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: wp(4), paddingTop: hp(2) }} 
        renderItem={({ item }) => (
          <Image
            source={item.img}
            style={{ width: wp(80), height: hp(30), marginRight: wp(3), borderRadius: 10 }}
            resizeMode="cover"
          />
        )}
      />

      {/* Notification Details */}
      <View style={{ alignItems: 'center', paddingHorizontal: wp(7), marginTop: hp(2) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(2) }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
              {date}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Date Issued
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
              {lga}, {state}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Location
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(2) }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
              {severity}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Severity
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
              {action}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Action Required
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(2) }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {Array.isArray(affectedAreas) ? affectedAreas.map((area, index) => (
              <Text key={index} style={{ color: COLORS.black, ...FONTS.body5 }}>
                {area}
              </Text>
            )) : (
              <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
                {affectedAreas}
              </Text>
            )}
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Affected Areas
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(2) }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
              {body}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleNotification;
