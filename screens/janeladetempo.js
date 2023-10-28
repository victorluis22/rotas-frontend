import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, TextInput } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Select from "../components/select";
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';
import HorarioInput from '../components/moment';



export default function JaneladeTempo() {

    return (
        <View>
            <MenuRetornar options={[{ title: 'Cadastro de Janela de Tempo', voltar: 'TelaInicial' }]} />
            <View style={styles.container}>

                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Horario de Início
                    </Text>
                    <HorarioInput

                    />
                </View>

                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Horario de Termino
                    </Text>
                    <HorarioInput

                    />
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
        borderRadius: 20,
        height: 30,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft:15,

    },
});