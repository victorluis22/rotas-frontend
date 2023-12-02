import { View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert } from "react-native";
    
import MenuRetornar from "../components/menuretornar";
import { remove, get } from "../services/api";
import { useEffect, useState } from "react";
import ListaCard from "../components/listaCard";
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import EditModal from "../components/editModal";
import DeleteModal from "../components/deleteModal";

export const RenderListaVeiculo = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Descricao.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {names ?
                names.map((eachName) => {
                    return (
                        <TouchableOpacity style={styles.button} key={eachName.CodVeic} onPress={() => openModal(eachName)}>
                            <ListaCard title={eachName.Descricao} description={`# ${eachName.CodVeic}`}/>
                        </TouchableOpacity>
                    )
                })
                :
                data.map((eachData) => {
                    return (
                        <TouchableOpacity style={styles.button} key={eachData.CodVeic} onPress={() => openModal(eachData)}>
                            <ListaCard title={eachData.Descricao} description={`# ${eachData.CodVeic}`}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaCliente = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Nome.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {names ?
                    names.map((eachName) => {
                        return (
                            <TouchableOpacity style={styles.button} key={eachName.CodCliente} onPress={() => openModal(eachName)}>
                                <ListaCard title={eachName.Nome} description={`# ${eachName.CodCliente}`}/>
                            </TouchableOpacity>
                        )
                    })
                    :
                    data.map((eachData) => {
                        return (
                            <TouchableOpacity style={styles.button} key={eachData.CodCliente} onPress={() => openModal(eachData)}>
                                <ListaCard title={eachData.Nome} description={`# ${eachData.CodCliente}`}/>
                            </TouchableOpacity>
                        )
                    })
                }
        </>
    )
}

export const RenderLista = ({data, search, openModal, table }) => {
    switch(table){
        case "clientes":
            return <RenderListaCliente data={data} search={search} openModal={openModal}/>
        case "veiculos":
            return <RenderListaVeiculo data={data} search={search} openModal={openModal}/>     
    }
}


export default function ListaDados({route}){
    const table = route.params.table

    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const navigation = useNavigation()
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [modalData, setModalData] = useState({})

    const fetchData = async () => {
        try {
            const response = await get(table)
            setData(response.data)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Ocorreu um erro ao pegar os dados, tente novamente.")
        }
    }
    const openEditModal = (data) => {
        setModalData(data)
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

    const navegarCadastro = () => {
        switch (table){
            case "clientes":
                navigation.navigate('CadastroCliente', {type: "create", data: {}});
                break
            case "veiculos":
                navigation.navigate('CadastroVeiculo', {type: "create", data: {}});
                break
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
            <MenuRetornar options={[{ title: `${table.charAt(0).toUpperCase() + table.slice(1)}`, voltar: 'TelaInicial' }]} />

            <TextInput style={styles.caixadetexto}
                value={search}
                onChangeText={setSearch}
                placeholder="Digite o nome neste campo - Pesquisar"
            />

            <ScrollView>
                <RenderLista data={data} search={search} openModal={openEditModal} table={table} />
            </ScrollView>
            
            <Icon style={styles.iconeAdd} name="pluscircle" size={60} color={"#3C3C3C"} onPress={navegarCadastro}></Icon>
            
            <EditModal modalVisible={editModalVisible} setModalVisible={setEditModalVisible} openDeleteModal={openDeleteModal} data={modalData} table={table}/>
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
    }
});