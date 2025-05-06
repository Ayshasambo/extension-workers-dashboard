import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type NavMenuProps = {
  activeMenu: "Person" | "Pets";
  //activeMenu: "Person" | "Pets" | "Hospital";
  setActiveMenu: React.Dispatch<React.SetStateAction<"Person" | "Pets">>;
  farmerId: string;
};

const NavMenu: React.FC<NavMenuProps> = ({ activeMenu, setActiveMenu }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => setActiveMenu("Person")}>
        <Text style={activeMenu === "Person" ? styles.activeMenuItem : styles.menuItem}>Biodata</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveMenu("Pets")}>
        <Text style={activeMenu === "Pets" ? styles.activeMenuItem : styles.menuItem}>Livestock</Text>
      </TouchableOpacity>

      {/* Hospital menu */}
      {/* <TouchableOpacity onPress={() => setActiveMenu("Hospital")}>
        <Text style={activeMenu === "Hospital" ? styles.activeMenuItem : styles.menuItem}>Vaccination</Text>
      </TouchableOpacity> */}
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
    color: '#1D582C',  
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 5,
    padding:10
  },
});

export default NavMenu;


