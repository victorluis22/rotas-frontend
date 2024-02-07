import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CardRoute({start, next, client}) {

    return (
        <View style={styles.container}>
            <View style={styles.containertexto}>
                <Text style={styles.contentTitulo}>{client}</Text>
                <Text style={styles.contentText}>Próxima parada: {next}</Text>

                <View style={styles.contentbutton}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Registrar Peso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Confirmar Atendimento</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 10,
        shadowColor: '#3C3C3C',
        marginTop: 15,
    },

    contentTitulo: {
        fontSize: 20,
        fontWeight: "bold",
    },
    contentText: {
        fontSize: 17,
        fontWeight: "bold",
    },
    containertexto: {
        flexDirection: "column",
        width: "90%"
    },
    contentbutton: {
        // flexDirection: "row",
        display: "flex",
        justifyContent: "spacebetween",
    },
    button:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        backgroundColor: "#24a0ed",
        borderRadius: 7,
        marginVertical: 6,
        elevation: 10,
        width: "60%",
        shadowColor: '#3C3C3C'
    },

    buttonText:{
        color: "#fff",
        fontWeight: "bold"
    },
    
});