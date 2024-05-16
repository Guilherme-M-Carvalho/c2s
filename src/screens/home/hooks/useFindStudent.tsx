import { useCallback, useContext, useState } from "react"
import { api } from "../../../services/api"
import { StudentProps, RootProps } from "../../../types/student"
import { StudentContext } from "../../../contexts/student.context"
import { StudentsSQL } from "../../../hooks/useSqlLite"

export function useFindStudent() {

    const [students, setStudents] = useState<{ students: StudentProps[], page: number }>({ page: 1, students: [] })
    const { handleInsertStudents } = useContext(StudentContext)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSetStudent = (student: StudentProps[]) => {
        setStudents(obj => { return { page: obj.page, students: [...obj.students, ...student] } })
    }

    const handleSetStudentBySql = (student: StudentsSQL) => {
        const std: StudentProps[] = student.map(item => {

            const line: StudentProps = {
                cell: "",
                dob: {
                    age: 0,
                    date: item.nasc
                },
                email: item.email,
                gender: item.gender,
                id: {
                    name: "",
                    value: item.id
                },
                location: {
                    city: item.city,
                    coordinates: {
                        latitude:'',
                        longitude: ''
                    },
                    country: item.country,
                    postcode: item.postcode,
                    state: item.state,
                    street: {
                        name: item.street_name,
                        number: item.street_number,
                    },
                    timezone: {
                        description:"",
                        offset: ""
                    }
                },
                name: {
                    first: item.first,
                    last: item.last,
                    title: item.title
                },
                nat: item.nationality,
                phone: item.phone,
                picture: {
                    large: item.image_large,
                    medium: item.image_medium,
                    thumbnail: ""
                }
            }

            return {
                ...line
            }
        })

        setStudents(obj => {
            return {
                ...obj,
                students: std
            }
        })
    }

    const handleNextPage = () => {
        setStudents(obj => {
            obj.page += 1
            return { ...obj }
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
                    exc: "login",
                    seed: "students"
                }
            })
            response.results = data.results.map(el => {
                el.dob.date = new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                }).format(new Date(el.dob.date))
                return {
                    ...el,

                }
            })
            if (students.page === 1) {
                await handleInsertStudents(data.results)
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return response.results
    }, [students.page])

    return {
        handleSetStudentBySql,
        handleFindStudent,
        handleSetStudent,
        handleNextPage,
        students,
        loading
    }
}