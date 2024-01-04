import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"

export default function ListaCard({title, description, type, codCliente, codContrato}) {
    const navigation = useNavigation()

    return (
        <View style={styles.contentCard}>
                {
                    type === "cliente" ?
                        <View style={styles.containertexto}>
                            <Text style={styles.contentTitulo}>{title} {description}</Text>
                            <View style={styles.Contentbutton}>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListaContrato", {table: "contrato", codCliente: codCliente})}>
                                    <Text style={styles.buttonText}>Acessar Contratos</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                }

                { 
                    type === "contrato" ?
                        <View style={styles.containertexto}>
                            <Text style={styles.contentTitulo}>{title}</Text>
                            <Text>{description}</Text>
                            <View style={styles.Contentbutton2}>
                                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("ListaHorarioContrato", {table: "horarioContratoCliente", codContrato: codContrato})}>
                                    <Text style={styles.buttonText2}>Acessar Horários</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : 
                    null    
                }

                {
                    type !== "contrato" && type !== "cliente" ?
                    <View style={styles.containertexto}>
                        <Text style={styles.contentTitulo}>{title}</Text>
                        <Text>{description}</Text>
                    </View>
                    :
                    null
                }
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
    },

    button:{
        
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#24a0ed",
        borderRadius: 7,
        marginVertical: 6,
        elevation: 10,
        shadowColor: '#3C3C3C'
    },

    buttonText:{
        color: "#fff",
        fontWeight: "bold"
    },

    Contentbutton: {
        // flexDirection: "row",
        display: "flex",
        justifyContent: "spacebetween",
    },

    button2:{
        
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#24a0ed",
        borderRadius: 7,
        marginVertical: 6,
        elevation: 10,
        shadowColor: '#3C3C3C'
    },

    buttonText2:{
        color: "#fff",
        fontWeight: "bold"
    },

    Contentbutton2: {
        flexDirection: "row",
    }
});