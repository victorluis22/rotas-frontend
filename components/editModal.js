import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Modal } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"

export default function EditModal({ modalVisible, setModalVisible, openDeleteModal, data, table, title, codCliente, codContrato}) {
    const navigation = useNavigation()

    const navegarCadastro = () => {
        setModalVisible(!modalVisible)
        switch (table){
            case "clientes":
                navigation.navigate('CadastroCliente', {type: "update", previousData: data});
                break;
            case "veiculos":
                navigation.navigate('CadastroVeiculo', {type: "update", previousData: data});
                break;
            case "responsaveis":
                navigation.navigate('CadastroResponsaveis', {type: "update", previousData: data});
                break;
            case "tipoVeiculo":
                navigation.navigate('CadastroTipoVeiculo', {type: "update", previousData: data});
                break;
            case "tipoContrato":
                navigation.navigate('CadastroTipoContrato', {type: "update", previousData: data});
                break;
            case "janelaTempo":
                navigation.navigate('CadastroJanelaTempo', {type: "update", previousData: data});
                break;
            case "horarios":
                navigation.navigate('CadastroHorario', {type: "update", previousData: data});
                break;
            case "contrato":
                navigation.navigate('CadastroContrato', {type: "update", previousData: data, codCliente: codCliente});
                break;
            case "horarioContratoCliente":
                navigation.navigate('CadastroHorarioContrato', {type: "update", previousData: data, codContrato: codContrato});
                break;
            default:
                Alert.alert("Erro", "Ocorreu algum erro, tente novamente.")
                navigation.navigate('TelaInicial');
        }
    }

    return (
        <Modal
        animationType='slide'
        style={styles.modal}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
            setModalVisible(!modalVisible)
        }}>
            <View style={styles.container}>
                <Text style={styles.titulo}>{title}</Text>
                
                <View style={styles.botaoContainer}> 
                    <TouchableOpacity style={styles.botao} onPress={() => navegarCadastro()}>
                        <AntDesign name="edit" size={30} />
                        <Text style={styles.descricao}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={() => openDeleteModal()}>
                        <Feather name="trash-2" size={30} />
                        <Text style={styles.descricao}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    modal:{
        justifyContent: "flex-end"
    },
    titulo: {
        textAlign: 'center',
        width: "100%",
        fontSize: 30,
        backgroundColor: "#3C3C3C",
        color: "#fff",
        paddingVertical: 20
    },
    botaoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    botao: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        margin: 10
    },
    descricao: {
        fontSize: 20,
    }
});