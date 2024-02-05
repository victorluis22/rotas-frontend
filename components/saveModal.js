import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Modal } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign"

export default function SaveModal({ modalVisible, setModalVisible, type}) {

  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  return (
      <Modal
      animationType='slide'
      style={styles.modal}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        closeModal()
      }}
      onDismiss={() => {
        closeModal()
      }}>
          <View style={styles.salvoContainer}> 
              <View style={styles.botaoContainer}>
                  <TouchableOpacity style={styles.botao} onPress={() => closeModal()}>
                      <AntDesign name="closecircle" size={40} />
                  </TouchableOpacity>
              </View>
              <View style={styles.infoContainer}>
                  <AntDesign name="checkcircle" size={50} />
                  <Text style={styles.titulo}>{type === "update" ? "Atualizado": "Cadastrado"} com sucesso!</Text>
              </View>
          </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    salvoContainer: {
      backgroundColor: '#ffffff',
      width: '80%',
      paddingHorizontal: 30,
      alignSelf: "center",
      borderRadius: 20
    },
    botaoContainer: {
      display: 'block',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingTop: 20
    },
    infoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20
    },
    titulo: {
      textAlign: 'center',
      fontWeight: "bold",
      width: "98%",
      fontSize: 20,
      paddingVertical: 20
    },
  });