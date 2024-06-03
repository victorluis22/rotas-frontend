import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import { useState, useEffect } from "react";
import { get } from "../../services/api";
import { create, update } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';

export default function CadastroRespVeiculo({route}){
    const previousData = route.params.previousData
    const codVeic = route.params.codVeic
    const type = route.params.type

    const [resp, setResp] = useState(type === "update" ? previousData.CodResp : "")
    const [respData, setRespData] = useState([])

    const navigation = useNavigation()

    const fetchResp = async () => {
        const response = await get("responsaveis")
        setRespData(response.data)
    }

    useEffect(() => {
        fetchResp()
    }, [])

    const submit = async () => {
        if(resp){
            const data = {
                codResp: resp,
                codVeic: codVeic
            }

            try {
                if (type === "update"){
                    await update("responsavelVeiculo", previousData.CodRV, data)
                    Alert.alert("Sucesso", "Responsável atualizado com sucesso!")
                }
                else{
                    await create("responsavelVeiculo", data)
                    Alert.alert("Sucesso", "Responsável cadastrado com sucesso!")
                }
                navigation.goBack()
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
            <MenuRetornar title={type === "update" ? `Editar ${previousData.Nome}` : "Cadastro de Responsável de Veículo"} />
            <ScrollView style={styles.content}>

                <Text style={styles.titleinput}>Responsável</Text>
                <Picker
                    style={styles.input}
                    selectedValue={resp}
                    onValueChange={(itemValue) =>
                        setResp(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    {
                        respData.map((item, index) => {
                            return (
                                <Picker.Item
                                key={index}
                                label={`${item.Nome}`}
                                value={item.CodResp}
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