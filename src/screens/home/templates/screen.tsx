import { ScrollView, Text, View } from "react-native";
import { Avatar, Checkbox, Divider, List, Menu, Title } from "react-native-paper";
import { useFindStudent } from "../hooks/useFindStudent";
import { useEffect } from "react";
import { SearchbarComponent } from "../../../components/searchbar";
import { useSearch } from "../hooks/useSearch";
import { ActivityIndicator } from "react-native-paper";
import { useNavigate } from "../hooks/useNavigate";
import { IconButtonFilter } from "../../../components/iconButtonFilter";

export function Screen() {

    const { handleFindStudent, handleSetStudent, students, loading, handleNextPage } = useFindStudent()
    const { onChangeSearch, search, handleSearch, filter, handleChangeFilter } = useSearch()
    const filterStudents = handleSearch(students.students)
    const { handleNavigateStudent } = useNavigate()

    useEffect(() => {
        (async () => {
            const students = await handleFindStudent()
            handleSetStudent(students)
        })()
    }, [handleFindStudent])

    return <View style={{
        flex: 1,
    }}>
        <View style={{
            padding: 16,
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
        <ScrollView onScroll={(e) => {
            const compar = e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height
            if (e.nativeEvent.contentOffset.y == compar && !loading && !search) {
                handleNextPage()
            }
        }} style={{
            padding: 16
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
                                    {new Intl.DateTimeFormat('pt-BR', {
                                        dateStyle: 'short',
                                    }).format(new Date(student.dob.date))}
                                </Text>
                            </View>
                        }
                        left={props =>
                            <Avatar.Image
                                size={50}
                                source={{ uri: student.picture.medium }}
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