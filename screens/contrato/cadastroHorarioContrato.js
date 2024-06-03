import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import { useState, useEffect } from "react";
import { getHorariosComplete } from "../../services/api";
import { create, update } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';

export default function CadastroHorarioContrato({route}){
    const previousData = route.params.previousData
    const codContrato = route.params.codContrato
    const type = route.params.type

    const [hora, setHora] = useState(type === "update" ? previousData.CodHorario : "")
    const [horaData, setHoraData] = useState([])

    const navigation = useNavigation()

    const fetchHorariosComplete = async () => {
        const response = await getHorariosComplete()
        setHoraData(response.data)
    }

    useEffect(() => {
        fetchHorariosComplete()
    }, [])

    const submit = async () => {
        if(hora){
            const data = {
                codHorario: hora,
                codContrato: codContrato
            }

            try {
                if (type === "update"){
                    await update("horarioContratoCliente", previousData.CodHC, data)
                    Alert.alert("Sucesso", "Horário atualizado com sucesso!")
                }
                else{
                    await create("horarioContratoCliente", data)
                    Alert.alert("Sucesso", "Horário cadastrado com sucesso!")
                }
                navigation.goBack()
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
            <MenuRetornar title={type === "update" ? `Editar ${previousData.DiaSemana}` : "Cadastro de Horário"} />
            <ScrollView style={styles.content}>

                <Text style={styles.titleinput}>Horário</Text>
                <Picker
                    style={styles.input}
                    selectedValue={hora}
                    onValueChange={(itemValue) =>
                        setHora(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    {
                        horaData
                        .slice()
                        .sort((a,b) => {
                            const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
                            return diasDaSemana.indexOf(a.DiaSemana.toLowerCase()) - diasDaSemana.indexOf(b.DiaSemana.toLowerCase());
                        })
                        .map((item, index) => {
                            return (
                                <Picker.Item
                                key={index}
                                label={`${item.DiaSemana} | ${item.HoraIni} - ${item.HoraFim}`}
                                value={item.CodHorario}
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