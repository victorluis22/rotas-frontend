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

export const RenderListaCliente = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Nome.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodCliente
                    const title = eachName.Nome
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description} type="cliente" codCliente={key}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaVeiculo = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Descricao.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodVeic
                    const title = eachName.Descricao
                    const description = `# ${key}`
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

export const RenderListaResponsaveis = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Nome.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodResp
                    const title = eachName.Nome
                    const description = `# ${key}`
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

export const RenderListaTipoVeiculo = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.DescTipo.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodTipoVeic
                    const title = eachName.DescTipo
                    const description = `# ${key}`
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

export const RenderListaTipoContrato = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Periodicidade.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodTipoContrato
                    const title = `${eachName.Periodicidade} - R$${eachName.ValorMensal}`
                    const description = `# ${key}`
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

export const RenderListaJanelaTempo = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => `${eachData.HoraIni} - ${eachData.HoraFim}`.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodTurno
                    const title = `${eachName.HoraIni.slice(0,-3)} - ${eachName.HoraFim.slice(0,-3)}`
                    const description = `# ${key}`
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

export const RenderListaHorario = ({data, search, openModal}) => {
    const [janelaTempoData, setJanelaTempoData] = useState([])

    const getJanelaTempo = async () => {
        const response = await get("janelaTempo")
        setJanelaTempoData(response.data)
    }

    useEffect(() => {
        getJanelaTempo()
    }, [])

    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => `${eachData.DiaSemana}`.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const janelaTempo = janelaTempoData.find(item => item.CodTurno === eachName.CodTurno);
                    const key = eachName.CodHorario
                    const title = `${eachName.DiaSemana} ${janelaTempo.HoraIni.slice(0,-3)} - ${janelaTempo.HoraFim.slice(0,-3)}`
                    const description = `# ${key}`
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

    const fetchData = async () => {
        try {
            const response = await get(table)
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
    }
});