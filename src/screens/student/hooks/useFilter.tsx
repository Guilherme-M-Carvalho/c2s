import { useContext, useState } from "react"
import { FilterProps, HandleChangeFilterProps } from "../types"
import { StudentContext } from "../../../contexts/student.context"

export function useFilter() {

    const { student } = useContext(StudentContext)
    const [search, setSearch] = useState<string>("")
    const [filter, setFilter] = useState<FilterProps>({
        address: true,
        email: true,
        gender: true,
        id: true,
        name: true,
        nasc: true,
        nationality: true,
        phone: true,
        contains: true,
        modal: false
    })

    const handleChangeSearch = (str: string) => {
        setSearch(str)
    }

    const handleChangeFilter: HandleChangeFilterProps = (field) => {
        setFilter(obj => {
            obj[field] = !obj[field]
            return { ...obj }
        })
    }

    const handleFilter = () => {
        const visible = {
            address: true,
            email: true,
            gender: true,
            id: true,
            name: true,
            nasc: true,
            nationality: true,
            phone: true,
        }
        if (!search) {
            return { ...visible }
        }
        if (filter.name) {
            const name = `${student?.name.title} ${student?.name.first} ${student?.name.last}`
            visible.name = handleVerifyVisible(name)
        }
        if (filter.email) {
            visible.email = handleVerifyVisible(String(student?.email))
        }
        if (filter.gender) {
            visible.gender = handleVerifyVisible(String(student?.gender))
        }
        if (filter.nasc) {
            visible.nasc = handleVerifyVisible(new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
            }).format(new Date(String(student?.dob.date))))
        }
        if (filter.phone) {
            visible.phone = handleVerifyVisible(String(student?.phone))
        }
        if (filter.nationality) {
            visible.nationality = handleVerifyVisible(String(student?.nat))
        }
        if (filter.address) {
            const address = `${student?.location.street.name}, ${student?.location.street.number}, ${student?.location.city} - ${student?.location.state} - ${student?.location.postcode}, ${student?.location.country}`
            visible.address = handleVerifyVisible(address)
        }
        if (filter.id) {
            visible.id = handleVerifyVisible(String(student?.id.value))
        }
        return { ...visible }
    }

    const handleVerifyVisible = (name: string) => {
        if (filter.contains) {
            return name.toUpperCase().includes(search.toUpperCase())
        }
        return !!(name.toUpperCase() == search.toUpperCase())
    }

    return {
        handleFilter,
        handleChangeSearch,
        handleChangeFilter,
        filter,
        search
    }
}