import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, TextInput } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Select from "../components/select";
import React, { useState } from 'react'



export default function CadastroVeiculo() {

    const [descricao, setDescricao] = useState('')
    const [emissao, setEmissao] = useState('')
    const [custo, setCusto] = useState('')
    const [capacidade, setCapacidade] = useState('')



    return (
        <View>
            <MenuRetornar options={[{ title: 'Cadastro de Veículo', voltar: 'TelaInicial' }]} />
            <View style={styles.container}>

                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Descrição do Veículo
                    </Text>
                    <TextInput style={styles.caixadetexto} onChangeText={setDescricao}>
                    </TextInput>
                </View>

                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Emissão por Km
                    </Text>
                    <TextInput style={styles.caixadetexto} onChangeText={setEmissao}>
                    </TextInput>
                </View>

                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Custo por Km
                    </Text>
                    <TextInput style={styles.caixadetexto} onChangeText={setCusto}>
                    </TextInput>
                </View>

                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Capacidade Máxima
                    </Text>
                    <TextInput style={styles.caixadetexto} onChangeText={setCapacidade}>
                    </TextInput>
                </View>
                <View style={{ paddingHorizontal: 30, justifyContent: 'flex-end', marginTop: 40 }}>
                    <TouchableHighlight
                        style={styles.butao}
                    >
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 14, justifyContent: 'center' }}>
                            Cadastrar
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>


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
        paddingLeft:15,
    },
});