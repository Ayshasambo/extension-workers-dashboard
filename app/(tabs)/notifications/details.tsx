import { COLORS, FONTS } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';

const defaultImages = [
  { id: '1', img: require('./../../../assets/images/cow.jpg') },
  { id: '2', img: require('./../../../assets/images/cows.jpg') },
  { id: '3', img: require('./../../../assets/images/cow.jpg') },
];

const SingleNotification = () => {
  const { body, affectedPlaces, severity, status, category, updatedAt } = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1 }}>
      

      {/* Notification Details */}
      <View style={{ alignItems: 'center', paddingHorizontal: wp(7), marginTop: hp(2) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(2) }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
              {updatedAt ? moment(updatedAt as string).format('MMMM Do YYYY') : ''}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Date Issued
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
              {category}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Category
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
              {status}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Status
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(2) }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
              {Array.isArray(affectedPlaces)
                ? (affectedPlaces as string[]).join(', ')
                : (affectedPlaces as string)}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body6 }}>
              Affected Places
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
