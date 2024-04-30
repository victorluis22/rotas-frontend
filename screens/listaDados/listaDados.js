import { View,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert, 
    TouchableOpacity,
    Text
} from "react-native";
    
import MenuRetornar from "../../components/menuretornar";
import { remove, get } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";

import EditModal from "../../components/editModal";
import DeleteModal from "../../components/deleteModal";

import { 
    RenderListaCliente, 
    RenderListaVeiculo,
    RenderListaResponsaveis,
    RenderListaTipoVeiculo,
    RenderListaTipoContrato,
    RenderListaJanelaTempo,
    RenderListaHorario,
    RenderListaPontosComp
} from "./renderListaDados";
import { exportClientXLSX } from "../../services/xlsx";
import { AuthContext } from "../../context/auth";

export const RenderLista = ({data, search, openModal, table }) => {
    switch(table){
        case "clientes":
            return <RenderListaCliente data={data} search={search} openModal={openModal}/>
        case "veiculos":
            return <RenderListaVeiculo data={data} search={search} openModal={openModal}/>
        case "responsaveis":
            return <RenderListaResponsaveis data={data} search={search} openModal={openModal}/>   
        case "tipoVeiculo":
            return <RenderListaTipoVeiculo data={data} search={search} openModal={openModal}/>
        case "tipoContrato":
            return <RenderListaTipoContrato data={data} search={search} openModal={openModal}/>
        case "janelaTempo":
            return <RenderListaJanelaTempo data={data} search={search} openModal={openModal}/>
        case "horarios":
            return <RenderListaHorario data={data} search={search} openModal={openModal}/>
        case "pontosCompostagem":
            return <RenderListaPontosComp data={data} search={search} openModal={openModal}/>
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
    const [modalTitle, setModalTitle] = useState("")
    const { user } = useContext(AuthContext)

    const fetchData = async () => {
        try {
            const response = await get(table)
            setData(response.data)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Erro ao se conectar ao servidor!")
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

    const navegarCadastro = () => {
        switch (table){
            case "clientes":
                navigation.navigate('CadastroCliente', {type: "create", data: {}});
                break;
            case "veiculos":
                navigation.navigate('CadastroVeiculo', {type: "create", data: {}});
                break;
            case "responsaveis":
                navigation.navigate('CadastroResponsaveis', {type: "create", data: {}});
                break;
            case "tipoVeiculo":
                navigation.navigate('CadastroTipoVeiculo', {type: "create", data:{}})
                break;
            case "tipoContrato":
                navigation.navigate('CadastroTipoContrato', {type: "create", data:{}})
                break;
            case "janelaTempo":
                navigation.navigate('CadastroJanelaTempo', {type: "create", data:{}})
                break;
            case "horarios":
                navigation.navigate('CadastroHorario', {type: "create", data:{}})
                break;
            case "pontosCompostagem":
                navigation.navigate('CadastroPontosCompostagem', {type: "create", data:{}})
                break;
        }
    }

    const handleXLSXExport = async () => {
        try{
            await exportClientXLSX(user.CodEmpresa)
        }
        catch (error) {
            console.log(error)
            Alert.alert("Erro", "Erro ao exportar dados de clientes.")
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
            <MenuRetornar options={[{ title: `${table.charAt(0).toUpperCase() + table.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1)}`, voltar: 'TelaInicial' }]} />

            <TextInput style={styles.caixadetexto}
                value={search}
                onChangeText={setSearch}
                placeholder="Digite o nome neste campo - Pesquisar"
            />

            {
                table === "clientes" ?
                    <TouchableOpacity onPress={() => handleXLSXExport()} style={styles.exportButton}>
                        <Text style={styles.buttonText}>Exportar Clientes</Text>
                    </TouchableOpacity>
                :
                null
            }

            <ScrollView>
                <RenderLista data={data} search={search} openModal={openEditModal} table={table} />
            </ScrollView>
            
            <Icon style={styles.iconeAdd} name="pluscircle" size={60} color={"#3C3C3C"} onPress={() => navegarCadastro()}></Icon>
            
            <EditModal modalVisible={editModalVisible} setModalVisible={setEditModalVisible} openDeleteModal={openDeleteModal} data={modalData} table={table} title={modalTitle}/>
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
    exportButton: {
        backgroundColor: "#7bc043",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        paddingVertical: 5,
        borderRadius: 7,
        marginVertical: 6,
        elevation: 10,
        width: "60%",
        shadowColor: '#3C3C3C'
    },
    buttonText:{
        color: "#fff",
        fontWeight: "bold"
    }
});