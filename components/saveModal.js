import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Modal } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign"

export default function SaveModal({ modalVisible, setModalVisible}) {
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
            <View style={styles.salvoContainer}> 
                <View style={styles.botaoContainer}>
                    <TouchableOpacity style={styles.botao}>
                        <AntDesign name="close" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <AntDesign name="check" size={50} />
                    <Text style={styles.titulo}>Cadastrado com sucesso!</Text>
                </View>
            </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    salvoContainer: {
      backgroundColor: '#ffffff',
    },
    botaoContainer: {
      display: 'block',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 20
    },
    infoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20
    },
    titulo: {
      textAlign: 'center',
      width: "98%",
      fontSize: 20,
      paddingVertical: 20
    },
  });