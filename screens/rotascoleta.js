import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Select from "../components/select";
import { useNavigation } from '@react-navigation/native';



export default function RotasColeta() {

    const navigation = useNavigation()

    function navegarColetaMap() {
      navigation.navigate('ColetaMap');
    }

    return (
        <View>
            <MenuRetornar options={[{ title: 'Rotas de Coleta', voltar: 'TelaInicial' }]} />
            <View style={styles.container}>
                <View style={styles.containerdentro}>
                    <Text style={styles.texto}>
                        Selecione o veículo
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

                <View style={{ paddingHorizontal: 30, justifyContent: 'flex-end', marginTop: 50 }}>
                    <TouchableHighlight
                        style={styles.butao}
                        onPress={navegarColetaMap}
                    >
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 14, justifyContent: 'center' }}>
                            Consultar
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
        paddingLeft: 0,
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