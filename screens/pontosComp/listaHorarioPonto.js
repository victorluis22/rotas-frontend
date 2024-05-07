import { View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Text,
    Alert } from "react-native";
    
import MenuRetornar from "../../components/menuretornar";
import { remove, getHorarioPonto } from "../../services/api";
import { useEffect, useState } from "react";
import ListaCard from "../../components/listaCard";
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import EditModal from "../../components/editModal";
import DeleteModal from "../../components/deleteModal";

export const RenderLista = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => `${eachData.DiaSemana}: ${eachData.HoraIni} - ${eachData.HoraFim}`.toLowerCase().includes(searchLowerCase));
    
    const sortedData = names.sort((a,b) => {
        const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        return diasDaSemana.indexOf(a.DiaSemana.toLowerCase()) - diasDaSemana.indexOf(b.DiaSemana.toLowerCase());
    });

    return (
        <>
            {
                sortedData.map((eachName) => {
                    const key = eachName.CodHD
                    const title = `${eachName.DiaSemana}: ${eachName.HoraIni} - ${eachName.HoraFim}`;
                    const description = "";
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export default function ListaHorarioPonto({route}){
    const table = route.params.table
    const codPonto = route.params.codPonto
    const pointName = route.params.pointName

    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    
    const navigation = useNavigation()
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [modalData, setModalData] = useState({})
    const [modalTitle, setModalTitle] = useState("")

    const fetchData = async () => {
        try {
            const response = await getHorarioPonto(table, codPonto)
            setData(response.data)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Ocorreu um erro ao pegar os dados, tente novamente.")
        }
    }

    const openEditModal = (data, title) => {
        setModalData(data)
        setModalTitle(title)
        setEditModalVisible(!editModalVisible)
    }

    const openDeleteModal = () => {
        setDeleteModalVisible(!deleteModalVisible)
    }

    const deleteData = async (id) => {
        try{
            await remove(table, id)
            setEditModalVisible(!editModalVisible)
            setDeleteModalVisible(!deleteModalVisible)
            await fetchData()
            Alert.alert("Sucesso", "Dado deletado com sucesso!")
        }
        catch (error) {
            console.log(error)
            Alert.alert("Erro", "Erro ao deletar dado.")
        }
    }

    useEffect(() => {
        // Evita renderizar dados antigos quando voltando para trás na navigation stack
        navigation.addListener('focus', () => {
            fetchData()
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: `Horário Ponto`, voltar: 'ListaDados', table: "pontosCompostagem" }]} />

            <Text style={styles.Point}>Nome do Ponto: {pointName}</Text>

            <ScrollView>
                <RenderLista data={data} search={search} openModal={openEditModal} table={table} />
            </ScrollView>
            
            <Icon style={styles.iconeAdd} name="pluscircle" size={60} color={"#3C3C3C"} onPress={() => navigation.navigate("CadastroHorarioPonto", {previousData: {}, codPonto: codPonto})}></Icon>
            
            <EditModal modalVisible={editModalVisible} setModalVisible={setEditModalVisible} openDeleteModal={openDeleteModal} data={modalData} table={table} title={modalTitle} codPonto={codPonto}/>
            <DeleteModal modalVisible={deleteModalVisible} setModalVisible={setDeleteModalVisible} data={modalData} deleteFunction={deleteData} table={table}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
    },

    iconeAdd: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    caixadetexto: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: 35,
        alignSelf: 'center',
        margin: 20,
        paddingLeft:15,
    },
    button: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    Point: {
        padding: 20,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold"
    }
});