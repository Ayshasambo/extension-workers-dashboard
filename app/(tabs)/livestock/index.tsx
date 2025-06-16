import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,FlatList,TextInput,TouchableOpacity,Modal,Pressable,Alert,ScrollView, Switch, ActivityIndicator} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useData } from '@/hooks/useData';
import { useDeleteLivestock } from '@/hooks/useDelete';
import { useUpdateById } from '@/hooks/useUpdate';
import AppButton from '@/components/AppButton';
import { COLORS } from '@/constants/theme';

interface animals {
  _id: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  healthStatus: string;
  farmer:string | { _id: string; fullName: string };
  identifier: string;
  vaccinationHistory: string[];
  isInBreedingCycle: boolean;
  expectedBreedingDate: string;
  isVaccinated: boolean;
  nextVaccinationDate: string;
  lastHealthCheckDate: string;
  healthIssues: string[];
  isAlive: boolean;
  region: string;
}

export default function LivestockList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: animals = [], isLoading} = useData<animals[]>('/animals');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<animals | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [healthIssuesText, setHealthIssuesText] = useState('');
  useEffect(() => {
    if (selectedAnimal?.healthIssues) {
      setHealthIssuesText(selectedAnimal.healthIssues.join(', '));
    }
  }, [selectedAnimal]);
  const [vaccinationHistory, setVaccinationHistory] = useState('');
  useEffect(() => {
    if (selectedAnimal?.vaccinationHistory) {
      setHealthIssuesText(selectedAnimal.vaccinationHistory.join(', '));
    }
  }, [selectedAnimal]);
  
  const { mutate: deleteLivestock, isPending } = useDeleteLivestock();
  //const { mutate: updateLivestock } = useUpdateById<animals>('animals');
  const updateLivestock = useUpdateById<animals>('animals');

//   const filteredData = animals.filter((animal) =>
//     animal.type.toLowerCase().includes(searchQuery.toLowerCase())
//   );
const filteredData = animals.filter((animal) => {
    const query = searchQuery.toLowerCase();
  
    const farmerName = typeof animal.farmer === 'string'
      ? animal.farmer
      : animal.farmer?.fullName || '';
  
    return (
      animal.type.toLowerCase().includes(query) ||
      animal.breed.toLowerCase().includes(query) ||
      farmerName.toLowerCase().includes(query)
    );
  });

  const openMenu = (item: animals) => {
    setSelectedAnimal(item);
    setMenuVisible(true);
  };

  const handleDetails = () => {
    setDetailsVisible(true);
    setMenuVisible(false);
  };

  const handleEdit = () => {
    setEditVisible(true);
    setMenuVisible(false);
  };

  const handleDelete = () => {
    if (!selectedAnimal) return;

    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${selectedAnimal.type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (selectedAnimal?._id) {
              deleteLivestock(selectedAnimal._id);
            }
          }
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: animals }) => (
    <View style={styles.resourceContainer}>
      <View style={styles.livestockCountContainer}>
        <Text style={styles.livestockCountText}>{item.type}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 8,  color:"#168543", fontWeight:800 }}>{typeof item?.farmer === 'string' ? item.farmer : item?.farmer?.fullName}</Text>
            <TouchableOpacity onPress={() => openMenu(item)}>
            <MaterialIcons name="more-vert" size={24} color="#168543" />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.livestockInfoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.healthStatus}</Text>
          <Text style={styles.infoLabel}>Health</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.breed}</Text>
          <Text style={styles.infoLabel}>Breed</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.weight}</Text>
          <Text style={styles.infoLabel}>Weight</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.age}</Text>
          <Text style={styles.infoLabel}>Age</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#5F6368" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search here"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#36813A" />
        ) : (

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text>No data available for this resource.</Text>}
        />
        )}

        <Link href="/livestock/livestockmanager" asChild>
          <TouchableOpacity style={styles.floatingButton}>
            <MaterialIcons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </Link>

        {/* Dropdown Menu */}
        <Modal transparent visible={menuVisible} animationType="fade">
          <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
            <View style={styles.menuBox}>
              <TouchableOpacity onPress={handleDetails} style={styles.menuItem}>
                <Text style={styles.menuText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEdit} style={styles.menuItem}>
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
                <Text style={styles.menuText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Details Modal */}
        <Modal transparent visible={detailsVisible} animationType="fade">
  <View style={styles.overlay}>
    <View style={styles.centeredModalBox}>
      <Text style={styles.modalTitle}>Livestock Details</Text>

      <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={true}>
      <Text style={styles.modalText}>Farmer: {typeof selectedAnimal?.farmer === 'string' ? selectedAnimal.farmer : selectedAnimal?.farmer?.fullName}</Text>
        <Text style={styles.modalText}>Type: {selectedAnimal?.type}</Text>
        <Text style={styles.modalText}>Breed: {selectedAnimal?.breed}</Text>
        <Text style={styles.modalText}>Age: {selectedAnimal?.age}</Text>
        <Text style={styles.modalText}>Weight: {selectedAnimal?.weight}</Text>
        <Text style={styles.modalText}>Health Status: {selectedAnimal?.healthStatus}</Text>
        <Text style={styles.modalText}>Region: {selectedAnimal?.region}</Text>
        <Text style={styles.modalText}>Vaccinated: {selectedAnimal?.isVaccinated ? 'Yes' : 'No'}</Text>
        <Text style={styles.modalText}>In Breeding Cycle: {selectedAnimal?.isInBreedingCycle ? 'Yes' : 'No'}</Text>
        <Text style={styles.modalText}>Expected Breeding Date: {selectedAnimal?.expectedBreedingDate}</Text>
        <Text style={styles.modalText}>Next Vaccination Date: {selectedAnimal?.nextVaccinationDate}</Text>
        <Text style={styles.modalText}>Last Health Check: {selectedAnimal?.lastHealthCheckDate}</Text>
        <Text style={styles.modalText}>Is Alive: {selectedAnimal?.isAlive ? 'Yes' : 'No'}</Text>

        <Text style={{ marginTop: 8 }}>Vaccination History:</Text>
        {selectedAnimal?.vaccinationHistory?.map((v, i) => (
          <Text key={i}>• {v}</Text>
        ))}

        <Text style={{ marginTop: 8 }}>Health Issues:</Text>
        {selectedAnimal?.healthIssues?.length ? (
          selectedAnimal.healthIssues.map((issue, idx) => (
            <Text key={idx}>• {issue}</Text>
          ))
        ) : (
          <Text>None</Text>
        )}
      </ScrollView>

      <TouchableOpacity onPress={() => setDetailsVisible(false)} style={styles.closeButton}>
        <Text style={{ color: 'white' }}>Close</Text>
      </TouchableOpacity>
      </View>
     </View>
    </Modal>

        {/* Edit Modal */}
        {/* <Modal transparent visible={editVisible} animationType="fade">
       <Pressable style={styles.overlay} onPress={() => setEditVisible(false)}>
       <View style={styles.centeredModalBox}>
      <Text style={styles.modalTitle}>Edit Livestock (Coming soon)</Text>
      <TouchableOpacity onPress={() => setEditVisible(false)} style={styles.closeButton}>
        <Text style={{ color: 'white' }}>Close</Text>
      </TouchableOpacity>
      </View>
      </Pressable>
      </Modal> */}
    <Modal visible={editVisible} animationType="slide" presentationStyle="fullScreen">
    <View style={{ flex: 1 }}>
    {/* X Close Icon */}
    <TouchableOpacity
      style={styles.modalCloseIcon}
      onPress={() => setEditVisible(false)}
    >
      <MaterialIcons name="close" size={28} color="#000" />
    </TouchableOpacity>

    <ScrollView contentContainerStyle={styles.editContainer}>
    <Text style={styles.modalTitle}>Edit Livestock</Text>

    <TextInput
      style={styles.input}
      placeholder="Type"
      value={selectedAnimal?.type}
      onChangeText={(text) =>
        setSelectedAnimal((prev) => prev ? { ...prev, type: text } : null)
      }
    />
    <TextInput
      style={styles.input}
      placeholder="Breed"
      value={selectedAnimal?.breed}
      onChangeText={(text) =>
        setSelectedAnimal((prev) => prev ? { ...prev, breed: text } : null)
      }
    />
    <TextInput
      style={styles.input}
      placeholder="Age"
      keyboardType="numeric"
      value={String(selectedAnimal?.age)}
      onChangeText={(text) =>
        setSelectedAnimal((prev) => prev ? { ...prev, age: parseInt(text) || 0 } : null)
      }
    />
    <TextInput
      style={styles.input}
      placeholder="Weight"
      keyboardType="numeric"
      value={String(selectedAnimal?.weight)}
      onChangeText={(text) =>
        setSelectedAnimal((prev) => prev ? { ...prev, weight: parseFloat(text) || 0 } : null)
      }
    />
    <TextInput
      style={styles.input}
      placeholder="Health Status"
      value={selectedAnimal?.healthStatus}
      onChangeText={(text) =>
        setSelectedAnimal((prev) => prev ? { ...prev, healthStatus: text } : null)
      }
    />
    <TextInput
      style={styles.input}
      placeholder="Region"
      value={selectedAnimal?.region}
      onChangeText={(text) =>
        setSelectedAnimal((prev) => prev ? { ...prev, region: text } : null)
      }
    />
    {/* <TextInput
      style={styles.input}
      placeholder="Vaccinated"
      value={selectedAnimal?.isVaccinated ? 'Yes' : 'No'}
      onChangeText={(text) =>
        setSelectedAnimal((prev) => prev ? { ...prev, vaccinated: text } : null)
      }
    /> */}

 <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
  <Text style={{ flex: 1, fontSize: 16 }}>Vaccinated</Text>
  <Switch
    value={selectedAnimal?.isVaccinated || false}
    onValueChange={(value) =>
      setSelectedAnimal((prev) =>
        prev ? { ...prev, isVaccinated: value } : null
      )
    }
    thumbColor={selectedAnimal?.isVaccinated ? '#4CAF50' : '#f4f3f4'}
    trackColor={{ false: '#767577', true: '#81b0ff' }}
  />
</View>

    {/* <TextInput
        style={styles.input}
        placeholder="In breeding cycle"
        value={selectedAnimal?.isInBreedingCycle ? 'Yes' : 'No'}
        onChangeText={(text) =>
            setSelectedAnimal((prev) => prev ? { ...prev, InBreedingCycle: text } : null)
        }
     /> */}

<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
  <Text style={{ flex: 1, fontSize: 16 }}>is livestock in breeding cycle</Text>
  <Switch
    value={selectedAnimal?.isInBreedingCycle || false}
    onValueChange={(value) =>
      setSelectedAnimal((prev) =>
        prev ? { ...prev, isInBreedingCycle: value } : null
      )
    }
    thumbColor={selectedAnimal?.isInBreedingCycle ? '#4CAF50' : '#f4f3f4'}
    trackColor={{ false: '#767577', true: '#81b0ff' }}
  />
</View>
     <TextInput
        style={styles.input}
        placeholder="Expected breeding date"
        value={selectedAnimal?.expectedBreedingDate}
        onChangeText={(text) =>
            setSelectedAnimal((prev) => prev ? { ...prev, expectedBreedingDate: text } : null)
        }
     />
     <TextInput
        style={styles.input}
        placeholder="Next vaccination date"
        value={selectedAnimal?.nextVaccinationDate}
        onChangeText={(text) =>
            setSelectedAnimal((prev) => prev ? { ...prev, nextVaccinationDate: text } : null)
        }
     />

     <TextInput
        style={styles.input}
        placeholder="Last Health Check"
        value={selectedAnimal?.lastHealthCheckDate}
        onChangeText={(text) =>
            setSelectedAnimal((prev) => prev ? { ...prev, lastHealthCheckDate: text } : null)
        } 
     />
     {/* <TextInput
        style={styles.input}
        placeholder="is livestock Alive"
        value={selectedAnimal?.isAlive ? 'Yes' : 'No'}
        onChangeText={(text) =>
            setSelectedAnimal((prev) => prev ? { ...prev, isLivestockAlive: text } : null)
        }
     /> */}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ flex: 1, fontSize: 16 }}>Is livestock alive</Text>
        <Switch
            value={selectedAnimal?.isAlive || false}
            onValueChange={(value) =>
            setSelectedAnimal((prev) =>
                prev ? { ...prev, isAlive: value } : null
            )
            }
            thumbColor={selectedAnimal?.isAlive ? '#4CAF50' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
        </View>
     {/* <TextInput
        style={styles.input}
        placeholder="Vaccination history (comma-separated)"
        value={selectedAnimal?.vaccinationHistory?.join(', ') || ''}
        onChangeText={(text) =>
            setSelectedAnimal((prev) =>
            prev ? { ...prev, vaccinationHistory: text.split(',').map((s) => s.trim()) } : null
            )
        }
     /> */}
     <TextInput
        style={styles.input}
        placeholder="vaccination hISTORY"
        value={vaccinationHistory}
        onChangeText={setVaccinationHistory}
     />
     {/* <TextInput
        style={styles.input}
        placeholder="Health issues (comma-separated)"
        value={selectedAnimal?.healthIssues?.join(', ') || ''}
        onChangeText={(text) =>
            setSelectedAnimal((prev) =>
            prev ? { ...prev, healthIssues: text.split(',').map((s) => s.trim()) } : null
            )
        }
     /> */}
     <TextInput
        style={styles.input}
        placeholder="Health issues (comma or sentence separated)"
        value={healthIssuesText}
        onChangeText={setHealthIssuesText}
     />
     
        
     <AppButton
        label={isPending ? 'Saving...'  : 'Update'}
        //onPress={handleSave}
        onPress={() => {
            if (selectedAnimal?._id) {
              updateLivestock.mutate(
                { 
                    id: selectedAnimal._id, 
                    data: {
                        ...selectedAnimal,
                    healthIssues: healthIssuesText
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                    vaccinationHistory: vaccinationHistory
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                    }
                 },
                {
                  onSuccess: () => {
                    setEditVisible(false);
                  },
                }
              );
            }
          }}
        backgroundColor={COLORS.primary}
        color="#fff"
      />
 
      {/* <TouchableOpacity
      style={styles.saveButton}
      onPress={() => {
        if (selectedAnimal?._id) {
          updateLivestock.mutate(
            { id: selectedAnimal._id, data: selectedAnimal },
            {
              onSuccess: () => {
                setEditVisible(false);
              },
            }
          );
        }
      }}
    > 
      <Text style={styles.saveButtonText}>Update</Text>
    </TouchableOpacity>  */}

    {/* <TouchableOpacity onPress={() => setEditVisible(false)} style={styles.closeButton}>
      <Text style={{ color: 'white' }}>Cancel</Text>
    </TouchableOpacity> */}
  </ScrollView>
  </View>
 </Modal>

 </View>
 </View>
 );
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#FFFFFF',
        flex:1,
        marginBottom: 50
    },
    innerContainer:{
       width: wp('100%'), 
       alignSelf:'center',
       marginTop:20,
       flex:1
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('90%'),
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
        height: hp('7%'),
    },
    searchIcon: {
        marginRight: 10, 
    },
    tuneIcon: {
        marginLeft: 10,  
    },
    resourceContainer: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#F7F7FA',
        borderRadius: 7,
        padding: 15,
        marginVertical: 5,
        marginBottom:10,
        height:hp('14%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        
    },
    livestockCountContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        //alignSelf: 'flex-start',
        marginBottom:5
    },
    livestockCountText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00796b',
        backgroundColor: '#EDEDF0',
        padding: 5,
        borderRadius: 20,
    },  
    livestockInfoContainer: {
        flexDirection: 'row',
        padding:6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        gap:20,
    },
    healthItemContainer: {
        alignItems: 'center',
      },
      
    healthItem: {
        borderWidth: 2,
        borderColor: '#168543', 
        borderRadius: 50, 
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      healthValue: {
        color: '#3498DB',
        fontWeight: 'light',
        fontSize:12
      },
    infoItem: {
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop:10,
      },
      
      infoValue: {
        fontSize: 18,
        fontWeight: 500,
        color: '#7F8C8D',
      },
      
      infoLabel: {
        fontSize: 12,
        color: '#7F8C8D',
        fontWeight: 400,
      },
      floatingButton: {
        position: 'absolute',
        bottom: hp('4%'), // Adjust as needed
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
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      overlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          menuBox: {
            backgroundColor: '#fff',
            borderRadius: 10,
            width: 220,
            paddingVertical: 10,
            elevation: 10,
          },
          menuItem: {
            paddingVertical: 12,
            paddingHorizontal: 20,
          },
          menuText: {
            fontSize: 16,
          },
          centeredModalBox: {
            width: '90%',
            maxHeight: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
          },
          modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 12,
          },
          modalText: {
            marginBottom: 6,
          },
          closeButton: {
            marginTop: 16,
            backgroundColor: '#168543',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          },
          editContainer: {
            flexGrow: 1,
            padding: 20,
            backgroundColor: 'white',
          },
          input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 15,
          },
          modalCloseIcon: {
            position: 'absolute',
            top: 15,
            right: 20,
            zIndex: 10,
            color:'red'
          },
          saveButton: {
            backgroundColor: '#168543',
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: 10,
          },
          saveButtonText: {
            color: 'white',
            fontWeight: 'bold',
          },
          
        });

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   innerContainer: { flex: 1, padding: wp('4%') },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0F0F0',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   searchIcon: { marginRight: 8 },
//   searchBar: { flex: 1, height: 40 },
//   resourceContainer: {
//     backgroundColor: '#F9F9F9',
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   livestockCountContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   livestockCountText: { fontSize: 16, fontWeight: 'bold', color: '#168543' },
//   livestockInfoContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
//   infoItem: { width: '45%' },
//   infoValue: { fontWeight: '600' },
//   infoLabel: { color: '#666' },
//   floatingButton: {
//     backgroundColor: '#168543',
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     borderRadius: 30,
//     padding: 15,
//     elevation: 5,
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   menuBox: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     width: 220,
//     paddingVertical: 10,
//     elevation: 10,
//   },
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   menuText: {
//     fontSize: 16,
//   },
//   modalContent: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   closeButton: {
//     marginTop: 20,
//     backgroundColor: '#168543',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
// });



// import React, { useState,  } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Link, useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialIcons} from '@expo/vector-icons';
// import { useData} from '../../../hooks/useData'; 

// interface animals{
//     _id: string;
//     type: string,
//     breed: string,
//     age: number,
//     weight: number,
//     healthStatus: string,
//     farmer: string,
//     identifier: string,
//   vaccinationHistory: [
//     string
//   ],
//   isInBreedingCycle: boolean,
//   expectedBreedingDate: string,
//   isVaccinated: boolean,
//   nextVaccinationDate: string,
//   lastHealthCheckDate: string,
//   healthIssues: [
//     string
//   ],
//   isAlive: boolean,
//   region: string
// }


// export default function LivestockList() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const { data:animals=[], isLoading, error } = useData<animals[]>('/animals')
//     const filteredData = animals.filter((animal) =>
//      animal.type.toLowerCase().includes(searchQuery.toLowerCase())
//   );

   
//     const renderItem = ({ item }: any) => (
//         <View style={styles.resourceContainer}>
//         <View style={styles.livestockCountContainer}>
//             <Text style={styles.livestockCountText}>
//                 {/* {item.count} {item.type} */}
//                 {item.type}
//             </Text>
//             <TouchableOpacity onPress={() => console.log("More options tapped")}>
//               <MaterialIcons name="more-vert" size={24} color="#168543" />
//             </TouchableOpacity> 
//         </View>

//         <View style={styles.livestockInfoContainer}>
//             <View style={styles.infoItem}>
//                 <Text style={styles.infoValue}>{item.healthStatus}</Text>
//                 <Text style={styles.infoLabel}>Health</Text>
//             </View> 
        
//             <View style={styles.infoItem}>
//                 <Text style={styles.infoValue}>{item.breed}</Text>
//                 <Text style={styles.infoLabel}>Breed</Text>
//             </View> 
//             <View style={styles.infoItem}>
//                 <Text style={styles.infoValue}>{item.weight}</Text>
//                 <Text style={styles.infoLabel}>Weight</Text>
//             </View>
//             <View style={styles.infoItem}>
//                 <Text style={styles.infoValue}>{item.age}</Text>
//                 <Text style={styles.infoLabel}>Age</Text>
//             </View>    
//         </View>   
//     </View>
//     );
 
//     return (
//         <View style={styles.container}>
//             <View style={styles.innerContainer}>
//                 <View style={styles.searchContainer}>
//                     <MaterialIcons name="search" size={24} color="#5F6368" style={styles.searchIcon} />
//                     <TextInput
//                         style={styles.searchBar}
//                         placeholder="Search here"
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                     /> 
//                 </View>
//                 <FlatList
//                     data={filteredData}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item._id}
//                     ListEmptyComponent={<Text>No data available for this resource.</Text>}
//                 />
//                 <Link href="/livestock/livestockmanager" asChild>
//                     <TouchableOpacity style={styles.floatingButton}>
//                         <MaterialIcons name="add" size={28} color="#fff" />
//                     </TouchableOpacity>
//                 </Link>

//             </View>
            
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         //backgroundColor: '#FFFFFF',
//         flex:1,
//         marginBottom: 50
//     },
//     innerContainer:{
//        width: wp('100%'), 
//        alignSelf:'center',
//        marginTop:20,
//        flex:1
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: wp('90%'),
//         alignSelf: 'center',
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: '#F7F7FA',
//         borderRadius: 7,
//         paddingHorizontal: 10, 
//         backgroundColor: '#FFFFFF',
//         borderTopWidth: 0,
//         shadowColor: '#5A5B6A', 
//         shadowOffset: {width: 0, height: 2},
//         shadowOpacity: 0.1, 
//         shadowRadius: 5, 
//         elevation: 5, 
//     },
//     searchBar: {
//         flex: 1, 
//         height: hp('7%'),
//     },
//     searchIcon: {
//         marginRight: 10, 
//     },
//     tuneIcon: {
//         marginLeft: 10,  
//     },
//     resourceContainer: {
//         flexDirection: 'column',
//         paddingHorizontal: 20,
//         marginHorizontal: 10,
//         backgroundColor: '#FFFFFF',
//         borderColor: '#F7F7FA',
//         borderRadius: 7,
//         padding: 15,
//         marginVertical: 5,
//         marginBottom:10,
//         height:hp('14%'),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 2,
        
//     },
//     livestockCountContainer: {
//         flexDirection:'row',
//         justifyContent:'space-between',
//         //alignSelf: 'flex-start',
//         marginBottom:5
//     },
//     livestockCountText: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         color: '#00796b',
//         backgroundColor: '#EDEDF0',
//         padding: 5,
//         borderRadius: 20,
//     },  
//     livestockInfoContainer: {
//         flexDirection: 'row',
//         padding:6,
//         borderRadius: 8,
//         alignSelf: 'flex-start',
//         gap:20,
//     },
//     healthItemContainer: {
//         alignItems: 'center',
//       },
      
//     healthItem: {
//         borderWidth: 2,
//         borderColor: '#168543', 
//         borderRadius: 50, 
//         width: 30,
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       healthValue: {
//         color: '#3498DB',
//         fontWeight: 'light',
//         fontSize:12
//       },
//     infoItem: {
//         alignItems: 'center',
//         marginHorizontal: 5,
//         marginTop:10,
//       },
      
//       infoValue: {
//         fontSize: 18,
//         fontWeight: 500,
//         color: '#7F8C8D',
//       },
      
//       infoLabel: {
//         fontSize: 12,
//         color: '#7F8C8D',
//         fontWeight: 400,
//       },
//       floatingButton: {
//         position: 'absolute',
//         bottom: hp('4%'), // Adjust as needed
//         right: wp('5%'),
//         backgroundColor: '#36813A',
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//       },
// });









