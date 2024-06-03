import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, TextInput, ScrollView, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import Select from "../../components/select";
import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/auth";
import { create, update } from "../../services/api";
import { useNavigation } from "@react-navigation/native";



export default function CadastroPontosCompostagem({ route }) {
    const previousData = route.params.previousData
    const type = route.params.type

    const [descponto, setDescPonto] = useState(type === "update" ? previousData.Descricao : '')
    const [logradouro, setLogradouro] = useState(type === "update" ? previousData.Logradouro : '')
    const [numero, setNumero] = useState(type === "update" ? previousData.Numero.toString() : '')
    const [complemento, setComplemento] = useState(type === "update" ? previousData.Complemento : '')
    const [bairro, setBairro] = useState(type === "update" ? previousData.Bairro : '')
    const [capmax, setCapMax] = useState(type === "update" ? previousData.CapacMaxDia.toString() : '')
    const [cidade, setCidade] = useState(type === "update" ? previousData.Cidade : '')
    const [uf, setUF] = useState(type === "update" ? previousData.UF : '')
    const { user } = useContext(AuthContext)
    const navigation = useNavigation()

    const submit = async () => {
        if(descponto && logradouro && numero && bairro && cidade && uf && capmax){
            const data = {
                descricao: descponto,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                capacMaxDia: capmax,
                codEmpresa: user.CodEmpresa
            }

            try {
                if (type === "update"){
                    await update("pontosCompostagem", previousData.CodPonto, data)
                    Alert.alert("Sucesso", "Ponto de Compostagem atualizado com sucesso!")
                }
                else{
                    await create("pontosCompostagem", data)
                    Alert.alert("Sucesso", "Ponto de Compostagem cadastrado com sucesso!")
                }
                navigation.goBack()
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Ponto de Compostagem já cadastrado")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Ponto de Compostagem não encontrado")
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
            <MenuRetornar title={type === "update" ? `Editar ${previousData.Descricao}` : "Cadastro de Ponto"} />
            <ScrollView style={styles.content}>

                <Text style={styles.titleinput}>Descrição Ponto</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescPonto}
                    value={descponto}
                />

                <Text style={styles.titleinput}>Logradouro</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setLogradouro}
                    value={logradouro}
                />

                <Text style={styles.titleinput}>Numero</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumero}
                    value={numero}
                    keyboardType='numeric'
                />

                <Text style={styles.titleinput}>Complemento (opcional)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setComplemento}
                    value={complemento}
                />

                <Text style={styles.titleinput}>Bairro</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setBairro}
                    value={bairro}
                />

                <Text style={styles.titleinput}>Cidade</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCidade}
                    value={cidade}
                />

                <Text style={styles.titleinput}>UF</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUF}
                    value={uf}
                />

                <Text style={styles.titleinput}>Capacidade Máxima</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCapMax}
                    value={capmax}
                    keyboardType='numeric'
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