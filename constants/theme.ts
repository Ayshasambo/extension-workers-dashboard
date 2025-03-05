import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { scale } from 'react-native-size-matters'

export const COLORS = {
    primary: "#2A652D",
    secondary: "#A8CF45", 
    yellow: "#EAF214",
    text: "#f2f2f2",
    white: "#fff",
    black: "#000000",
    green: "#37E39F",
    red: "#822727",
    gray: "#6A6A6A",
    lightGray: "#dbdbdb",
    lightGray1: "#f5f6fa",
    darkGray: "#2D3748"
};
export const SIZES = {
    // global sizes
    base: scale(8),
    font: scale(14),
    radius: scale(12),
    padding: scale(24),

    // font sizes
    h1: scale(38),
    h2: scale(28),
    h3: scale(20),
    h4: scale(14),
    h5: scale(10),
    body1: scale(30),
    body2: scale(22),
    body3: scale(16),
    body4: scale(14),
    body5: scale(12),
    body6: scale(10),

    // app dimensions
    width,
    height
};
export const FONTS = {
    h1: { fontFamily: "Poppins-Bold", fontSize: SIZES.h1, lineHeight: scale(44), },
    h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2, lineHeight: scale(32), },
    h3: { fontFamily: "Poppins-Bold", fontSize: SIZES.h3, lineHeight: scale(22), },
    h4: { fontFamily: "Poppins-Bold", fontSize: SIZES.h4, lineHeight: scale(20), },
    h5: { fontFamily: "Poppins-Bold", fontSize: SIZES.h5, lineHeight: scale(12), },
    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, lineHeight: scale(36)},
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, lineHeight: scale(30) },
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, lineHeight: scale(22) },
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, lineHeight: scale(22) },
    body5: { fontFamily: "Poppins-Regular", fontSize: SIZES.body5, lineHeight: scale(20) },
    body6: { fontFamily: "Poppins-Regular", fontSize: SIZES.body6, lineHeight: scale(22) },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
