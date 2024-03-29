import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconn from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';


export default function HamburguerMenu(props) {
    const [ModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    function click(value, table) {
        setModalVisible(false);
        navigation.navigate(value, {table: table})
    }

    return (
        <SafeAreaView style={styles.hambuguer}>
            <View style={{ marginLeft: 20 }}>
                <Modal 
                    transparent 
                    visible={ModalVisible}
                    animationType="fade"
                    onRequestClose={() => {
                        setModalVisible(!ModalVisible)
                    }}
                    onDismiss={() => {
                        setModalVisible(!ModalVisible)
                    }}
                >
                    <SafeAreaView style={styles.modal}>
                        <View >
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Icon name="close-outline" size={40} color="black" />
                                </TouchableOpacity>

                            </View>

                            <ScrollView>
                                <View style={styles.containerImagemModal}>
                                    <Image
                                        source={require('../assets/imagens/logo.png')}
                                        style={styles.imagemModal}
                                        resizeMode="contain"
                                    />
                                </View>
                                {props.options &&
                                    props.options.map((item, index) =>
                                        <TouchableOpacity key={index}
                                            onPress={() => click(item.screen, item.table)}
                                        >
                                            <Text style={styles.estilotextomodal}>{item.title}</Text>

                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                                    borderBottomWidth: 1,
                                                    width: '90%',
                                                    alignSelf: 'center'

                                                }}
                                            />
                                        </TouchableOpacity>

                                    )
                                }
                            </ScrollView>
                        </View>

                    </SafeAreaView>
                </Modal>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{marginTop: 20}}
                >
                    <Iconn name="three-bars" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    hambuguer: {
        width: '100%',
        backgroundColor: '#3C3C3C',
        height: 100,
        justifyContent: 'center',
        elevation: 10,
        shadowColor: '#3C3C3C'
    },
    modal: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        width: '60%',
        height: '100%',
        borderRadius: 5
    },
    imagemModal: {
        height: 150,
        width: 200,
    },
    containerImagemModal: {
        alignItems: 'center',
        marginTop: 10,
    },
    estilotextomodal: {
        marginLeft: 10,
        marginTop: 30,
        fontSize: 15,
        fontWeight: 'bold'
    }
});