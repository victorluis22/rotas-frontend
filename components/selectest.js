import React, { useState } from 'react';
import { View, Button, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SelectModal = ({ options, onSelect }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);

    };

    const handleConfirm = () => {
        onSelect(selectedOption);
        closeModal();
    };

    return (
        <View>
            <TouchableOpacity onPress={openModal} style={styles.container}>
                <View style={styles.containerdentro}>
                    <Icon name="close-outline" size={30} color="black" />
                </View>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => handleOptionSelect(option)}
                                style={{
                                    paddingVertical: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                }}
                            >
                                <Text>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <Button title="Cancel" onPress={closeModal} />
                            <Button title="Confirm" onPress={handleConfirm} disabled={!selectedOption} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        height: 30,
        alignSelf: 'center',
        margin: 20,
    },
    containerdentro: {
        alignItems: 'flex-end',
    }
});

export default SelectModal;