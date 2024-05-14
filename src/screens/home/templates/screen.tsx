import { ScrollView, Text, View } from "react-native";
import { Avatar, List, Title } from "react-native-paper";
import { useFindStudent } from "../hooks/useFindStudent";
import { useEffect } from "react";
import { SearchbarComponent } from "../../../components/searchbar";
import { useSearch } from "../hooks/useSearch";

export function Screen() {

    const { handleFindStudent, handleSetStudent, students } = useFindStudent()
    const { onChangeSearch, search, handleSearch } = useSearch()
    const filterStudents = handleSearch(students)

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
            padding: 16
        }}>
            <SearchbarComponent value={search} onChangeText={onChangeSearch} />
        </View>
        <ScrollView onScroll={(e) => {
            // console.log(e);
            const compar = e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height

            if (e.nativeEvent.contentOffset.y == compar) {
                console.log(e.nativeEvent.contentOffset.y);

            }
        }} style={{
            padding: 16
        }}>
            <List.Section style={{
                gap: 16
            }}>
                {filterStudents.map((student, index) => (
                    <List.Item
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
        </ScrollView>
    </View>
}