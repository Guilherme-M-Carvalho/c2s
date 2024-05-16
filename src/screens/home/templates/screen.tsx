import { ScrollView, Text, View } from "react-native";
import { Avatar, Checkbox, Divider, List, Menu, Title } from "react-native-paper";
import { useFindStudent } from "../hooks/useFindStudent";
import { useContext, useEffect, useState } from "react";
import { SearchbarComponent } from "../../../components/searchbar";
import { useSearch } from "../hooks/useSearch";
import { ActivityIndicator } from "react-native-paper";
import { useNavigate } from "../hooks/useNavigate";
import { IconButtonFilter } from "../../../components/iconButtonFilter";
import { StudentContext } from "../../../contexts/student.context";

export function Screen() {

    const { handleFindStudents } = useContext(StudentContext)
    const { handleSetStudentBySql, handleFindStudent, handleSetStudent, students, loading, handleNextPage } = useFindStudent()
    const { onChangeSearch, search, handleSearch, filter, handleChangeFilter } = useSearch()
    const filterStudents = handleSearch(students.students)
    const { handleNavigateStudent } = useNavigate()
    const [cache, setCache] = useState<string>("")

    useEffect(() => {
        (async () => {
            if(students.page > 1){
                const students = await handleFindStudent()
                handleSetStudent(students)
                return
            }
            const cache = await handleFindStudents()
            if (!cache.length) {
                const students = await handleFindStudent()
                handleSetStudent(students)
            } else {
                handleSetStudentBySql(cache)
            }
        })()
    }, [handleFindStudent])

    return <View style={{
        flex: 1,
    }}>
        <View style={{
            padding: 16,
            paddingVertical: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16
        }}>
            <SearchbarComponent value={search} onChangeText={onChangeSearch} />
            <Menu
                contentStyle={{
                    backgroundColor: "#fafafa"
                }}
                visible={filter.modal}
                onDismiss={() => handleChangeFilter("modal")}
                anchor={<IconButtonFilter onPress={() => handleChangeFilter("modal")} icon={"filter-menu"} />}>
                <Menu.Item leadingIcon={!filter.name ? "close" : "check"} onPress={() => handleChangeFilter("name")} title="Nome" />
                <Menu.Item leadingIcon={!filter.gender ? "close" : "check"} onPress={() => handleChangeFilter("gender")} title="Gênero" />
                <Menu.Item leadingIcon={!filter.nasc ? "close" : "check"} onPress={() => handleChangeFilter("nasc")} title="Data de nascimento" />
                <Divider />
                <Menu.Item leadingIcon={filter.contains ? "close" : "check"} onPress={() => handleChangeFilter("contains")} title="Buscar por igual" />
            </Menu>

        </View>
        <Text>
            {cache}
        </Text>
        <ScrollView onScroll={(e) => {
            const compar = e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height
            if (Math.floor(e.nativeEvent.contentOffset.y) == Math.floor(compar) && !loading && !search) {
                handleNextPage()
            }
        }} style={{
            padding: 16,
            paddingVertical: 0,
            marginBottom: 8
        }}>
            <List.Section style={{
                gap: 16
            }}>
                {filterStudents.map((student, index) => (
                    <List.Item
                        onPress={() => handleNavigateStudent(student)}
                        key={index}
                        style={{
                            padding: 8,
                            paddingHorizontal: 16,
                            borderColor: "#1c1b1f",
                            borderWidth: 1
                        }}
                        title={`${student.name.title} ${student.name.first} ${student.name.last}`}
                        description={() =>
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end"
                            }}>
                                <Text>
                                    {student.gender}
                                </Text>
                                <Text>
                                    {
                                        student.dob.date
                                    }
                                </Text>
                            </View>
                        }
                        left={props =>
                            <Avatar.Image
                                size={50}
                                source={{ uri: student?.picture?.medium }}
                                style={{ backgroundColor: "#1B1C1F" }}
                            />
                        }
                    />)
                )}
            </List.Section>
            {loading &&
                <View style={{ paddingVertical: 32 }}>
                    <ActivityIndicator color="#1c1b1f" />
                </View>
            }
        </ScrollView>
    </View>
}