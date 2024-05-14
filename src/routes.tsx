import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Home } from "./screens/home";

export type BottomNavigationParamsList = {
    home: undefined;
    ser: undefined
    cost: undefined
    report: undefined
}

const Tab = createBottomTabNavigator<BottomNavigationParamsList>();

export default function AppRoutes() {

    return (
        <Tab.Navigator 
        sceneContainerStyle={{
            backgroundColor: "#fafafa"
        }} screenOptions={{
            tabBarActiveTintColor: "#fff",
            headerShown: false,
            headerStyle: {
                backgroundColor: "#fafafa"
            },
            tabBarLabelStyle: {
                fontSize: 14,
            },
            tabBarIconStyle: {
                fontSize: 16
            },
            tabBarStyle: {
                backgroundColor: "#1c1b1f",
            }

        }} initialRouteName="home">
            <Tab.Screen options={{
                headerShown: true,
                tabBarIcon: ({ color, size }) => (<Entypo name="home" color={color} size={size} />),
                title: `InnovateTech`,
                tabBarLabel: "Home"
            }} name="home" component={Home} navigationKey="home" />

            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (<FontAwesome5 name="car" color={color} size={size} />),
                tabBarLabel: "Serviço",
            }} name="ser" component={Home} />

        </Tab.Navigator>
    )
}