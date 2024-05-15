import { useContext } from "react"
import { StudentProps } from "../../../types/student"
import { StudentContext } from "../../../contexts/student.context"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamsList } from "../../../routes"
import { useNavigation } from "@react-navigation/native"

export function useNavigate(){

    const { handleSetStudent } = useContext(StudentContext)
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const handleNavigateStudent = (student: StudentProps) => {
        handleSetStudent(student)
        navigation.navigate("student")
    }

    return  {
        handleNavigateStudent
    }
}