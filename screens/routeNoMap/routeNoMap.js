import MenuRetornar from "../../components/menuretornar";
import CardRoute from "./cardRoute/cardRoute";

import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RoutesNoMap({ route }) {
    const routeData = route.params.routeData
    const [routeList, setRouteList] = useState([])
    const navigation = useNavigation()

    const fetchRoute = async (routeType) => {
        if (routeType === "PF - Semanal / Quinzenal"){
            try{
                const response = await api.get("/json/buscar?type=all")
                const chosenVehicleRoute = response.data.route[routeData.vehicle]
                const chosenDayRoute = chosenVehicleRoute[routeData.day]
                setRouteList(chosenDayRoute["Route"])
            }
            catch(err){
                Alert.alert("Erro", "Erro ao pegar dados da rota.")
                console.log(err)
                navigation.goBack()
            }
        }
        else{
            try{
                const response = await api.get("/json/buscar?type=weekly")
                const chosenVehicleRoute = response.data.route[routeData.vehicle]
                const chosenDayRoute = chosenVehicleRoute[routeData.day]
                setRouteList(chosenDayRoute["Route"])
            }
            catch(err){
                Alert.alert("Erro", "Erro ao pegar dados da rota.")
                navigation.goBack()
            }
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
    }
});