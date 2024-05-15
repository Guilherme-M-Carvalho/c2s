import { ReactNode, createContext, useEffect } from "react";
import { useStudent } from "../hooks/useStudent";
import { StudentProps } from "../types/student";
import { useSqlLite } from "../hooks/useSqlLite";

export const StudentContext = createContext({} as {
    handleSetStudent: (student: StudentProps | null) => void;
    student: StudentProps | null;
    handleFindStudents: () => Promise<unknown[]>;
    handleCreateTableStudents: () => Promise<void>;
    handleInsertStudents: (students: StudentProps[]) => Promise<void>;
})

export function StudentProvider({children}: { children: ReactNode }){

    const student = useStudent()
    const sqlite = useSqlLite()

    useEffect(() => {
        sqlite.handleCreateTableStudents()
    },[])

    return <StudentContext.Provider value={{...student, ...sqlite}}>
        {children}
    </StudentContext.Provider>
}