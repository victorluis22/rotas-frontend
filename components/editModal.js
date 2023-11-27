import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Modal } from "react-native-paper";

import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/Feather"

export default function EditModal({ modalVisible, setModalVisible, deleteFunction, data}) {
    const id = data.CodCliente
    const navigation = useNavigation()

    const navegarCadastroCli = () => {
        setModalVisible(!modalVisible)
        navigation.navigate('CadastroCliente', {type: "update", previousData: data});
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
                <Text style={styles.titulo}>{data.Nome}</Text>
                
                <View style={styles.botaoContainer}> 
                    <TouchableOpacity style={styles.botao} onPress={() => navegarCadastroCli()}>
                        <Icon name="edit" size={30} />
                        <Text style={styles.descricao}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={() => deleteFunction(id)}>
                        <Icon2 name="trash-2" size={30} />
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