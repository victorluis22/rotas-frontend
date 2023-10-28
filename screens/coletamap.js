import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Select from "../components/select";


export default function ColetaMap() {



    return (
        <View>
            <MenuRetornar options={[{ title: 'Rotas de Coleta', voltar: 'RotasColeta' }]} />
            <View style={styles.container}>
                <Text style={styles.texto}>
                    Pontos de Coleta
                </Text>
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
        paddingLeft: 10,
        alignSelf:'center',
    },
    containerdentro: {
        paddingLeft: 0,
        marginTop: 40,
        alignItems:'center'
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