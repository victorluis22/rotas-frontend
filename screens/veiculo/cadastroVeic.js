import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/auth";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { get, create, update } from "../../services/api";


export default function CadastroVeiculo({ route }) {
    const previousData = route.params.previousData
    const type = route.params.type

    const [descricao, setDescricao] = useState(type === "update" ? previousData.Descricao : "")
    const [emissao, setEmissao] = useState(type === "update" ? previousData.EmissaoPorKm.toString() : "")
    const [custo, setCusto] = useState(type === "update" ? previousData.CustoPorKm.toString() : "")
    const [capacidade, setCapacidade] = useState(type === "update" ? previousData.CapacMax.toString() : "")

    const [tipoVeiculoData, setTipoVeiculoData] = useState([])
    const [tipoVeiculo, setTipoVeiculo] = useState(type === "update" ? previousData.CodTipoVeic : "")

    const { user } = useContext(AuthContext)
    const navigation = useNavigation()

    const getTipoVeiculo = async () => {
        const response = await get("tipoVeiculo")
        setTipoVeiculoData(response.data)
    }

    useEffect(() => {
        getTipoVeiculo()
    }, [])

    const submit = async () => {
        if(descricao && emissao && custo && capacidade && tipoVeiculo){
            const data = {
                descricao: descricao, 
                emissao: emissao, 
                custo: custo,
                capacidadeMax: capacidade,
                codTipo: tipoVeiculo,
                codEmpresa: user.CodEmpresa
            }

            try {
                if (type === "update"){
                    await update("veiculos", previousData.CodVeic, data)
                    Alert.alert("Sucesso", "Veículo atualizado com sucesso!")
                    navigation.navigate("ListaDados", {table: "veiculos"})
                }
                else{
                    await create("veiculos", data)
                    Alert.alert("Sucesso", "Veículo cadastrado com sucesso!")
                    navigation.navigate("ListaDados", {table: "veiculos"})
                }
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Veículo já cadastrado")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Veículo não encontrado")
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
            <MenuRetornar options={[{ title: type === "update" ? `Editar ${previousData.Descricao}` : "Cadastro de Veículo", voltar: "ListaDados", table: "veiculos" }]} />
            <ScrollView style={styles.content}>

                <Text style={styles.titleinput}>Descrição do Veículo</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescricao}
                    value={descricao}
                />

                <Text style={styles.titleinput}>Emissão por Km</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmissao}
                    value={emissao}
                    keyboardType='numeric'
                />

                <Text style={styles.titleinput}>Custo por Km</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCusto}
                    value={custo}
                    keyboardType='numeric'
                />

                <Text style={styles.titleinput}>Capacidade Máxima</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCapacidade}
                    value={capacidade}
                    keyboardType='numeric'
                />

                <Text style={styles.titleinput}>Tipo de Veículo</Text>
                <Picker
                    style={styles.input}
                    selectedValue={tipoVeiculo}
                    onValueChange={(itemValue) =>
                        setTipoVeiculo(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    {
                        tipoVeiculoData.map((item, index) => {
                            return (
                                <Picker.Item
                                key={index}
                                label={item.DescTipo}
                                value={item.CodTipoVeic}
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