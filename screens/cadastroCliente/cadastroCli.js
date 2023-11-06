import { View, Text, TouchableOpacity, StyleSheet, Tilte, TextInput, ScrollView, Alert, Button } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import Icon from "react-native-vector-icons/AntDesign"
import { useState } from "react";
import { createClient } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { validateCPFCNPJ } from "../../services/inputMask";
import {Picker} from '@react-native-picker/picker';

export default function CadastroCliente(){
    const [nome, setNome] = useState("sadsa")
    const [logradouro, setLogradouro] = useState("sadsa")
    const [numero, setNumero] = useState("sadsa")
    const [complemento, setComplemento] = useState("sadsa")
    const [UTM, setUTM] = useState("sadsa")
    const [bairro, setBairro] = useState("asdsa")
    const [cidade, setCidade] = useState("asdsa")
    const [uf, setUf] = useState("sads")
    const [tempoColeta, setTempoColeta] = useState("sadsa")
    const [cpfcnpj, setCpfcnpj] = useState("000.000.000-01")
    const [pjpf, setPjpf] = useState("PF")
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
                await createClient(data)
                Alert.alert("Sucesso", "Usuário cadastrado com sucesso!")
                navigation.navigate("TelaInicial")
            } catch (error) {
                console.log(error)
                Alert.alert("Erro", "Ocorreu um erro ao enviar os dados, tente novamente.")
            }
        }
        else{
            Alert.alert("Erro", "Preencha todos os campos de texto.")
        }
    }
    
    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: 'Cadastro de Clientes', voltar: 'TelaInicial' }]} />
            <ScrollView>
                <Text style={styles.Title}>
                    Cadastro de Cliente
                    <Icon name="database" size={20} color={"#000"} />
                </Text>

                <Text style={styles.Titleinput}>Nome</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                />

                <Text style={styles.Titleinput}>Logradouro</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setLogradouro}
                    value={logradouro}
                />

                <Text style={styles.Titleinput}>Numero</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumero}
                    value={numero}
                    keyboardType='numeric'
                />

                <Text style={styles.Titleinput}>Complemento</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setComplemento}
                    value={complemento}
                />

                <Text style={styles.Titleinput}>UTM</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUTM}
                    value={UTM}
                />

                <Text style={styles.Titleinput}>Bairro</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setBairro}
                    value={bairro}
                />

                <Text style={styles.Titleinput}>Cidade</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCidade}
                    value={cidade}
                />

                <Text style={styles.Titleinput}>UF</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUf}
                    value={uf}
                />

                <Text style={styles.Titleinput}>Tempo Coleta</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTempoColeta}
                    value={tempoColeta}
                />

                <Text style={styles.Titleinput}>CPF ou CNPJ</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCpfcnpj}
                    onBlur={() => setCpfcnpj(validateCPFCNPJ(cpfcnpj))}
                    value={cpfcnpj}
                    keyboardType='numeric'
                    maxLength={20}
                />

                <Text style={styles.Titleinput}>Pessoa Jurídica ou Física</Text>
                <Picker
                    style={styles.input}
                    selectedValue={pjpf}
                    onValueChange={(itemValue) =>
                        setPjpf(itemValue)
                    }>
                    <Picker.Item label="PF" value="PF" />
                    <Picker.Item label="PJ" value="PJ" />
                </Picker>

                <TouchableOpacity style={styles.ButtonContent} onPress={() => submit()}>
                    <Text style={styles.ButtonText}>Cadastrar</Text>
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
        display: "FlipInEasyX",
        justifyContent: "center",
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: 35,
        alignSelf: 'center',
        margin: 10,
        paddingLeft:15,
    },

    Title: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: "white",
        paddingVertical: 5
    },

    Titleinput: {
        display: "flex",
        marginLeft: 40,
    },

    ButtonText: {
        margin: 10,
    },

    ButtonContent: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "lightblue",
        // borderRadius: 10,
        marginVertical: 20
    }

});