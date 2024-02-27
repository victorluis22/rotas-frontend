import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

export default function CardRoute({ eachRoute }) {

    const [peso, setPeso] = useState("")
    const [checked, setChecked] = useState(false)

    const getStartData = async () => {
        if (eachRoute["To"]["type"] === "Cliente"){
            
        }
    }

    const getDestinationData = async () => {
        if (eachRoute["From"]["type"] === "Cliente"){
            
        }
    }

    const handleConfirmation = () => {
        if( peso === ""){
            Alert.alert("Erro", "Preencha o Peso antes!")
        }
        else{
            setChecked(!checked)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.containertexto}>
                <View style={{opacity: checked ? 0.3 : 1}}>
                    <Text style={styles.contentTitulo}>Início</Text>
                    <Text style={styles.contentTextClient}>Cliente: {eachRoute["From"]["id"]}</Text>
                    <Text style={styles.contentText}>Começo: {eachRoute["Departure address"]}</Text>

                    <Text style={styles.contentTitulo}>Fim</Text>
                    <Text style={styles.contentTextClient}>Cliente: {eachRoute["To"]["id"]}</Text>
                    <Text style={styles.contentText}>Próxima parada: {eachRoute["Destination address"]}</Text>
                    <TextInput 
                        style={styles.caixadetexto} 
                        placeholder="Digite o peso aqui em KG" 
                        onChangeText={setPeso} 
                        keyboardType="numeric"
                        editable={checked ? false: true}
                    ></TextInput>
                </View>

                <View style={styles.contentbutton}>
                    <TouchableOpacity style={{...styles.button, backgroundColor: checked ? "#fe4a49" : "#24a0ed"}} onPress={() => handleConfirmation()}>
                        <Text style={styles.buttonText}>{checked ? "Alterar Peso" : "Confirmar Atendimento"}</Text>
                    </TouchableOpacity>
                    {
                        checked ?
                            <AntDesign name="checkcircleo" size={24} color="green" />
                        : 
                            null
                    }
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
        margin: 15,
    },

    contentTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        borderBottomWidth: 1,
        marginVertical: 20,
        paddingBottom: 10,
        borderStyle: "dashed"
    },
    contentText: {
        fontSize: 17,
        backgroundColor: "lightgray",
        padding: 10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        
    },
    contentTextClient: {
        fontSize: 17,
        fontWeight: "bold",
        backgroundColor: "#24a0ed",
        padding: 10,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    containertexto: {
        flexDirection: "column",
        width: "90%"
    },
    contentbutton: {
        gap: 100,
        flexDirection: "row",
        display: "flex",
        justifyContent: "spacebetween",
        alignItems: "center",
    },
    button:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#24a0ed",
        borderRadius: 7,
        marginVertical: 6
    },

    buttonText:{
        color: "#fff",
        fontWeight: "bold"
    },
    caixadetexto: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        height: 35,
        alignSelf: 'center',
        margin: 20,
        paddingLeft: 15,
      }
});