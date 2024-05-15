import { useContext, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { StudentContext } from "../../contexts/student.context";
import { useIsFocused } from "@react-navigation/native";
import { SearchbarComponent } from "../../components/searchbar";
import { Avatar, Divider, Menu } from "react-native-paper";
import { IconButtonFilter } from "../../components/iconButtonFilter";
import { useFilter } from "./hooks/useFilter";
import { Legend } from "./components/legend";

export function Student() {
    const isFocused = useIsFocused();
    const { student, handleSetStudent } = useContext(StudentContext)
    const { search, handleChangeSearch, filter, handleChangeFilter, handleFilter } = useFilter()
    const { name, email, gender, address, id, nasc, nationality, phone } = handleFilter()

    useEffect(() => {

        return () => {
            handleSetStudent(null)
        }
    }, [isFocused])


    return <View style={{
        flex: 1
    }}>
        <View style={{
            padding: 16,
            paddingVertical: 40,
            backgroundColor: "#1B1C1F",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 100
        }}>
            <SearchbarComponent inputStyle={{
                color: "white"
            }} iconColor="white" rippleColor={"white"} placeholderTextColor={"white"} style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "white",
                flex: 1
            }} value={search} onChangeText={handleChangeSearch} />
            <Menu
                contentStyle={{
                    backgroundColor: "#fafafa"
                }}
                visible={filter.modal}
                onDismiss={() => handleChangeFilter("modal")}
                anchor={<IconButtonFilter iconColor="white" onPress={() => handleChangeFilter("modal")} icon={"filter-menu"} />}>
                <Menu.Item leadingIcon={!filter.name ? "close" : "check"} onPress={() => handleChangeFilter("name")} title="Nome" />
                <Menu.Item leadingIcon={!filter.email ? "close" : "check"} onPress={() => handleChangeFilter("email")} title="E-mail" />
                <Menu.Item leadingIcon={!filter.gender ? "close" : "check"} onPress={() => handleChangeFilter("gender")} title="Gênero" />
                <Menu.Item leadingIcon={!filter.nasc ? "close" : "check"} onPress={() => handleChangeFilter("nasc")} title="Data de nascimento" />
                <Menu.Item leadingIcon={!filter.phone ? "close" : "check"} onPress={() => handleChangeFilter("phone")} title="Telefone" />
                <Menu.Item leadingIcon={!filter.nationality ? "close" : "check"} onPress={() => handleChangeFilter("nationality")} title="Nacionalidade" />
                <Menu.Item leadingIcon={!filter.address ? "close" : "check"} onPress={() => handleChangeFilter("address")} title="Endereço" />
                <Menu.Item leadingIcon={!filter.id ? "close" : "check"} onPress={() => handleChangeFilter("id")} title="ID" />
                <Divider />
                <Menu.Item leadingIcon={filter.contains ? "close" : "check"} onPress={() => handleChangeFilter("contains")} title="Buscar por igual" />
            </Menu>
            <View style={{
                position: "absolute",
                bottom: -100,
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: 76,
                padding: 2
            }}>
                <Avatar.Image
                    size={150}
                    source={{ uri: student?.picture.large }}
                    style={{
                        backgroundColor: "#1B1C1F",
                    }}
                />
            </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#1B1C1F"
            }}>
                {student?.name.first}
            </Text>
        </View>
        <ScrollView style={{
            padding: 16
        }} >
            <View style={{flex: 1, flexDirection: "column", gap: 16}}>
                {name && <Legend title="Nome" description={String(`${student?.name.title} ${student?.name.first} ${student?.name.last}`)} />}
                {email && <Legend title="E-mail" description={String(`${student?.email}`)} />}
                {gender && <Legend title="Gênero" description={String(`${student?.gender}`)} />}
                {nasc && <Legend title="Data de nascimento" description={String(`${new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                }).format(new Date(String(student?.dob.date)))
                    }`)} />}
                {phone && <Legend title="Telefone" description={String(`${student?.phone}`)} />}
                {nationality && <Legend title="Nacionalidade" description={String(`${student?.nat}`)} />}
                {address && <Legend title="Endereço" description={String(`${student?.location.street.name}, ${student?.location.street.number}, ${student?.location.city} - ${student?.location.state} - ${student?.location.postcode}, ${student?.location.country}`)} />}
                {id && <Legend title="ID" description={String(`${student?.id.value}`)} />}
            </View>

        </ScrollView>
    </View>
}