import { useState } from "react"
import { Result } from "../../../types/student"

export function useSearch() {

    const [search, setSearch] = useState<string>("")

    const onChangeSearch = (val: string) => {
        setSearch(val)
    }

    const handleSearch = (students: Result[]): Result[] => {
        return students.filter(obj => {
            const name = `${obj.name.title} ${obj.name.first} ${obj.name.last}`
            const nasc = new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
            }).format(new Date(obj.dob.date))
            if (!search) {
                return obj
            }
            if (name.toUpperCase().includes(search.toUpperCase())) {
                return obj
            }
            if (obj.gender.toUpperCase().includes(search.toUpperCase())) {
                return obj
            }
            if (nasc.toUpperCase().includes(search.toUpperCase())) {
                return obj
            }


        })
    }

    return {
        search,
        onChangeSearch,
        handleSearch
    }
}