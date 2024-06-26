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

    const [dataini, setDataIni] = useState(type === "update" ? previousData.DataIni.slice(0, 10) : "")
    const [datafim, setDataFim] = useState(type === "update" ? previousData.DataFim === null ? "" : previousData.DataFim.slice(0, 10) : "")
    const [volumebalde, setVolumeBalde] = useState(type === "update" ? previousData.VolumeBalde.toString() : "")
    const [tipoContrato, setTipoContrato] = useState(type === "update" ? previousData.CodTipoContrato : "")
    const [tipoVeiculo, setTipoVeiculo] = useState(type === "update" ? previousData.CodTipoVeic : "")

    const [tipoContratoData, setTipoContratoData] = useState([])
    const [tipoVeiculoData, setTipoVeiculoData] = useState([])

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

    const handleDateChange = (data) => {
        const inputDate = data;
        // Verificar se a data está no formato "Ano-Mês-Dia"
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(inputDate)) {
            return false
        } else {
            return true
        }
    }

    const submit = async () => {
        if(dataini && volumebalde && tipoContrato && tipoVeiculo){
            if(handleDateChange(dataini) === false){
                Alert.alert("Erro", "Formato de Data Inicial preenchido de forma inválida.")
                return
            }
            
            if(datafim != ""){
                if(handleDateChange(datafim) === false){
                    Alert.alert("Erro", "Formato de Data Final preenchido de forma inválida.")
                    return
                }
            }

            const data = {
                dataIni: dataini,
                dataFim: datafim === "" ? null :  datafim,
                volumeBalde: volumebalde,
                codTipoContrato: tipoContrato,
                codEmpresa: user.CodEmpresa,
                codCliente: codCliente,
                codTipoVeic: tipoVeiculo,
            }

            try {
                if (type === "update"){
                    await update("contrato", previousData.NumContrato, data)
                    Alert.alert("Sucesso", "Contrato atualizado com sucesso!")
                }
                else{
                    await create("contrato", data)
                    Alert.alert("Sucesso", "Contrato cadastrado com sucesso!")
                }
                navigation.goBack()
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Contrato já cadastrado")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Contrato não encontrado")
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
            <MenuRetornar title={type === "update" ? `Editar Contrato` : "Cadastro de Contrato"} />
            <ScrollView style={styles.content}>

                <Text style={styles.titleinput}>Data Inicial (EX: Ano-Mês-Dia)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDataIni}
                    value={dataini}
                />

                <Text style={styles.titleinput}>Data final (EX: Ano-Mês-Dia)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDataFim}
                    value={datafim}
                />

                <Text style={styles.titleinput}>Volume do Balde (Em litros)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setVolumeBalde}
                    value={volumebalde}
                    keyboardType='numeric'
                />
                <Text style={styles.titleinput}>Tipo de Contrato</Text>
                <Picker
                    style={styles.input}
                    selectedValue={tipoContrato}
                    onValueChange={(itemValue) =>
                        setTipoContrato(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    {
                        tipoContratoData.map((item, index) => {
                            return (
                                <Picker.Item
                                key={index}
                                label={`${item.Periodicidade} - R$${item.ValorMensal}`}
                                value={item.CodTipoContrato}
                                />
                            );
                        })
                    }
                </Picker>

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