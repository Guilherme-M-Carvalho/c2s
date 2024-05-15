import { View } from "react-native";
import { Text } from "react-native-paper";

type LegendProps = {
    title: string;
    description: string
}

export function Legend({ title, description }: LegendProps) {
    return <View style={{flexDirection: "row", flex: 1, gap: 4}}>
        <Text style={{fontWeight: "600", color: "#1B1C1F"}}>
            {title}: 
        </Text>
        <Text style={{color: "#1B1C1F"}}>
            {description}
        </Text>
    </View>

}