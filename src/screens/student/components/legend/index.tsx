import { View, Text } from "react-native";

type LegendProps = {
    title: string;
    description: string
}

export function Legend({ title, description }: LegendProps) {
    return <View style={{flexDirection: "row",  gap: 4, height: "auto"}}>
        <Text style={{fontWeight: "600", color: "#1B1C1F", lineHeight: 16}}>
            {title}: 
        </Text>
        <Text style={{color: "#1B1C1F", overflow: "hidden", lineHeight: 16}}>
            {description}
        </Text>
    </View>

}