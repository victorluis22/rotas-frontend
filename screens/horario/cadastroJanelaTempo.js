import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import React, { useState } from 'react'

import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { create, update } from "../../services/api";


export default function CadastroJanelaTempo({ route }) {
    const previousData = route.params.previousData
    const type = route.params.type

    const navigation = useNavigation()

    const [horaInicial, setHoraInicial] = useState(type === "update" ? previousData.HoraIni : "")
    const [horaFinal, setHoraFinal] = useState(type === "update" ? previousData.HoraFim : "")

    const submit = async () => {
        if(horaInicial && horaFinal){
            const data = {
                horaIni: horaInicial,
                horaFim: horaFinal
            }

            try {
                if (type === "update"){
                    await update("janelaTempo", previousData.CodTurno, data)
                    Alert.alert("Sucesso", "Janela de Tempo atualizada com sucesso!")
                }
                else{
                    await create("janelaTempo", data)
                    Alert.alert("Sucesso", "Janela de Tempo cadastrada com sucesso!")
                }
                navigation.goBack()
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Janela de Tempo já cadastrada")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Janela de Tempo não encontrada")
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
            <MenuRetornar title={type === "update" ? `Editar ${previousData.HoraIni} - ${previousData.HoraFim}`: 'Cadastro de Janela de Tempo'} />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleinput}>Hora Inicial</Text>
                    <TextInput style={styles.input} value={horaInicial} onChangeText={setHoraInicial} placeholder="00:00"/>

                    <Text style={styles.titleinput}>Hora Final</Text>
                    <TextInput style={styles.input} value={horaFinal} onChangeText={setHoraFinal} placeholder="00:00"/>


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