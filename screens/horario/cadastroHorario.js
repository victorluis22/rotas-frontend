import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { get, create, update } from "../../services/api";
import { Picker } from "@react-native-picker/picker";

export default function CadastroHorario({ route }) {
    const previousData = route.params.previousData
    const type = route.params.type

    const navigation = useNavigation()

    const [diaSemana, setDiaSemana] = useState(type === "update" ? previousData.DiaSemana : "")
    const [janelaTempo, setJanelaTempo] = useState(type === "update" ? previousData.CodTurno : "")
    const [janelaTempoData, setJanelaTempoData] = useState([])

    const submit = async () => {
        if(diaSemana && janelaTempo){
            const data = {
                diaSemana: diaSemana,
                codTurno: janelaTempo
            }

            try {
                if (type === "update"){
                    await update("horarios", previousData.CodHorario, data)
                    Alert.alert("Sucesso", "Horário atualizado com sucesso!")
                    navigation.navigate("ListaDados", {table: "horarios"})
                }
                else{
                    await create("horarios", data)
                    Alert.alert("Sucesso", "Horário cadastrado com sucesso!")
                    navigation.navigate("ListaDados", {table: "horarios"})
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

    const getJanelaTempo = async () => {
        const response = await get("janelaTempo")

        setJanelaTempoData(response.data)
    }

    useEffect(() => {
        getJanelaTempo()
    }, [])

    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: type === "update" ? `Editar ${previousData.DiaSemana}`: 'Cadastro de Horário', voltar: "ListaDados", table: "horarios" }]} />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleinput}>Dia da Semana</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={diaSemana}
                        onValueChange={(itemValue) =>
                            setDiaSemana(itemValue)
                        }>
                        <Picker.Item label="Selecione" value="" enabled={false}/>
                        <Picker.Item label="Segunda" value="Segunda" />
                        <Picker.Item label="Terça" value="Terça" />
                        <Picker.Item label="Quarta" value="Quarta" />
                        <Picker.Item label="Quinta" value="Quinta" />
                        <Picker.Item label="Sexta" value="Sexta" />
                    </Picker>

                    <Text style={styles.titleinput}>Janela de Tempo</Text>

                    <Picker
                        style={styles.input}
                        selectedValue={janelaTempo}
                        onValueChange={(itemValue) =>
                            setJanelaTempo(itemValue)
                        }>
                        <Picker.Item label="Selecione" value="" enabled={false}/>
                        {
                            janelaTempoData.map((item, index) => {
                                return (
                                    <Picker.Item
                                    key={index}
                                    label={`${item.HoraIni} - ${item.HoraFim}`}
                                    value={item.CodTurno}
                                    />
                                );
                            })
                        }
                    </Picker>

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