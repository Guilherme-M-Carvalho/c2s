import { useState } from "react"
import { StudentProps } from "../../../types/student"
import { FilterProps, HandleChangeFilterProps } from "../types"

export function useSearch() {

    const [search, setSearch] = useState<string>("")

    const [filter, setFilter] = useState<FilterProps>({
        contains: true,
        gender: false,
        name: true,
        nasc: false,
        modal: false
    })

    const handleChangeFilter: HandleChangeFilterProps = (field) => {
        setFilter(obj => {
            obj[field] = !obj[field]
            return {...obj}
        })
    }

    const onChangeSearch = (val: string) => {
        setSearch(val)
    }

    const handleSearch = (students: StudentProps[]): StudentProps[] => {
        return students.filter(obj => {
            const name = `${obj.name.title} ${obj.name.first} ${obj.name.last}`
            const nasc = obj.dob.date
            if (!search) {
                return obj
            }
            if (filter.contains) {
                if (name.toUpperCase().includes(search.toUpperCase()) && filter.name) {
                    return obj
                }
                if (obj.gender.toUpperCase().includes(search.toUpperCase()) && filter.gender) {
                    return obj
                }
                if (nasc.toUpperCase().includes(search.toUpperCase()) && filter.nasc) {
                    return obj
                }
            } else {
                if (name.toUpperCase() == search.toUpperCase() && filter.name) {
                    return obj
                }
                if (obj.gender.toUpperCase() == search.toUpperCase() && filter.gender) {
                    return obj
                }
                if (nasc.toUpperCase() == search.toUpperCase() && filter.nasc) {
                    return obj
                }
            }
        })
    }

    return {
        search,
        filter,
        onChangeSearch,
        handleSearch,
        handleChangeFilter
    }
}