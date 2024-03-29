import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, ScrollView } from "react-native";
import MenuRetornar from "../components/menuretornar";
import Select from "../components/select";
import { useNavigation } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { get } from "../services/api";



export default function RotasColeta() {

    const [vehicle, setVehicle] = useState("")
    const [allVehicles, setAllVehicles] = useState([])

    const [day, setDay] = useState("")
    const [routeType, setRouteType] = useState("")

    const navigation = useNavigation()

    const getVehicles = async () => {
        const response = await get("veiculos")
        setAllVehicles(response.data)
    }

    function routeGenerate(type) {
        const routeData = {
            vehicle,
            day,
            routeType
        }

        if (type === "simples"){
            navigation.navigate('RoutesNoMap', {routeData: routeData })
        }
        else{
            navigation.navigate('RoutesMap', {routeData: routeData })
        }
        
    }

    useEffect(() => {
        getVehicles()
    }, [])

    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: 'Rotas de Coleta', voltar: 'TelaInicial' }]} />
            <View style={styles.content}>
                
                <Text style={styles.titleinput}>Selecione o tipo de Contrato</Text>
                <Picker
                    style={styles.input}
                    selectedValue={routeType}
                    onValueChange={(itemValue) =>
                        setRouteType(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    <Picker.Item label="PF - Semanal" value="PF - Semanal" />
                    <Picker.Item label="PF - Semanal / Quinzenal" value="PF - Semanal / Quinzenal" />
                    <Picker.Item label="PJ" value="PJ" />
                </Picker>

                <Text style={styles.titleinput}>Selecione o veículo</Text>
                <Picker
                    style={styles.input}
                    selectedValue={vehicle}
                    onValueChange={(itemValue) =>
                        setVehicle(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    {
                        allVehicles.map((eachVehicle) => {
                            return <Picker.Item key={eachVehicle.CodVeic} label={eachVehicle.Descricao} value={eachVehicle.Descricao} />
                        })
                    }
                
                </Picker>

                <Text style={styles.titleinput}>Selecione o Dia da Semana</Text>
                <Picker
                    style={styles.input}
                    selectedValue={day}
                    onValueChange={(itemValue) =>
                        setDay(itemValue)
                    }>
                    <Picker.Item label="Selecione" value="" enabled={false}/>
                    <Picker.Item label="Segunda-feira" value="Segunda-feira" />
                    <Picker.Item label="Terça-feira" value="Terça-feira" />
                    <Picker.Item label="Quarta-feira" value="Quarta-feira" />
                    <Picker.Item label="Quinta-feria" value="Quinta-feira" />
                    <Picker.Item label="Sexta-feira" value="Sexta-feira" />
                    <Picker.Item label="Sábado" value="Sábado-feira" />
                    <Picker.Item label="Domingo" value="Domingo-feira" />
                    
                </Picker>

                <TouchableOpacity onPress={() => routeGenerate("simples")} style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Gerar Rota Simples</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => routeGenerate("mapa")} style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Gerar Rota Com Mapa</Text>
                </TouchableOpacity> */}
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
    content:{
        marginTop: 20
    },
    buttonText: {
        margin: 10,
        fontSize: 20,
        color: "#D9D9D9",
        fontWeight: "bold"
    },

    buttonContent: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#3C3C3C",
        borderRadius: 10,
        marginHorizontal: "10%",
        marginVertical: 40,
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