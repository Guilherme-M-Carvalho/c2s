import { Image, View } from "react-native";

export function Splash() {
    return <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }}>
        <View style={{
            width: "50%",
            height: "auto", 
            aspectRatio: "1/1"
        }}>
            <Image style={{ width: "100%", objectFit: "cover", height: "100%" }} source={
                require("../../../assets/splash.png")
            } />
        </View>
    </View>
}