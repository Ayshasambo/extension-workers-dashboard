import { COLORS, FONTS } from "@/constants/theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Index = () => {

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.white }}>
        
            {/* User and Settings Bar */}
            <View style={{width: '95%', height: hp(6), margin: 10, 
                    backgroundColor: COLORS.darkGray, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            
            <View style={{width: '40%', paddingRight: 7, height: hp(3), margin: 10, 
                    backgroundColor: COLORS.lightGray1, borderRadius: 10}}>        
                <Text style={{...FONTS.body3}}> Yusuf Habu </Text>        
            </View>

            <TouchableOpacity onPress={() => console.log('Settings Pressed')}>
           <MaterialCommunityIcons
                  name="cog-outline"
                  size={24}
                  color={COLORS.lightGray}
                  style={{ marginRight: 15, marginLeft: 15 }}
                />
              </TouchableOpacity>
            
            </View>

            {/* Weather Bar */}
            <View style={{width: '95%', height: hp(10), margin: 5, 
                    backgroundColor: '#FF512F', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            
            <View>        
                <Text style={{...FONTS.body2, color: COLORS.white}}> Kaduna </Text>
                <Text style={{...FONTS.body3, color: COLORS.white}}> Cloudy </Text>        
            </View>

            <View >        
                <Text style={{...FONTS.body1, color: COLORS.white}}> 32°C </Text>        
            </View>

            <View>  
            <MaterialIcons name="wb-cloudy" size={60} color="white" />            
            </View>
            
            </View>
        
        </View>
    );
};

export default Index;


