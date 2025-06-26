import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { notifications } from '@/constants/dummy';
import { COLORS } from '../../../constants/theme';
import { useRouter } from 'expo-router';
import { useData } from '@/hooks/useData';
import moment from 'moment';
import { Link } from 'expo-router';


interface NotificationItem {
    _id: string;
    iconName: keyof typeof MaterialIcons.glyphMap;
    title: string;
    description: string;
    affectedPlaces: string[];
    type: string;
    severity: 'high' | 'moderate' | 'low';
    status: string;
    category:  string;
    updatedAt: string
}

export default function Notifications() {
    const router = useRouter();
    const { data, isLoading, error } = useData<NotificationItem[]>('/alerts');
    const getIconStyle = (severity: NotificationItem['severity']) => {
        switch (severity) {
            case 'high':
                return { backgroundColor: '#FFCCCC', iconColor: '#D32F2F' };
            case 'moderate':
                return { backgroundColor: '#FFF3E0', iconColor: '#FFA000' };
            case 'low':
                return { backgroundColor: '#DDEEDE', iconColor: '#388E3C' };
            default:
                return { backgroundColor: '#EDEDF0', iconColor: '#36813A' };
        }
    };

    const handleNavigate = (item: NotificationItem) => {
        router.push({
            pathname: '/(tabs)/notifications/details',
            params: {
                title: item.title,
                body: item.description,
                iconName: item.iconName,
                affectedPlaces: item.affectedPlaces,
                severity: item.severity,
                status: item.status,
                category: item.category,
                updatedAt: item.updatedAt

            },
        });
    };
    

    const renderItem: ListRenderItem<NotificationItem> = ({ item }) => {
        const { backgroundColor, iconColor } = getIconStyle(item.severity);

        return (
            <TouchableOpacity style={styles.resourceContainer} onPress={() => handleNavigate(item)}>
                <View style={[styles.leftIconContainer, { backgroundColor }]}>
                    <MaterialIcons name={item.type === "disease" ? "coronavirus" : "thunderstorm"} size={30} color={iconColor} />
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Disease Outbreak Alert</Text>
                    </View>

                    <View style={styles.subTitleContainer}>
                        <Text style={styles.subTitle} numberOfLines={1}>{item.description}</Text>
                    </View>

                    <View style={styles.characteristicsContainer}>
                        {item.affectedPlaces.map((area, index) => (
                            <View key={index} style={styles.characteristicsBox}>
                                <Text style={styles.characteristics} numberOfLines={2} ellipsizeMode="tail">{area}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.distanceIconContainer}>
                    <View style={styles.distanceItem}>
                        <MaterialIcons name="arrow-forward-ios" size={25} color="#5F6368" />
                        <Text style={styles.datetext}>{moment(item.updatedAt).format('MMMM Do YYYY')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <FlatList
                    data={data as NotificationItem[]}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={<Text>No Notifications available</Text>}
                />

         <Link href="/notifications/notificationmanager" asChild>
          <TouchableOpacity style={styles.floatingButton}>
            <MaterialIcons name="add" size={28} color="#fff" />
          </TouchableOpacity>
         </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginBottom:100
    },
    innerContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
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
        height: hp('12%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    leftIconContainer: {
        width: wp(10),
        height: hp(5),
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
        marginTop: 10,
    },
    titleContainer: {
        marginVertical: 1,
    },
    subTitleContainer: {
        marginVertical: 1,
    },
    characteristicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    characteristicsBox: {
        backgroundColor: '#EDEDF0',
        padding: 3,
        borderRadius: 99,
        marginRight: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3A3A44',
    },
    subTitle: {
        fontSize: 12,
        color: '#3A3A44',
    },
    characteristics: {
        fontSize: 12,
        color: '#666',
    },
    distanceIconContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    distanceItem: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    datetext: {
        fontSize: 12,
        color: COLORS.gray,
        marginTop: 15,
    },
    floatingButton: {
        position: 'absolute',
        bottom: hp('4%'),
        right: wp('5%'),
        backgroundColor: '#36813A',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});

// import React from 'react';
// import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { MaterialIcons } from '@expo/vector-icons';
// import { COLORS } from '../../../constants/theme';
// import { useRouter } from 'expo-router';
// import { useData } from '@/hooks/useData';

// interface NotificationItem {
//     id: number;
//     iconName: keyof typeof MaterialIcons.glyphMap;
//     title: string;
//     body: string;
//     affectedareas: string[];
//     date: string;
//     severity: 'High' | 'Medium' | 'Low';
//     lga: string;
//     state: string;
//     action: string
// }

// export default function Notifications() {
//     const router = useRouter();
//     const { data: notifications, isFetching, isError } = useData<NotificationItem[]>('/your/notifications/endpoint');

//     if (isFetching) {
//         return <Text>Loading...</Text>;
//     }
//     if (isError) {
//         return <Text>Failed to fetch notifications</Text>;
//     }
//     if (!notifications) {
//         return <Text>No notifications available</Text>;
//     }
  
//     const getIconStyle = (severity: NotificationItem['severity']) => {
//         switch (severity) {
//             case 'High':
//                 return { backgroundColor: '#FFCCCC', iconColor: '#D32F2F' };
//             case 'Medium':
//                 return { backgroundColor: '#FFF3E0', iconColor: '#FFA000' };
//             case 'Low':
//                 return { backgroundColor: '#DDEEDE', iconColor: '#388E3C' };
//             default:
//                 return { backgroundColor: '#EDEDF0', iconColor: '#36813A' };
//         }
//     };
  
//     const handleNavigate = (item: NotificationItem) => {
//         router.push({ pathname: "/(tabs)/notifications/details", params: { 
//             title: item.title,
//             body: item.body,
//             date: item.date,
//             iconName: item.iconName,
//             affectedAreas: item.affectedareas,
//             severity: item.severity,
//             state: item.state,
//             lga: item.lga,
//             action: item.action
//         } });
//     };
  
//     const renderItem: ListRenderItem<NotificationItem> = ({ item }) => {
//         const { backgroundColor, iconColor } = getIconStyle(item.severity);
  
//         return (
//             <TouchableOpacity style={styles.resourceContainer} onPress={() => handleNavigate(item)}>
//                 <View style={[styles.leftIconContainer, { backgroundColor }]}>
//                    <MaterialIcons name={item.iconName} size={30} color={iconColor} />
//                 </View>
//                 <View style={styles.textContainer}>
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.title}>{item.title}</Text>
//                     </View>

//                      <View style={styles.subTitleContainer}>
//                          <Text style={styles.subTitle} numberOfLines={1}>{item.body}</Text>
//                      </View>

//                      <View style={styles.characteristicsContainer}>
//                          {item.affectedareas.map((area, index) => (
//                              <View key={index} style={styles.characteristicsBox}>
//                                  <Text style={styles.characteristics} numberOfLines={2} ellipsizeMode="tail">{area}</Text>
//                              </View>
//                          ))}
//                      </View>
//                  </View>

//                  <View style={styles.distanceIconContainer}>
//                      <View style={styles.distanceItem}>
//                          <MaterialIcons name="arrow-forward-ios" size={25} color="#5F6368" />
//                          <Text style={styles.datetext}>{item.date}</Text>
//                      </View>
//                  </View>
//             </TouchableOpacity>
//         );
//     };
  
//     return (
//         <View style={styles.container}>
//             <View style={styles.innerContainer}>
//                 <FlatList
//                     data={notifications}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     ListEmptyComponent={<Text>No Notifications available</Text>}
//                 />
//             </View>
//         </View>
//     );
// }

// export default function Notifications() {
//     const router = useRouter();
//     const getIconStyle = (severity: NotificationItem['severity']) => {
//         switch (severity) {
//             case 'High':
//                 return { backgroundColor: '#FFCCCC', iconColor: '#D32F2F' };
//             case 'Medium':
//                 return { backgroundColor: '#FFF3E0', iconColor: '#FFA000' };
//             case 'Low':
//                 return { backgroundColor: '#DDEEDE', iconColor: '#388E3C' };
//             default:
//                 return { backgroundColor: '#EDEDF0', iconColor: '#36813A' };
//         }
//     };

//     const handleNavigate = (item: NotificationItem) => {
//         router.push({
//             pathname: '/(tabs)/notifications/details',
//             params: {
//                 title: item.title,
//                 body: item.body,
//                 date: item.date,
//                 iconName: item.iconName,
//                 affectedAreas: item.affectedareas,
//                 severity: item.severity,
//                 state: item.state,
//                 lga: item.lga,
//                 action: item.action
//             },
//         });
//     };
    

//     const renderItem: ListRenderItem<NotificationItem> = ({ item }) => {
//         const { backgroundColor, iconColor } = getIconStyle(item.severity);

//         return (
//             <TouchableOpacity style={styles.resourceContainer} onPress={() => handleNavigate(item)}>
//                 <View style={[styles.leftIconContainer, { backgroundColor }]}>
//                     <MaterialIcons name={item.iconName} size={30} color={iconColor} />
//                 </View>

//                 <View style={styles.textContainer}>
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.title}>{item.title}</Text>
//                     </View>

//                     <View style={styles.subTitleContainer}>
//                         <Text style={styles.subTitle} numberOfLines={1}>{item.body}</Text>
//                     </View>

//                     <View style={styles.characteristicsContainer}>
//                         {item.affectedareas.map((area, index) => (
//                             <View key={index} style={styles.characteristicsBox}>
//                                 <Text style={styles.characteristics} numberOfLines={2} ellipsizeMode="tail">{area}</Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>

//                 <View style={styles.distanceIconContainer}>
//                     <View style={styles.distanceItem}>
//                         <MaterialIcons name="arrow-forward-ios" size={25} color="#5F6368" />
//                         <Text style={styles.datetext}>{item.date}</Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.innerContainer}>
//                 <FlatList
//                     data={notifications as NotificationItem[]}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     ListEmptyComponent={<Text>No Notifications available</Text>}
//                 />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#FFFFFF',
//         flex: 1,
//     },
//     innerContainer: {
//         width: '100%',
//         alignSelf: 'center',
//         marginTop: 20,
//     },
//     resourceContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         marginHorizontal: 10,
//         backgroundColor: '#FFFFFF',
//         borderColor: '#F7F7FA',
//         borderRadius: 7,
//         padding: 15,
//         marginVertical: 5,
//         height: hp('10%'),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 2,
//     },
//     leftIconContainer: {
//         width: wp(10),
//         height: hp(5),
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         marginHorizontal: 10,
//     },
//     textContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         paddingLeft: 5,
//         marginTop: 10,
//     },
//     titleContainer: {
//         marginVertical: 1,
//     },
//     subTitleContainer: {
//         marginVertical: 1,
//     },
//     characteristicsContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     characteristicsBox: {
//         backgroundColor: '#EDEDF0',
//         padding: 5,
//         borderRadius: 99,
//         marginRight: 5,
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: '#3A3A44',
//     },
//     subTitle: {
//         fontSize: 12,
//         color: '#3A3A44',
//     },
//     characteristics: {
//         fontSize: 12,
//         color: '#666',
//     },
//     distanceIconContainer: {
//         flexDirection: 'row',
//         alignItems: 'flex-end',
//         justifyContent: 'space-between',
//         marginLeft: 10,
//     },
//     distanceItem: {
//         alignItems: 'flex-end',
//         justifyContent: 'space-between',
//         marginHorizontal: 5,
//     },
//     datetext: {
//         fontSize: 12,
//         color: COLORS.gray,
//         marginTop: 15,
//     },
// });
