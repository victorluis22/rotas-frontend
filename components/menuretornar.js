import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function MenuRetornar(props) {

    const navigation = useNavigation()

    function voltar(value) {
        navigation.navigate(value)
    }

    return (
        <SafeAreaView style={styles.retornar}>
            <View style={{ paddingLeft: 5, backgroundColor: '#606060', borderRadius: '100%', height: 40, width: 40, justifyContent: 'center', marginLeft: 5 }}>
                {props.options &&
                    props.options.map((item, index) =>
                        <TouchableOpacity
                            onPress={() => voltar(item.voltar)}
                        >
                            <Icon name="return-up-back" size={30} color="black" />
                        </TouchableOpacity>
                    )}
            </View>
            <View style={styles.nome}>
                {props.options &&
                    props.options.map((item, index) =>
                        <Text style={styles.textonome}>{item.title}</Text>
                    )}
            </View>
            <View style={{
                width: '10%',
                backgroundColor: '#A7A7A7',
                height: 10, alignItems: 'center',
                justifyContent: 'center',
            }}></View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    retornar: {
        width: '100%',
        backgroundColor: '#A7A7A7',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nome: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textonome: {
        fontSize: 20,
    }
});