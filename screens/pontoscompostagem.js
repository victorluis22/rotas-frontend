import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, TextInput, ScrollView } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Select from "../components/select";
import React, { useState } from 'react'



export default function PontosCompostagem() {

    const [descponto, setDescPonto] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [utm, setUTM] = useState('')
    const [capmax, setCapMax] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')




    return (
        <View style={{backgroundColor:'#D9D9D9'}}>
            <MenuRetornar options={[{ title: 'Cadastro de Responsavéis', voltar: 'TelaInicial' }]} />
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            Descrição do Ponto de Compostagem
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setDescPonto}>
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            Logradouro
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setLogradouro}>
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            Número
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setNumero} keyboardType="numeric">
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            Complemento
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setComplemento}>
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            Bairro
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setBairro}>
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            UTM
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setUTM}>
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            Capacidade Máxima no dia
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setCapMax}>
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            Cidade
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setCidade}>
                        </TextInput>
                    </View>

                    <View style={styles.containerdentro}>
                        <Text style={styles.texto}>
                            UF
                        </Text>
                        <TextInput style={styles.caixadetexto} onChangeText={setUF}>
                        </TextInput>
                    </View>

                    <View style={{ paddingHorizontal: 30, justifyContent: 'flex-end', marginTop: 40, marginBottom: 150 }}>
                        <TouchableHighlight
                            style={styles.butao}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 14, justifyContent: 'center' }}>
                                Cadastrar
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        display: 'flex',
    },
    linha: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    containerdentro: {
        paddingHorizontal: 10,
        marginTop: 30
    },
    butao: {
        backgroundColor: '#3C3C3C',
        alignSelf: 'center',
        borderRadius: 20,
        height: 30,
        width: '100%',
        justifyContent: 'center'
    },
    caixadetexto: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        height: 30,
        width: '100%',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 15,
    },
});