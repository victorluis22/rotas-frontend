import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, Alert } from 'react-native';
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../context/auth';
import { StatusBar } from 'expo-status-bar';

export default function Login() {

  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const { login } = useContext(AuthContext)
  const navigation = useNavigation()

  function navegarTelaInicial() {
    navigation.navigate('TelaInicial');
  }

  async function handleSignIn() {
    const data = {
      username,
      senha
    }

    // navegarTelaInicial()
    try{
      await login(data)
      navegarTelaInicial();
    }
    catch(e){
      console.log(e)
      Alert.alert('Erro', 'Erro ao logar, tente novamente.')
    }
  }

  return (
    <View style={styles.container}>
      <Image
          source={require('../assets/imagens/logo.png')}
          style={styles.imagemLogin}
          resizeMode="contain"
      />
      <View style={styles.container2}>
        <Text style={{ color: "#3C3C3C", fontWeight: "bold", fontSize: 20 }}>
          Login
        </Text>
        <TextInput style={styles.caixadetexto} onChangeText={setUsername}>
        </TextInput>
        <Text style={{ color: "#3C3C3C", fontWeight: "bold", fontSize: 20 }}>
          Senha
        </Text>
        <TextInput style={styles.caixadetexto} onChangeText={setSenha} secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight
          style={styles.butao}
          onPress={handleSignIn}
        >
          <Text style={{ fontSize: 20, color: "#D9D9D9", fontWeight: "bold", textAlign: "center" }}>
            Entrar
          </Text>
        </TouchableHighlight>
      </View>
      <StatusBar style='dark'/>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  container2: {
    flexDirection: 'column',
    width: '90%',
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 10,
    shadowColor: '#3C3C3C',
  },
  textoLogin: {
    textAlign: 'center',
    fontSize: 40
  },
  caixadetexto: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    height: 35,
    alignSelf: 'center',
    margin: 20,
    paddingLeft:15,
    borderWidth: 1,
    borderColor: '#D9D9D9'
  },
  butao: {
    backgroundColor: '#3C3C3C',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 20,
    // height: 35,
    paddingVertical: 10,
  },
  imagemLogin: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});
