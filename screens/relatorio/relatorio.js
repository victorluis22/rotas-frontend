import react, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, TextInput, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import { getConsolidatedData } from "../../services/api";
import { exportConsolidatedReport, exportDetailedReport } from "../../services/xlsx";

export default function Relatorios(){
    const [dataIni, setDataIni] = useState("");
    const [dataFim, setDataFim] = useState("");

    const handleDateChange = (data) => {
        const inputDate = data;
        // Verificar se a data está no formato "Ano-Mês-Dia"
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(inputDate)) {
            return false
        } else {
            return true
        }
    }

    const submitConsolidated = async () => {
        if(dataIni && dataFim){
            if(handleDateChange(dataIni) === false){
                Alert.alert("Erro", "Formato de Data Inicial preenchido de forma inválida.")
                return
            }
            
            if(dataFim != ""){
                if(handleDateChange(dataFim) === false){
                    Alert.alert("Erro", "Formato de Data Final preenchido de forma inválida.")
                    return
                }
            }
            const data = {
                dataIni: dataIni,
                dataFim: dataFim
            }

            try{
                await exportConsolidatedReport(data)
            }
            catch(err) {
                Alert.alert("Erro", "Erro ao exportar relatório consolidado.")
            }
        }
        else{
            Alert.alert("Erro", "Preencha todos os campos de texto.")
        }
    }

    const submitDetailed = async () => {
        if(dataIni && dataFim){
            if(handleDateChange(dataIni) === false){
                Alert.alert("Erro", "Formato de Data Inicial preenchido de forma inválida.")
                return
            }
            
            if(dataFim != ""){
                if(handleDateChange(dataFim) === false){
                    Alert.alert("Erro", "Formato de Data Final preenchido de forma inválida.")
                    return
                }
            }
            const data = {
                dataIni: dataIni,
                dataFim: dataFim
            }

            try{
                await exportDetailedReport(data)
            }
            catch(err) {
                Alert.alert("Erro", "Erro ao exportar relatório detalhado.")
            }
        }
        else{
            Alert.alert("Erro", "Preencha todos os campos de texto.")
        }
    }

    return(
        <View style={styles.container}>

            <MenuRetornar options={[{ title: "Consulta Volumes Coletados", voltar: 'TelaInicial' }]}/>
            
            <View style={styles.content}>
                <Text style={styles.titleinput}>Data Inicial do Périodo - Ex: ano/mês/dia</Text>
                <TextInput style={styles.input} value={dataIni} onChangeText={setDataIni}/>

                <Text style={styles.titleinput}>Data Final do Périodo - Ex: ano/mês/dia</Text>
                <TextInput style={styles.input} value={dataFim} onChangeText={setDataFim}/>
            </View>

            
            <TouchableOpacity style={styles.buttonContent} onPress={() => submitConsolidated()}>
                <Text style={styles.buttonText}>Gerar Relatório Consolidado em XLSX</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonContent} onPress={() => submitDetailed()}>
                <Text style={styles.buttonText}>Gerar Relatório detalhado em XLSX</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        display: 'flex',
    },
    content:{
        marginTop: 20
    },
    buttonText: {
        margin: 10,
        fontSize: 20,
        color: "#D9D9D9",
        fontWeight: "bold",
        textAlign: 'center'
    },

    buttonContent: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#3C3C3C",
        borderRadius: 10,
        marginHorizontal: "10%",
        marginVertical: 20,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: 35,
        alignSelf: 'center',
        margin: 10,
        paddingLeft:15,
        elevation: 5,
        shadowColor: '#3C3C3C'
    },

    titleinput: {
        display: "flex",
        marginLeft: 40,
        color: "#3C3C3C",
        fontSize: 16,
        fontWeight: "bold"
    },
});