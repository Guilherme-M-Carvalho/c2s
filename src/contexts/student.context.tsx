import { ReactNode, createContext } from "react";
import { useStudent } from "../hooks/useStudent";
import { StudentProps } from "../types/student";

export const StudentContext = createContext({} as {
    handleSetStudent: (student: StudentProps | null) => void;
    student: StudentProps | null;
})

export function StudentProvider({children}: { children: ReactNode }){

    const student = useStudent()

    return <StudentContext.Provider value={{...student}}>
        {children}
    </StudentContext.Provider>
}