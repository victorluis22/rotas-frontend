import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import MenuRetornar from "../../components/menuretornar";

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useState, useEffect } from "react";

import routeWeekly from "../../assets/routes/output_weekly.json"
import routeAll from "../../assets/routes/output_all.json"

import startIcon from "../../assets/imagens/inicio.png"
import midIcon from "../../assets/imagens/meio.png"
import finalIcon from "../../assets/imagens/fim.png"

export default function RoutesMap({ route }) {
    const routeData = route.params.routeData
    const [routeList, setRouteList] = useState([])
    const [origin, setOrigin] = useState({})
    const [destination, setDestination] = useState({})
    const [waypoints, setWayPoints] = useState([])

    const chooseRouteType = (routeType) => {
        if (routeType === "PF - Semanal / Quinzenal"){
            return routeAll
        }
        else{
            return routeWeekly
        }
    }

    const handleGeocode = async (address) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address
                )}&key=${process.env.EXPO_PUBLIC_GEOCODE_API_KEY}`
            );

            const data = await response.json();

            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                return { latitude: parseFloat(lat), longitude: parseFloat(lng) };
            } else {
                Alert.alert('Endereço não encontrado');
            }
        } catch (error) {
            console.error('Erro ao converter endereço:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const chosenJSON = chooseRouteType(routeData.routeType)
            const chosenVehicle = chosenJSON[routeData.vehicle]
            const chosenDay = chosenVehicle[routeData.day]
            const routes = chosenDay["Route"];

            const markers = await Promise.all(routes.map(async (route, index) => {
                const coordinates = await handleGeocode(route["Departure address"]);

                if (index === 0){
                    setOrigin(coordinates)
                    return <Marker
                        key={index}
                        image={startIcon}
                        coordinate={coordinates}
                        title={route["Departure address"]}
                        description={`Início: ${route["From"]["type"]}`}
                    />;
                }
                else if (index === routes.length-1){
                    setDestination(coordinates)
                    return <Marker
                        key={index}
                        image={finalIcon}
                        coordinate={coordinates}
                        title={route["Departure address"]}
                        description={`Fim: ${route["From"]["type"]}`}
                    />;
                }
                else{
                    setWayPoints([...waypoints, coordinates])
                    return <Marker
                        key={index}
                        image={midIcon}
                        coordinate={coordinates}
                        title={route["Departure address"]}
                        description={`Intermediário: ${route["From"]["type"]}`}
                    />;
                }
                
            }));

            setRouteList(markers);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <MenuRetornar options={[{ title: 'Rotas de Coleta', voltar: 'RotasColeta' }]} />

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -22.2871,
                    longitude: -42.5337,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
            >
                {routeList}

                <MapViewDirections
                    origin={`${origin.latitude},${origin.longitude}`}
                    waypoints={waypoints}
                    destination={`${destination.latitude},${destination.longitude}`}
                    apikey={process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        display: 'flex',
        flex: 1,
        // justifyContent: "center" 
    },
    Title: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5
    },
    map: {
        flex: 1,
        width: "100%",
    }
});

