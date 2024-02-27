import { View, StyleSheet, ScrollView, Text } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import CardRoute from "./cardRoute/cardRoute";

import routeWeekly from "../../assets/routes/output_weekly.json"
import routeAll from "../../assets/routes/output_all.json"

import { useEffect, useState } from "react";

export default function RoutesNoMap({ route }) {
    const routeData = route.params.routeData
    const [routeList, setRouteList] = useState([])

    const chooseRouteType = (routeType) => {
        if (routeType === "PF - Semanal / Quinzenal"){
            return routeAll
        }
        else{
            return routeWeekly
        }
    }

    useEffect(() => {
        const chosenJSON = chooseRouteType(routeData.routeType)
        const chosenVehicle = chosenJSON[routeData.vehicle]
        const chosenDay = chosenVehicle[routeData.day]
        setRouteList(chosenDay["Route"])
    }, [])


    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: 'Rotas de Coleta', voltar: 'RotasColeta' }]} />
            
            <Text style={styles.Title}>Tipo de Rota: {routeData.routeType}</Text>
            <Text style={styles.Title}>Tipo de Veículo: {routeData.vehicle} </Text>
            <Text style={styles.Title}>Dia da Semana: {routeData.day}</Text>

            <ScrollView>
                {
                    routeList.map((eachRoute) => {
                        return <CardRoute eachRoute={eachRoute}/>
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