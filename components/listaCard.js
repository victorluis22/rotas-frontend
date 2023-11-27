import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"

export default function ListaCard({title, description}) {
    return (
        <View style={styles.contentCard}>
            <View style={styles.containertexto}>
                <Text style={styles.contentTitulo}>{title}</Text>
                <Text>{description}</Text>
            </View>
            <View>
                <Icon name="rightcircleo" size={30} color={"#000"} />
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
    },

    titulo: {
        textAlign: 'center',
        fontSize: 30,
        backgroundColor: "#3C3C3C",
        borderEndStartRadius: "10px",
        marginTop: "40px"
    },
    
    containertexto: {
        flexDirection: "column",
    },

    contentCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 10,
        shadowColor: '#3C3C3C'
    },

    contentTitulo: {
        fontSize: 20,
        fontWeight: "bold",
    }
});