import MenuRetornar from "../../components/menuretornar";
import CardRoute from "./cardRoute/cardRoute";

import { useEffect, useState } from "react";
import { getLatestAllRoute, getLatestWeeklyRoute } from "../../services/api";
import { View, StyleSheet, ScrollView, Text, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { exportRouteXLSX } from "../../services/xlsx";

export default function RoutesNoMap({ route }) {
    const routeData = route.params.routeData
    const [routeList, setRouteList] = useState([])
    const [filename, setFilename] = useState("")
    const navigation = useNavigation()

    const fetchRoute = async (routeType) => {
        if (routeType === "PF - Semanal / Quinzenal" || routeType === "PJ"){
            try{
                const response = await getLatestAllRoute()
                const chosenVehicleRoute = response.data.route[routeData.vehicle]
                const chosenDayRoute = chosenVehicleRoute[routeData.day]
                setRouteList(chosenDayRoute["Route"])
                setFilename(response.data.filename)
            }
            catch(err){
                Alert.alert("Erro", `Não existe rota criada para os casos de cliente ${routeType}, veículo ${routeData.vehicle} e dia da semana ${routeData.day}.`)
                navigation.goBack()
            }
        }
        else{
            try{
                const response = await getLatestWeeklyRoute();
                const chosenVehicleRoute = response.data.route[routeData.vehicle]
                const chosenDayRoute = chosenVehicleRoute[routeData.day]
                setRouteList(chosenDayRoute["Route"])
                setFilename(response.data.filename)
            }
            catch(err){
                Alert.alert("Erro", `Não existe rota criada para os casos de cliente ${routeType}, veículo ${routeData.vehicle} e dia da semana ${routeData.day}.`)
                navigation.goBack()
            }
        }
    }

    const generateXLSX = async () =>  {
        try{
            await exportRouteXLSX(routeList);
        }
        catch (err){
            console.log(err)
            Alert.alert("Erro", "Erro ao gerar XLSX da rota");
        }
    }

    useEffect(() => {
       fetchRoute(routeData.routeType)
    }, [])

    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: 'Rotas de Coleta', voltar: 'RotasColeta' }]} />
            
            <Text style={styles.Title}>Tipo de Rota: {routeData.routeType}</Text>
            <Text style={styles.Title}>Tipo de Veículo: {routeData.vehicle} </Text>
            <Text style={styles.Title}>Dia da Semana: {routeData.day}</Text>
            <Text style={styles.Title}>Fonte: {filename}</Text>

            <TouchableOpacity style={styles.button} onPress={() => generateXLSX()}>
                <Text style={styles.buttonText}>Gerar XLSX das Rotas</Text>
            </TouchableOpacity>


            <ScrollView>
                {
                    routeList.map((eachRoute, index) => {
                        return <CardRoute key={index} eachRoute={eachRoute} isLast={index === routeList.length - 1}/>
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        display: 'flex',
        justifyContent: "center" 
    },
    Title: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5
    },

    button:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#24a0ed",
        borderRadius: 7,
        marginVertical: 20,
        width: 280,
        alignSelf: 'center'
    },

    buttonText:{
        color: "#fff",
        fontWeight: "bold"
    },
});