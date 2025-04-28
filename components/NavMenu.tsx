import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type NavMenuProps = {
  activeMenu: "Person" | "Pets" | "Hospital";
  setActiveMenu: React.Dispatch<React.SetStateAction<"Person" | "Pets" | "Hospital">>;
  farmerId: number;
};

const NavMenu: React.FC<NavMenuProps> = ({ activeMenu, setActiveMenu }) => {
  return (
    <View style={styles.menuContainer}>
      {/* Person menu */}
      <TouchableOpacity onPress={() => setActiveMenu("Person")}>
        <Text style={activeMenu === "Person" ? styles.activeMenuItem : styles.menuItem}>Biodata</Text>
      </TouchableOpacity>

      {/* Pets menu */}
      <TouchableOpacity onPress={() => setActiveMenu("Pets")}>
        <Text style={activeMenu === "Pets" ? styles.activeMenuItem : styles.menuItem}>Livestock</Text>
      </TouchableOpacity>

      {/* Hospital menu */}
      <TouchableOpacity onPress={() => setActiveMenu("Hospital")}>
        <Text style={activeMenu === "Hospital" ? styles.activeMenuItem : styles.menuItem}>Vaccination</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    backgroundColor: '#1D582C',
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    width:'80%'
  },
  menuItem: {
    fontSize: 18,
    color: 'white',
    padding:10
  },
  activeMenuItem: {
    fontSize: 18,
    color: '#1D582C',  // Color for active menu item
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 5,
    padding:10
  },
});

export default NavMenu;


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 16,
//     width: '100%',
//     backgroundColor: '#E6EFE6',
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   menuItem: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//   },
//   activeMenuItem: {
//     backgroundColor: '#36813A',
//   },
//   menuText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#36813A',
//   },
//   activeMenuText: {
//     color: 'white',
//   },
// });





// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// interface NavMenuProps {
//     activeMenu: string;
//     setActiveMenu: (menu: string) => void;
//     farmerId: number; 
// }

// const NavMenu: React.FC<NavMenuProps> = ({ activeMenu, setActiveMenu, farmerId }) => {
//     const router = useRouter();

//     return (
//         <View style={styles.navMenu}>
//             <TouchableOpacity
//                 onPress={() => {
//                     setActiveMenu("Person");
//                     router.push(`/farmers/details?id=${farmerId}`); 
//                 }}
//                 style={[styles.menuItem, activeMenu === "Person" && styles.activeMenuItem]}
//             >
//                 <MaterialIcons name="person" size={24} color={activeMenu === "Person" ? "#4CAF50" : "white"} />
//                 <Text style={[styles.menuText, activeMenu === "Person" && styles.activeMenuText]}>Biodata</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={() => {
//                     setActiveMenu("Pets");
//                     router.push(`/farmers/livestock?id=${farmerId}`);
//                 }}
//                 style={[styles.menuItem, activeMenu === "Pets" && styles.activeMenuItem]}
//             >
//                 <MaterialIcons name="pets" size={24} color={activeMenu === "Pets" ? "#4CAF50" : "white"} />
//                 <Text style={[styles.menuText, activeMenu === "Pets" && styles.activeMenuText]}>Livestock</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={() => {
//                     setActiveMenu("Hospital");
//                     router.push(`/farmers/vaccination?id=${farmerId}`);
//                 }}
//                 style={[styles.menuItem, activeMenu === "Hospital" && styles.activeMenuItem]}
//             >
//                 <MaterialIcons name="local-hospital" size={24} color={activeMenu === "Hospital" ? "#4CAF50" : "white"} />
//                 <Text style={[styles.menuText, activeMenu === "Hospital" && styles.activeMenuText]}>Vaccination</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     navMenu: {
//         flexDirection: "row",
//         backgroundColor: "#36813A",
//         padding: 10,
//         justifyContent: "space-around",
//         borderRadius: 15,
//         margin: 10,
//         width: "80%"
//     },
//     menuItem: {
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         borderRadius: 20,
//         alignItems: "center",
//         backgroundColor: "#36813A",
//         flexDirection: "column"
//     },
//     activeMenuItem: {
//         backgroundColor: "white",
//     },
//     menuText: {
//         color: "white",
//         fontWeight: "bold",
//     },
//     activeMenuText: {
//         color: "#5F6368",
//     },
// });

// export default NavMenu;