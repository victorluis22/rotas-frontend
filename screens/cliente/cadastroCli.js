import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import { useState } from "react";
import { create, update } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { validateCPFCNPJ } from "../../services/inputMask";
import { Picker } from '@react-native-picker/picker';

export default function CadastroCliente({route}){
    const previousData = route.params.previousData
    const type = route.params.type

    const [nome, setNome] = useState(type === "update" ? previousData.Nome : "")
    const [logradouro, setLogradouro] = useState(type === "update" ? previousData.Logradouro : "")
    const [numero, setNumero] = useState(type === "update" ? previousData.Numero.toString() : "")
    const [complemento, setComplemento] = useState(type === "update" ? previousData.Complemento : "")
    const [UTM, setUTM] = useState(type === "update" ? previousData.UTM : "")
    const [bairro, setBairro] = useState(type === "update" ? previousData.Bairro : "")
    const [cidade, setCidade] = useState(type === "update" ? previousData.Cidade : "")
    const [uf, setUf] = useState(type === "update" ? previousData.UF : "")
    const [tempoColeta, setTempoColeta] = useState(type === "update" ? previousData.TempoColeta : "")
    const [cpfcnpj, setCpfcnpj] = useState(type === "update" ? previousData.CPF_CNPJ : "")
    const [pjpf, setPjpf] = useState(type === "update" ? previousData.PJ_PF : "")
    const navigation = useNavigation()

    const submit = async () => {
        if(nome && logradouro && numero && complemento && UTM && bairro && cidade && uf && tempoColeta && cpfcnpj && pjpf){
            const data = {
                nome: nome,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                utm: UTM,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                tempoColeta: tempoColeta,
                cpfcnpj: cpfcnpj,
                pjpf: pjpf
            }

            try {
                if (type === "update"){
                    await update("clientes", previousData.CodCliente, data)
                    Alert.alert("Sucesso", "Usuário atualizado com sucesso!")
                    navigation.navigate("ListaDados", {table: "clientes"})
                }
                else{
                    await create("clientes", data)
                    Alert.alert("Sucesso", "Usuário cadastrado com sucesso!")
                    navigation.navigate("ListaDados", {table: "clientes"})
                }
            } catch (error) {
                console.log(error)
                const status = error.response ? error.response.status : 500

                if (status === 402){
                    Alert.alert("Erro", "Cliente já cadastrado")
                }
                else if(status == 404){
                    Alert.alert("Erro", "Cliente não encontrado")
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
            <MenuRetornar options={[{ title: type === "update" ? `Editar ${previousData.Nome}` : "Cadastro de Clientes", voltar: "ListaDados", table: "clientes" }]} />
            <ScrollView style={styles.content}>

                <Text style={styles.titleinput}>Nome</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
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

                <Text style={styles.titleinput}>Complemento</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setComplemento}
                    value={complemento}
                />

                <Text style={styles.titleinput}>UTM</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUTM}
                    value={UTM}
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
                    onChangeText={setUf}
                    value={uf}
                />

                <Text style={styles.titleinput}>Tempo Coleta</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTempoColeta}
                    value={tempoColeta}
                />

                <Text style={styles.titleinput}>CPF ou CNPJ</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCpfcnpj}
                    onBlur={() => setCpfcnpj(validateCPFCNPJ(cpfcnpj))}
                    value={cpfcnpj}
                    keyboardType='numeric'
                    maxLength={20}
                />

                <Text style={styles.titleinput}>Pessoa Jurídica ou Física</Text>
                <Picker
                    style={styles.input}
                    selectedValue={pjpf}
                    onValueChange={(itemValue) =>
                        setPjpf(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    <Picker.Item label="PF" value="PF" />
                    <Picker.Item label="PJ" value="PJ" />
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