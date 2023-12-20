import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import { useState, useEffect, useContext } from "react";
import { get } from "../../services/api";
import { create, update } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../../context/auth";

export default function CadastroContrato({route}){
    const previousData = route.params.previousData
    const codCliente = route.params.codCliente
    const { user } = useContext(AuthContext)
    const type = route.params.type

    const [hora, setHora] = useState(type === "update" ? previousData.hora : "")


    const getTipoContrato = async () => {
        const response = await get("tipoContrato")
        setTipoContratoData(response.data)
    }

    const getTipoVeiculo = async () => {
        const response = await get("tipoVeiculo")
        setTipoVeiculoData(response.data)
    }

    useEffect(() => {
        getTipoContrato()
        getTipoVeiculo()
    }, [])

    const navigation = useNavigation()

    const submit = async () => {
        if(hora){
            const data = {
                hora: hora,
                codTipoCont: tipoContrato,
                codEmpresa: user.CodEmpresa,
                codCliente: codCliente,
                codTipoVeic: tipoVeiculo,
            }

            try {
                if (type === "update"){
                    await update("horariocoletacliente", previousData.CodCliente, data)
                    Alert.alert("Sucesso", "horário atualizado com sucesso!")
                    navigation.navigate("ListaHorarioContrato", {table: "horariocoletacliente", codCliente: codCliente})
                }
                else{
                    await create("contrato", data)
                    Alert.alert("Sucesso", "horário cadastrado com sucesso!")
                    navigation.navigate("ListaHorarioContrato", {table: "horariocoletacliente", codCliente: codCliente})
                }
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Horário já cadastrado")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Horário não encontrado")
                }
                else{
                    Alert.alert("Erro", "Ocorreu um erro ao enviar os dados, tente novamente.")
                }
            }
        }
        else{
            Alert.alert("Erro", "Preencha todos os campos de texto.")
        }
    }
    
    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: type === "update" ? `Editar ${previousData.Nome}` : "Cadastro de Horário", voltar: "ListaHorarioContrato", table: "horariocoletacliente" }]} />
            <ScrollView style={styles.content}>

                <Text style={styles.titleinput}>Horário</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHora}
                    value={hora}
                />

                <TouchableOpacity style={styles.buttonContent} onPress={() => submit()}>
                    <Text style={styles.buttonText}>{type === "update" ? "Atualizar": 'Cadastrar'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        display: 'flex',
        justifyContent: "center",
    },
    content:{
        marginTop: 20
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: 35,
        alignSelf: 'center',
        margin: 10,
        paddingLeft:15,
        elevation: 5,
        shadowColor: '#3C3C3C'
    },

    titleinput: {
        display: "flex",
        marginLeft: 40,
        color: "#3C3C3C",
        fontSize: 16,
        fontWeight: "bold"
    },

    buttonText: {
        margin: 10,
        fontSize: 20,
        color: "#D9D9D9",
        fontWeight: "bold"
    },

    buttonContent: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#3C3C3C",
        borderRadius: 10,
        marginHorizontal: "10%",
        marginVertical: 40
    }

});