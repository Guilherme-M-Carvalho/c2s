import { useCallback, useState } from "react"
import { api } from "../../../services/api"
import { Result, RootProps } from "../../../types/student"

export function useFindStudent() {

    const [students, setStudents] = useState<Result[]>([])

    const handleSetStudent = (student: Result[]) => {
        setStudents([...student])
    }

    const handleFindStudent = useCallback(async (): Promise<Result[]> => {
        const response: RootProps = {
            results: []
        }
        try {
            const { data } = await api<RootProps>({
                method: "get", url: "/", params: {
                    results: 20,
                    exc: "login,location"
                }
            })
            response.results = data.results
        } catch (error) {
            console.log(error);
        }
        return response.results
    }, [])

    return {
        handleFindStudent,
        handleSetStudent,
        students
    }
}