import React, { forwardRef, useMemo } from 'react';
import { COLORS } from '../constants/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { TouchableOpacity, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface MyBottomSheetProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const MyBottomSheet = forwardRef<BottomSheet, MyBottomSheetProps>(({ children, onClose }, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%', '98%'], []);

  const handleCloseSheet = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.close();
    }
    if (onClose) {
      onClose(); 
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff', height: 5, width: 80 }}
      backgroundStyle={{ backgroundColor: COLORS.white }}
    >
      <View style={{ flexDirection: 'row', 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        justifyContent: 'space-between', marginBottom: 10, width: '95%' }}>
        <View style={{ marginLeft: 10 }} />

        <TouchableOpacity>
          <AntDesign name="closecircle" size={24} color="black" onPress={handleCloseSheet} />
        </TouchableOpacity>
      </View>

      {children}
    </BottomSheet>
    </GestureHandlerRootView>
  );
});

export default MyBottomSheet;
