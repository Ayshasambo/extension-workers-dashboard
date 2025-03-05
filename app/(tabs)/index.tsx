import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Index = () => {
    //const { id } = useLocalSearchParams(); // Get farmer ID from URL

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Extension Workers Dashboard</Text>
        </View>
    );
};

export default Index;


// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, TextInput,
//    FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
// import MapView, { MapStyleElement, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import * as Location from 'expo-location';
// import { waterbodies } from '@/constants/dummy'; 
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { COLORS, FONTS } from '@/constants/theme';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import Ionicons from '@expo/vector-icons/Ionicons';

// const customMapStyle: MapStyleElement[] = [
//   {
//     featureType: 'poi',
//     elementType: 'labels',
//     stylers: [{ visibility: 'off' }],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels.icon',
//     stylers: [{ visibility: 'off' }],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels',
//     stylers: [{ visibility: 'on' }],
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'labels',
//     stylers: [{ visibility: 'on' }],
//   },
// ];

// interface WaterBody {
//   id: number;
//   title: string;
//   latitude: string;
//   longitude: string;    
//   category: string;
//   waterquality: string;
//   community: string;
//   lga: string;
//   state: string;
//   lasttesteddate: string;
// }

// export default function HomeScreen() {
//   const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [selectedWaterbody, setSelectedWaterbody] = useState<WaterBody | null>(null);
//   const [searchText, setSearchText] = useState('');
//   const [filteredWaterbodies, setFilteredWaterbodies] = useState<WaterBody[]>([]);
  
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const mapRef = useRef<MapView>(null);  // Ref for MapView
  
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       setLocation(currentLocation.coords);
//     })();
//   }, []);

//   const handleMarkerPress = (waterbody: WaterBody) => {
//     setSelectedWaterbody(waterbody);
//     bottomSheetRef.current?.expand();
//   };

//   const renderBottomSheetContent = () => {
//     if (!selectedWaterbody) return null;
//     return (
//       <BottomSheetView style={styles.bottomSheetContent}>
//         {renderWaterBodyContent()} 
//       </BottomSheetView>
//     );
//   };

//   const renderWaterBodyContent = () => (
//     <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
//       <View style={styles.bottomSheetHeader}>
//         <View style={{ flex: 1, marginLeft: 7 }}>
//           <Text style={styles.bottomSheetTitle}>{selectedWaterbody?.title}</Text>
//         </View>
//         <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
//           <Text style={styles.bottomSheetClose}>X</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const handleSearch = (text: string) => {
//     setSearchText(text);
//     if (text) {
//       const results = waterbodies.filter((item) =>
//         item.title.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredWaterbodies(results);
//     } else {
//       setFilteredWaterbodies([]);
//     }
//   };

//   const handleSuggestionPress = (waterbody: WaterBody) => {
//     const region = {
//       latitude: parseFloat(waterbody.latitude),
//       longitude: parseFloat(waterbody.longitude),
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     };
//     mapRef.current?.animateToRegion(region, 1000); 
//     setFilteredWaterbodies([]);
//     setSearchText(waterbody.title);
//   };

//   if (!location) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading map...</Text>
//       </View>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//         <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           ref={mapRef}  // Attach ref to MapView
//           style={styles.map}
//           showsUserLocation={true}
//           //followsUserLocation={true}
//           customMapStyle={customMapStyle}
//           // initialRegion={{
//           //   latitude: location.latitude,
//           //   longitude: location.longitude,
//           //   latitudeDelta: 0.01,
//           //   longitudeDelta: 0.01,
//           // }}
//         >
//           {waterbodies.map((waterbody) => (
//             <Marker
//               key={waterbody.id}
//               coordinate={{
//                 latitude: parseFloat(waterbody.latitude),
//                 longitude: parseFloat(waterbody.longitude),
//               }}
//               title={waterbody.title}
//               image={require('../../assets/icons/markers/water-marker.png')}
//               onPress={() => handleMarkerPress(waterbody)}
//             />
//           ))}

//           {/* {abbatoir.map((abbatoir) => (
//             <Marker
//               key={abbatoir.id}
//               coordinate={{
//                 latitude: parseFloat(abbatoir.latitude),
//                 longitude: parseFloat(abbatoir.longitude),
//               }}
//               title={abbatoir.title}
//               image={require('../../assets/icons/markers/abbatoir-marker.png')}
//               onPress={() => handleMarkerPress(abbatoir)}
//             />
//           ))} */}
//         </MapView>

//         <View style={styles.searchContainer}>
//         <Ionicons name="search" size={24} color="black" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search.."
//             value={searchText}
//             onChangeText={handleSearch}
//           />
//            <TouchableOpacity>
//            <Ionicons name="options" size={24} color="black" />
//           </TouchableOpacity>
//           {filteredWaterbodies.length > 0 && (
//             <FlatList
//               data={filteredWaterbodies}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
//                   <Text style={styles.suggestionText}>{item.title}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsContainer}
//             />
//           )}
//         </View>

//         <BottomSheet
//           ref={bottomSheetRef}
//           index={-1}
//           snapPoints={['25%', '50%', '75%']}
//           enablePanDownToClose={true}
//           onClose={() => setSelectedWaterbody(null)}
//         >
//           {renderBottomSheetContent()}
//         </BottomSheet>
//       </View>
//       </KeyboardAvoidingView>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   map: { width: '100%', height: '100%' },
//   searchContainer: {
//     position: 'absolute',
//     top: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     elevation: 3,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//   },
//   suggestionsContainer: {
//     position: 'absolute',
//     top: 50, 
//     width: '100%',
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     elevation: 3,
//     maxHeight: 200,
//     zIndex: 1, 
//   },
//   suggestionItem: { padding: 10, borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
//   suggestionText: { fontSize: 16 },
//   bottomSheetContent: { flex: 1, alignItems: 'center', padding: 16 },
//   bottomSheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: COLORS.primary, width: wp(95), height: hp(7), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
//   bottomSheetTitle: { ...FONTS.body4, marginRight: 10, color: 'white' },
//   bottomSheetClose: { ...FONTS.body4, color: 'white' },
// });
