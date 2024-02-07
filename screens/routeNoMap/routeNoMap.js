import { View, StyleSheet, ScrollView } from "react-native";
import MenuRetornar from "../../components/menuretornar";
import CardRoute from "./cardRoute/cardRoute";

import routeWeekly from "../../assets/routes/output_weekly.json"
import routeAll from "../../assets/routes/output_all.json"

import { useEffect, useState } from "react";

export default function RoutesNoMap({ route}) {
    const routeData = route.params.routeData
    const [routeList, setRouteList] = useState({})

    const chooseRouteType = (routeType) => {
        if (routeType === "Total"){
            return routeAll
        }
        else{
            return routeWeekly
        }
    }

    useEffect(() => {
        // console.log(routeData)
        // const chosenJSON = chooseRouteType(routeData.routeType)
        // const chosenVehicle = chosenJSON[routeData.vehicle]
        // const chosenDay = chosenVehicle[routeData.day]
        // setRouteList(chosenDay)
    }, [])


    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: 'Rotas de Coleta', voltar: 'RotasColeta' }]} />
            <ScrollView>
                <CardRoute client={"sadsads"} next={"sadsad"} start={"sadsa"} />
                
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
    }
});