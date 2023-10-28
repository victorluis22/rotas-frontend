import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


export default function AlocacaodeHorarios() {

    const navigation = useNavigation()

    function DispVeic() {
        navigation.navigate('DisponibilidadeVeiculos')
    }

    function ColCli() {
        navigation.navigate('ColetaCliente')
    }

    function EntreCompost() {
        navigation.navigate('EntregaCompostagem')
    }

    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: 'Alocaçao de Horarios', voltar: 'TelaInicial' }]} />
            <View style={{ marginTop: '20%' }}>
                <View style={styles.linha}>
                    <TouchableOpacity
                        onPress={() => DispVeic()}
                    >
                        <Text style={styles.texto}>Disponibilidade do Veículo</Text>



                    </TouchableOpacity>
                    <Icon name="right" size={20} color="black" />
                </View>
                <View style={styles.linha}>
                    <TouchableOpacity
                        onPress={() => ColCli()}
                    >
                        <Text>Coleta nos Clientes</Text>
                    </TouchableOpacity>

                    <Icon name="right" size={20} color="black" />
                </View>
                <View style={styles.linha}>
                    <TouchableOpacity
                        onPress={() => EntreCompost()}
                    >
                        <Text>Entrega no ponto de compostagem</Text>
                    </TouchableOpacity>

                    <Icon name="right" size={20} color="black" />
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
        justifyContent: 'space-between',
        marginTop: 20,
    },

});