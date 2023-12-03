import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Modal } from "react-native-paper";

import Feather from "react-native-vector-icons/Feather"

export default function DeleteModal({ modalVisible, setModalVisible, data, deleteFunction, table}) {
    const [id, setId] = useState(null)

    const getId = () => {
        switch (table){
            case "clientes":
                setId(data.CodCliente)
                break
            case "veiculos":
                setId(data.CodVeic)
                break
            case "responsaveis":
                setId(data.CodResp)
                break
            default:
                setId(null)
        }
    }

    useEffect(() => {
        getId()
    }, [data])
    
    return (
        <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
            setModalVisible(!modalVisible)
        }}>
            <View style={styles.container}>
                <Feather name='alert-circle' size={50} color="orange"/>
                <Text style={styles.titulo}>Tem certeza que deseja excluir?</Text>
                <Text style={styles.texto}>Se confirmar, você perderá esse dado.</Text>
                
                <View style={styles.botaoContainer}>
                    <TouchableOpacity style={{...styles.botao, backgroundColor: "#E13F33"}} onPress={() => deleteFunction(id)}>
                        <Text style={styles.textoBotao}>Excluir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{...styles.botao, backgroundColor: "#a6a6a6"}} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textoBotao}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#fff',
        width: "90%",
        alignSelf: "center",
        borderRadius: 20,
        padding: 20
    },
    titulo: {
        textAlign: 'center',
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
        color: "#3C3C3C",
        paddingVertical: 20
    },
    texto: {
        textAlign: 'center',
        width: "100%",
        fontSize: 20,
        color: "#3C3C3C",

    },
    botaoContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 10,
        width: "100%"
    },
    botao:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        borderRadius: 5
    },
    textoBotao:{
        fontSize: 20,
        color: "#fff"
    }
});