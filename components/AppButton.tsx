import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

import { COLORS, FONTS } from ".././constants/theme"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface Props {
    label: string,
    onPress: () => void,
    backgroundColor?: string,
    color: string
}
const AppButton = ({ label, onPress, backgroundColor, color }: Props) => {
    return (

        <TouchableOpacity
            style={{
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundColor,
                paddingHorizontal: wp(10),
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.primary,
                width: '100%',
                marginBottom: hp(2)
            }}
            onPress={onPress}
        >
            <Text style={{ color: color, fontWeight: "bold", ...FONTS.body3, alignSelf:'center' }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default AppButton;