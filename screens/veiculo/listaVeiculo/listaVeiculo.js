import { View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Container,
    TextInput,
    ScrollView,
    Alert,
    Button } from "react-native";
    
import MenuRetornar from "../../../components/menuretornar";
import { deleteClient, getClients } from "../../../services/api";
import { useEffect, useState } from "react";
import ListaCard from "../../../components/listaCard";
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import EditModal from "../../../components/editModal";


export default function ListaCliente(){

const [clients, setClients] = useState([])
const [search, setSearch] = useState("")
const searchLowerCase = search.toLowerCase()
const names = clients.filter((eachClient) => eachClient.Nome.toLowerCase().includes(searchLowerCase));
const navigation = useNavigation()
const [modalVisible, setModalVisible] = useState(false);
const [modalData, setModalData] = useState({})

const fetchData = async () => {
    try {
        const response = await getClients()
        setClients(response.data)
    } catch (error) {
        console.log(error)
        Alert.alert("Erro", "Ocorreu um erro ao pegar os dados de clientes, tente novamente.")
    }
}
const openModal = (data) => {
    setModalData(data)
    setModalVisible(!modalVisible)
}

const deleteData = async (id) => {
    try{
        await deleteClient(id)
        setModalVisible(!modalVisible)
        await fetchData()
    }
    catch (error) {
        console.log(error)
        Alert.alert("Erro", "Erro ao deletar cliente.")
    }
}

const navegarCadastroCli = () => {
    navigation.navigate('CadastroVeiculo', {type: "create", data: {}});
}

useEffect(() => {
    // Evita renderizar dados antigos quando voltando para trás na navigation stack
    navigation.addListener('focus', () => {
        fetchData()
    });
}, [navigation]);

return (
    <View style={styles.container}>
        <MenuRetornar options={[{ title: 'Veiculos', voltar: 'TelaInicial' }]} />

        <TextInput style={styles.caixadetexto}
            value={search}
            onChangeText={setSearch}
            placeholder="Digite o nome neste campo - Pesquisar"
        />

        <ScrollView>
            {names ?
                names.map((eachClient) => {
                    return (
                        <TouchableOpacity style={styles.button} key={eachClient.CodCliente} onPress={() => openModal(eachClient)}>
                            <ListaCard title={eachClient.Nome} description={`# ${eachClient.CodCliente}`}/>
                        </TouchableOpacity>
                    )
                })
                :
                clients.map((eachClient) => {
                    return (
                        <TouchableOpacity style={styles.button} key={eachClient.CodCliente} onPress={() => openModal(eachClient)}>
                            <ListaCard title={eachClient.Nome} description={`# ${eachClient.CodCliente}`}/>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
        
        <Icon style={styles.iconeAdd} name="pluscircle" size={60} color={"#3C3C3C"} onPress={navegarCadastroCli}></Icon>
        
        <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} deleteFunction={deleteData} data={modalData}/>
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