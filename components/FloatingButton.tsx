// import React from 'react';
// import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Link } from 'expo-router';

// interface FloatingButtonProps {
//   href: string;
//   icon?: keyof typeof MaterialIcons.glyphMap;
//   style?: ViewStyle;
// }

// const FloatingButton: React.FC<FloatingButtonProps> = ({
//   href,
//   icon = 'add',
//   style,
// }) => {
//   return (
//     <Link href={href} asChild>
//       <TouchableOpacity style={[styles.button, style]}>
//         <MaterialIcons name={icon} size={28} color="#fff" />
//       </TouchableOpacity>
//     </Link>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     position: 'absolute',
//     right: 20,
//     bottom: 30,
//     backgroundColor: '#36813A',
//     borderRadius: 30,
//     padding: 16,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
// });

// export default FloatingButton;
