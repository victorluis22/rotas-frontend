import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import moment from 'moment';

export default function HorarioInput({ options, onChangeSelect, text }) {


    const [horario, setHorario] = useState('');

    const handleHorarioChange = (text) => {
        let formattedText = text;

        // Remover todos os caracteres não numéricos
        formattedText = formattedText.replace(/[^\d]/g, '');

        // Adicionar ":" após dois caracteres
        if (formattedText.length > 2) {
            formattedText = formattedText.replace(/(\d{2})/, '$1:');
        }

        // Verificar se o texto começa com ":" para permitir a exclusão
        if (formattedText.startsWith(':')) {
            formattedText = formattedText.slice(1);
        }

        if (formattedText.length > 4) {
            formattedText = formattedText.slice(0, 5);
        }

        setHorario(formattedText);
    };

    const validarHorario = () => {
        const formatoHorario = 'HH:mm';
        const horarioValido = moment(horario, formatoHorario, true).isValid();

        if (horarioValido) {
            console.log('Horário válido:', horario);
            // Faça algo com o horário válido, como enviá-lo para um servidor ou atualizar o estado do componente pai
        } else {
            console.log('Horário inválido:', horario);
            // Exiba uma mensagem de erro ou faça algo para lidar com o horário inválido
        }
    };



    return (
        <View>
            <TextInput
                placeholder="00:00"
                value={horario}
                onChangeText={handleHorarioChange}
                keyboardType="numeric"
                style={styles.caixadetexto}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        display: 'flex',
    },
    containerdentro: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 5
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    caixadetexto: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 30,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft:15,

    },

});