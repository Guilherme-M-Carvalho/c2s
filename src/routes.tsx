import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from "./screens/home";
import { Student } from './screens/student';
import { Icon } from 'react-native-paper';
import { useContext } from 'react';
import { StudentContext } from './contexts/student.context';

export type BottomNavigationParamsList = {
    home: undefined;
    ser: undefined
    cost: undefined
    report: undefined
}

const Tab = createBottomTabNavigator<BottomNavigationParamsList>();

export default function AppRoutes() {

    const { student } = useContext(StudentContext)

    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: "#fafafa",
            }}
            screenOptions={(props) => {
                return {
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
                        display: student ? "none" : "flex",
                        backgroundColor: "#1c1b1f",
                    }
                }
            }} initialRouteName="home">
            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (<Icon source={"home"} color={color} size={size} />),
                title: `InnovateTech`,
                tabBarLabel: "Home",
                tabBarShowLabel: false
            }} name="home" component={HomeRoutes} navigationKey="home" />
        </Tab.Navigator>
    )
}




export type StackParamsList = {
    homepage: undefined
    student: undefined
}

const Stack = createNativeStackNavigator<StackParamsList>();

function HomeRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#fafafa",
                },
                contentStyle: {
                    borderWidth: 0,
                    backgroundColor: "#fafafa"
                }
            }}
        >
            <Stack.Screen

                name="homepage"
                options={{
                    headerTitle: "InnovateTech",
                    headerTitleAlign: "center",
                }} component={Home} />
            <Stack.Screen name="student"
                options={{
                    headerStyle: {
                        backgroundColor: "#1B1C1F",
                    },
                    headerTintColor: "white",
                    headerTitle: "InnovateTech",
                    headerTitleAlign: "center",
                }}
                component={Student} />
        </Stack.Navigator>
    );
}