import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"

import { Buffer } from "buffer";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { getClientQRCode } from "../services/api";

export default function ListaCard({title, description, type, clientName, vehicleName, pointName, codCliente, codContrato, codVeic, codPonto, }) {
    const navigation = useNavigation()

    const exportFile = async () => {
        try{
            const qrCode = await getClientQRCode(codCliente)
            const buff = Buffer.from(qrCode.data.pdfData.data, "base64");
            const base64 = buff.toString("base64");
            

            const path = `${FileSystem.documentDirectory}/${encodeURI("qrcode")}.pdf`;
            await FileSystem.writeAsStringAsync(`${path}`, base64, {
                encoding: FileSystem.EncodingType.Base64,
            });

            await Sharing.shareAsync(path, { mimeType: 'application/pdf' });
            
        }
        catch (err) {
            
            console.log(err)
            Alert.alert("Erro", "Erro ao gerar PDF")
        }
	}

    return (
        <View style={styles.contentCard}>
                {
                    type === "cliente" ?
                        <View style={styles.containertexto}>
                            <Text style={styles.contentTitulo}>{title} {description}</Text>
                            <View style={styles.contentbutton}>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListaContrato", {table: "contrato", codCliente: codCliente, clientName: title})}>
                                    <Text style={styles.buttonText}>Acessar Contratos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.button, backgroundColor: "#7bc043"}} onPress={() => exportFile()}>
                                    <Text style={styles.buttonText}>QRCode</Text>
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
                            <View style={styles.contentbutton}>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListaHorarioContrato", {table: "horarioContratoCliente", codContrato: codContrato, clientName: clientName})}>
                                    <Text style={styles.buttonText}>Acessar Horários</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : 
                    null    
                }

                { 
                    type === "veiculo" ?
                        <View style={styles.containertexto}>
                            <Text style={styles.contentTitulo}>{title}</Text>
                            <Text>{description}</Text>
                            <View style={styles.contentbutton}>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListaRespVeiculo", {table: "responsavelVeiculo", codVeic: codVeic, vehicleName: vehicleName})}>
                                    <Text style={styles.buttonText}>Acessar Responsáveis</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListaHorarioVeiculo", {table: "horarioVeiculo", codVeic: codVeic, vehicleName: vehicleName})}>
                                    <Text style={styles.buttonText}>Acessar Horários</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : 
                    null    
                }

                { 
                    type === "pontosCompostagem" ?
                        <View style={styles.containertexto}>
                            <Text style={styles.contentTitulo}>{title}</Text>
                            <Text>{description}</Text>
                            <View style={styles.contentbutton}>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListaHorarioPonto", {table: "horarioPonto", codPonto: codPonto, pointName: pointName})}>
                                    <Text style={styles.buttonText}>Acessar Horários</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : 
                    null    
                }

                {
                    type !== "contrato" && type !== "cliente" && type !== "pontosCompostagem" && type !== "veiculo" ?
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
        width: "90%"
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

    contentbutton: {
        // flexDirection: "row",
        display: "flex",
        justifyContent: "spacebetween",
    }
});