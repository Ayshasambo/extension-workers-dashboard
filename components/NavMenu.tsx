// NavMenu.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface NavMenuProps {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
    farmerId: number; // Pass the farmer ID to construct the routes
}

const NavMenu: React.FC<NavMenuProps> = ({ activeMenu, setActiveMenu, farmerId }) => {
    const router = useRouter();

    return (
        <View style={styles.navMenu}>
            <TouchableOpacity
                onPress={() => {
                    setActiveMenu("Person");
                    router.push(`/farmers/details?id=${farmerId}`); // Adjust the route as necessary
                }}
                style={[styles.menuItem, activeMenu === "Person" && styles.activeMenuItem]}
            >
                <MaterialIcons name="person" size={24} color={activeMenu === "Person" ? "#4CAF50" : "white"} />
                <Text style={[styles.menuText, activeMenu === "Person" && styles.activeMenuText]}>Biodata</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setActiveMenu("Pets");
                    router.push(`/farmers/livestock?id=${farmerId}`);
                }}
                style={[styles.menuItem, activeMenu === "Pets" && styles.activeMenuItem]}
            >
                <MaterialIcons name="pets" size={24} color={activeMenu === "Pets" ? "#4CAF50" : "white"} />
                <Text style={[styles.menuText, activeMenu === "Pets" && styles.activeMenuText]}>Livestock</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setActiveMenu("Hospital");
                    router.push(`/farmers/vaccination?id=${farmerId}`);
                }}
                style={[styles.menuItem, activeMenu === "Hospital" && styles.activeMenuItem]}
            >
                <MaterialIcons name="local-hospital" size={24} color={activeMenu === "Hospital" ? "#4CAF50" : "white"} />
                <Text style={[styles.menuText, activeMenu === "Hospital" && styles.activeMenuText]}>Vaccination</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navMenu: {
        flexDirection: "row",
        backgroundColor: "#36813A",
        padding: 10,
        justifyContent: "space-around",
        borderRadius: 15,
        margin: 10,
        width: "80%"
    },
    menuItem: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#36813A",
        flexDirection: "column"
    },
    activeMenuItem: {
        backgroundColor: "white",
    },
    menuText: {
        color: "white",
        fontWeight: "bold",
    },
    activeMenuText: {
        color: "#5F6368",
    },
});

export default NavMenu;