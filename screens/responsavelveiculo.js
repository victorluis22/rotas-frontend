import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Select from "../components/select";


export default function ResponsavelVeiculo() {

    return (
        <View>
            <MenuRetornar options={[{ title: 'Responsavel pelo Veículo', voltar: 'TelaInicial' }]} />
            <View style={styles.container}>
                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Contrato
                    </Text>
                    <Select
                        options={[
                            { label: 'Brazil', id: 0 },
                            { label: 'Egypt', id: 1 },
                            { label: 'Canada', id: 2 },
                            { label: 'Australia', id: 3 },
                            { label: 'Ireland', id: 4 }
                        ]}
                        onChangeSelect={(id) => (id)}
                    />
                </View>
                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Responsavel
                    </Text>
                    <Select
                        options={[
                            { label: 'Joao', id: 0 },
                            { label: 'maria', id: 1 },
                            { label: 'jose', id: 2 },
                            { label: 'Diogo', id: 3 },
                            { label: 'Hugo', id: 4 },
                            { label: 'Ibrahim', id: 5 },
                            { label: 'Ana Beatriz', id: 6 }
                        ]}
                        onChangeSelect={(id) => (id)}
                    />
                </View>
                <View style={{ paddingHorizontal: 30, justifyContent: 'flex-end' }}>
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
        paddingLeft: 10,
        marginTop: 30
    },
    butao: {
        backgroundColor: '#3C3C3C',
        alignSelf: 'center',
        borderRadius: 20,
        height: 30,
        width: '100%',
        justifyContent: 'center'
    }
});