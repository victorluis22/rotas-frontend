import { StyleSheet, Text, View, Image, TextInput, Button, Pressable, TouchableHighlight } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

export default function Login() {

  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')

  const navigation = useNavigation()

  function navegarTelaInicial() {
    navigation.navigate('TelaInicial');
  }

  async function handleSignIn() {
    const data = {
      username,
      senha
    }

    navegarTelaInicial();
    console.log(data);

  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.textoLogin}>
          App de Rotas
        </Text>
      </View>
      <View>
        <Image
          source={require('../assets/imagens/roadmap.png')}
          style={styles.imagemLogin}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container2}>
        <Text style={{ fontSize: 16, marginLeft: 42 }}>
          Login
        </Text>
        <TextInput style={styles.caixadetexto} onChangeText={setUsername}>
        </TextInput>
        <Text style={{ fontSize: 16, marginLeft: 42 }}>
          Senha
        </Text>
        <TextInput style={styles.caixadetexto} onChangeText={setSenha}>
        </TextInput>
        <TouchableHighlight
          style={styles.butao}
          onPress={handleSignIn}

        >
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 14, justifyContent: 'center' }}>
            Entrar
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={{ alignItems: 'flex-end', alignSelf: 'center' }}>
          Powered by IPRJ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#D9D9D9',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between'
  },
  container1: {
    marginTop: 53,
  },
  container2: {
    flexDirection: 'column',
    marginTop: -100,
  },
  textoLogin: {
    textAlign: 'center',
    fontSize: 40
  },
  caixadetexto: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    height: 35,
    alignSelf: 'center',
    margin: 20,
    paddingLeft:15,
  },
  butao: {
    backgroundColor: '#3C3C3C',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20,
    height: 35,
  },
  imagemLogin: {
    width: '80%',
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',

  }
});
