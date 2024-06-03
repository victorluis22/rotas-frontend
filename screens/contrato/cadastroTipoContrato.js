import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import React, { useState } from 'react'
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { create, update } from "../../services/api";


export default function CadastroTipoContrato({ route }) {
    const previousData = route.params.previousData
    const type = route.params.type
    
    const navigation = useNavigation()

    const [periodicidade, setPeriodicidade] = useState(type === "update" ? previousData.Periodicidade : "")
    const [valor, setValor] = useState(type === "update" ? previousData.ValorMensal.toString() : "")

    const submit = async () => {
        if(periodicidade && valor){
            const data = {
                periodicidade: periodicidade,
                valorMensal: parseFloat(valor).toFixed(2)
            }

            try {
                if (type === "update"){
                    await update("tipoContrato", previousData.CodTipoContrato, data)
                    Alert.alert("Sucesso", "Tipo de contrato atualizado com sucesso!")
                }
                else{
                    await create("tipoContrato", data)
                    Alert.alert("Sucesso", "Tipo de contrato cadastrado com sucesso!")
                }
                navigation.goBack()
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Tipo de contrato já cadastrado")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Tipo de contrato não encontrado")
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
            <MenuRetornar title={type === "update" ? `Editar ${previousData.Periodicidade} R$${previousData.ValorMensal.toString()}`: 'Cadastro de Tipo de Contrato'} />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleinput}>Periodicidade</Text>
                    <TextInput style={styles.input} value={periodicidade} onChangeText={setPeriodicidade}/>

                    <Text style={styles.titleinput}>Valor Mensal (R$)</Text>
                    <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="numeric"/>


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