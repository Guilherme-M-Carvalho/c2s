import { useState } from "react"
import { StudentProps } from "../types/student"

export function useStudent() {

    const [student, setStudent] = useState<StudentProps | null>(null)

    const handleSetStudent = (student: StudentProps | null) => {
        setStudent(student)
    }

    return {
        handleSetStudent,
        student
    }
}