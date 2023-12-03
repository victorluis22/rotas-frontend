import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/auth";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { create, update } from "../../services/api";

export default function CadastroResponsavel({ route }) {
    const previousData = route.params.previousData
    const type = route.params.type
    
    const { user } = useContext(AuthContext)
    const navigation = useNavigation()

    const [nome, setNome] = useState(type === "update" ? previousData.Nome : "")

    const submit = async () => {
        if(nome){
            const data = {
                nome: nome,
                codEmpresa: user.CodEmpresa
            }

            try {
                if (type === "update"){
                    await update("responsaveis", previousData.CodResp, data)
                    Alert.alert("Sucesso", "Responsável atualizado com sucesso!")
                    navigation.navigate("ListaDados", {table: "responsaveis"})
                }
                else{
                    await create("responsaveis", data)
                    Alert.alert("Sucesso", "Responsável cadastrado com sucesso!")
                    navigation.navigate("ListaDados", {table: "responsaveis"})
                }
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Responsável já cadastrado")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Responsável não encontrado")
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
            <MenuRetornar options={[{ title: type === "update" ? `Editar ${previousData.Nome}`: 'Cadastro de Responsavéis', voltar: "ListaDados", table: "responsaveis" }]} />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleinput}>Nome do responsavel</Text>
                    <TextInput style={styles.input} value={nome} onChangeText={setNome}/>


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