import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Button, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { useState } from "react";
// import { ScrollView } from "react-native-gesture-handler";

export default function Select({ options, onChangeSelect, text }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [txt, setTxt] = useState(text);

    const renderOption = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setTxt(item.label);
                    onChangeSelect(item.id);
                    setModalVisible(false);
                }}
                style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                }}
            >
                <Text style={{ fontSize: 15, justifyContent: 'center', alignSelf: 'center' }}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                numberOfLines={1}
            >
                <View style={styles.containerdentro}>
                    <View>

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, }}>{txt}</Text>

                    </View>
                    <View>

                        <Icon name="down" size={20} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
            <ScrollView>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    transparent
                >
                    <View style={styles.modal}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                            <FlatList
                                data={options}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={renderOption}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 5
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },

});
