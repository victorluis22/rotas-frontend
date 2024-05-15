import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, Alert } from 'react-native';
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperInput } from 'react-native-paper';

import { AuthContext } from '../context/auth';
import { StatusBar } from 'expo-status-bar';

export default function Login() {

  const [username, setUsername] = useState('orgkits')
  const [senha, setSenha] = useState('orgkits7#')
  const { login } = useContext(AuthContext)
  const navigation = useNavigation()
  const [passwordVisible, setPasswordVisible] = useState(true)

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
      if(e.response.status === 401){
        Alert.alert("Erro", 'Login ou senha inválidos. Verifique e corrija os dados digitados e tente novamente.')
      }
      else{
        Alert.alert("Erro", 'Erro interno, tente novamente mais tarde.')
      }
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
        <PaperInput
          label={"Login"}
          onChangeText={setUsername}
          style={{marginBottom: 20}}
        />

        <PaperInput
          label={"Senha"}
          onChangeText={setSenha} 
          secureTextEntry={passwordVisible}
          style={{marginBottom: 20}}
          right={
            <PaperInput.Icon 
              icon={passwordVisible ? 'eye' : 'eye-off'}
              size={30}
              color={"#3C3C3C"}
              onPress={() => setPasswordVisible(!passwordVisible)}
              
            />
          }
        />  

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
