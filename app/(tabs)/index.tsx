import { COLORS, FONTS } from "../../constants/theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/hooks/useData";
import moment from "moment";
import { useLocation } from "@/context/LocationContext";
import { useWeather } from "@/hooks/useWeather";

type Animals = {
    identifier: string,
    expectedDate: string
}
type BreedingCycle = {
    animals: Animals[],
    total: number
}
type VaccinationStatus = {
    dueForVaccination: number,
    percentage: number,
    totalVaccinated: number
}
type liveStockCount = {
    cattle: number,
    sheep: number,
    goats: number,
    total: number    
}
type HealthStatus = {
    healthy: number,
    critical: number,
    sick: number    
}
type Statistics = {     
    livestockCount: liveStockCount,
    healthStatus: HealthStatus,
    vaccinationStatus: VaccinationStatus,
    breedingCycle:  BreedingCycle
}

const Index = () => {
    const { data:statistics, isLoading, error } = useData<Statistics>('/dashboard/statistics')
    const {location} = useLocation()
    const { data: weather, isLoading: weatherLoading } = useWeather(
        location?.latitude,
        location?.longitude
      );
    const vaccinationProgress = statistics?.vaccinationStatus?.percentage || 0;
    
    const formatDate = (date: string) => {
        return moment(date).format('MMMM Do YYYY')
    }
    
    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
          case "clear":
            return <MaterialIcons name="wb-sunny" size={60} color="white" />;
          case "clouds":
            return <MaterialIcons name="wb-cloudy" size={60} color="white" />;
          case "rain":
            return <MaterialCommunityIcons name="weather-rainy" size={60} color="white" />;
          case "snow":
            return <MaterialCommunityIcons name="weather-snowy" size={60} color="white" />;
          case "thunderstorm":
            return <MaterialCommunityIcons name="weather-lightning" size={60} color="white" />;
          case "drizzle":
            return <MaterialCommunityIcons name="weather-hail" size={60} color="white" />;
          default:
            return <MaterialIcons name="wb-cloudy" size={60} color="white" />;
        }
      };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightGray1, marginTop: 30 }}>
        
            <View style={{width: '95%', height: hp(6), marginTop: Platform.OS === 'ios' ? 10 : 10, 
                    backgroundColor: COLORS.darkGray, borderRadius: 10, 
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            
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
                <Text style={{...FONTS.body2, color: COLORS.white}}> {weather?.name || "Loading..."} </Text>
                <Text style={{...FONTS.body3, color: COLORS.white}}> {weather?.weather[0].main} </Text>        
            </View>

            <View >        
                <Text style={{...FONTS.body1, color: COLORS.white}}> {weather?.main.temp ? `${Math.round(weather.main.temp)}°C` : "--"} </Text>        
            </View>

            <View>  
            {weather ? getWeatherIcon(weather.weather[0].main) : null}            
            </View>
            
            </View>

            {/* Livestock Count Bar */}
            <View style={{width: '95%', height: hp(15), margin: 5, 
            backgroundColor: COLORS.white, borderRadius: 10, }}>

            <View style={{margin: 8}}>
            <Text style={{...FONTS.h3, color: COLORS.black}}> Total Livestock </Text>
            <Text style={{...FONTS.h2, color: COLORS.blue}}> {statistics?.livestockCount?.total || 0} </Text>  
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <View>        
                <Text style={{...FONTS.h4, color: COLORS.black}}> {statistics?.livestockCount?.cattle || 0} </Text>
                <Text style={{...FONTS.h5, color: COLORS.gray}}> Cattle </Text>        
            </View>

            <View>        
                <Text style={{...FONTS.h4, color: COLORS.black}}> {statistics?.livestockCount?.sheep || 0} </Text>
                <Text style={{...FONTS.h5, color: COLORS.gray}}> Sheep </Text>        
            </View>

            <View>        
                <Text style={{...FONTS.h4, color: COLORS.black}}> {statistics?.livestockCount?.goats || 0} </Text>
                <Text style={{...FONTS.h5, color: COLORS.gray}}> Goats </Text>        
            </View>
            </View>

            </View>
            
            {/* Health Status */}
            <View style={{width: '95%', height: hp(10), margin: 5, 
            backgroundColor: COLORS.white, borderRadius: 10, }}>

            <View style={{margin: 8}}>
            <Text style={{...FONTS.h3, color: COLORS.black}}> Health Status </Text>  
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <View>        
                <Text style={{...FONTS.h4, color: COLORS.green}}> {statistics?.healthStatus?.healthy || 0} </Text>
                <Text style={{...FONTS.h5, color: COLORS.gray}}> Healthy </Text>        
            </View>

            <View>        
                <Text style={{...FONTS.h4, color: COLORS.yellow}}> {statistics?.healthStatus?.sick || 0} </Text>
                <Text style={{...FONTS.h5, color: COLORS.gray}}> Sick </Text>        
            </View>

            <View>        
                <Text style={{...FONTS.h4, color: COLORS.red}}> {statistics?.healthStatus?.critical || 0} </Text>
                <Text style={{...FONTS.h5, color: COLORS.gray}}> Critical </Text>        
            </View>
            </View>
            </View>

            {/* Livestock Count Bar */}
            <View style={{width: '95%',  margin: 5, 
            backgroundColor: COLORS.white, borderRadius: 10, paddingBottom: 15}}>

            <View style={{margin: 8}}>
            <Text style={{...FONTS.h3, color: COLORS.black}}> Vaccination Status </Text>
            <Text style={{...FONTS.h2, color: COLORS.blue}}> {statistics?.vaccinationStatus?.totalVaccinated || 0} </Text>  
            </View>

            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', marginLeft: 8}}>
            <View>        
                <Text style={{...FONTS.body4, color: COLORS.black}}> Animals Vaccinated </Text> 
                <Progress.Bar progress={vaccinationProgress*0.01} width={wp(85)} height={10}/>  
            </View>

            </View>

            </View>

        {/* Breeding Cycle Bar */}
        <View style={{width: '95%',  margin: 5, 
            backgroundColor: COLORS.white, borderRadius: 10, paddingBottom: 25 }}>

            <View style={{margin: 8}}>
            <Text style={{...FONTS.h3, color: COLORS.black}}> Breeding Cycle</Text>
            <Text style={{...FONTS.h2, color: COLORS.blue}}> {statistics?.breedingCycle?.total || 0} </Text>  
            </View>

            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', marginLeft: 8}}>
            <View>        
                <Text style={{...FONTS.body4, color: COLORS.black}}> Animals in Breeding Cycle </Text> 
  
            </View>
           {
            statistics?.breedingCycle?.animals?.map((animal: any, index: number) => (
                <View key={index}>
                    <Text style={{...FONTS.body5, color: COLORS.black}}> {animal.identifier} - Expected {formatDate(animal.expectedDate)}</Text> 
                    <Progress.Bar progress={0.6} width={wp(85)} height={10}/>  
                </View>
            ))
           }
            </View>

        </View>
        <View  style={{height: 100}}/>
        </ScrollView>
    );
};

export default Index;


