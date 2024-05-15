import { useCallback, useState } from "react"
import { api } from "../../../services/api"
import { StudentProps, RootProps } from "../../../types/student"

export function useFindStudent() {

    const [students, setStudents] = useState<{ students: StudentProps[], page: number }>({ page: 1, students: [] })
    const [loading, setLoading] = useState<boolean>(false)

    const handleSetStudent = (student: StudentProps[]) => {
        setStudents(obj => { return { page: obj.page, students: [...obj.students, ...student]  } })
    }

    const handleNextPage = () => {
        setStudents(obj => {
            obj.page += 1
            return {...obj}
        })
    }

    const handleFindStudent = useCallback(async (): Promise<StudentProps[]> => {
        const response: RootProps = {
            results: []
        }
        setLoading(true)
        try {
            const { data } = await api<RootProps>({
                method: "get", url: "/", params: {
                    page: students.page,
                    results: 20,
                    exc: "login,location",
                    seed: "students"
                }
            })
            response.results = data.results
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return response.results
    }, [students.page])

    return {
        handleFindStudent,
        handleSetStudent,
        handleNextPage,
        students,
        loading
    }
}