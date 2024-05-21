import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function MenuRetornar(props) {

    const navigation = useNavigation()

    function voltar(value, table) {
        navigation.navigate(value, {table: table})
    }

    return (
        <View style={{backgroundColor: '#D9D9D9'}}>
            <SafeAreaView style={styles.retornar}>
                <View style={{ paddingLeft: 5, backgroundColor: '#A7A7A7', borderRadius: 20, height: 40, width: 40, justifyContent: 'center', marginLeft: 5 }}>
                    {props.options &&
                        props.options.map((item, index) =>
                            <TouchableOpacity
                                key={index}
                                onPress={() => voltar(item.voltar, item.table)}
                            >
                                <Icon name="return-up-back" size={30} color="black" />
                            </TouchableOpacity>
                        )}
                </View>
                <View style={styles.nome}>
                    {props.options &&
                        props.options.map((item, index) =>
                            <Text key={index} style={styles.textonome}>{item.title}</Text>
                        )}
                </View>
                <View style={{
                    width: '10%',
                    backgroundColor: '#3C3C3C',
                    height: 10, alignItems: 'center',
                    justifyContent: 'center',
                }}></View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    retornar: {
        width: '100%',
        backgroundColor: '#3C3C3C',
        borderBottomLeftRadius: 40,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingTop: 30,
        gap: 10,
        
    },
    nome: {
        // alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        // backgroundColor: "red"
    },
    textonome: {
        fontSize: 20,
        color: '#A7A7A7',
        fontWeight: 'bold',
        
    }
});