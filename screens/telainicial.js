import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import HamburguerMenu from '../components/hambuguermenu';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export default function TelaInicial() {

  const navigation = useNavigation()

  function navegarRotasColeta() {
    navigation.navigate('RotasColeta');
  }

  function navegarColeta() {
    navigation.navigate('Coleta');
  }

  function navegarRelatorios() {
    navigation.navigate('Relatorios');
  }

  function navegarClientes() {
    navigation.navigate('ListaDados', {table: "clientes"});
  }

  return (
    <View style={styles.container}>
      <HamburguerMenu
        options={[
          { title: 'Veículos', screen: 'ListaDados', table: "veiculos" },
          { title: 'Tipos de Veículos', screen: 'ListaDados', table: "tipoVeiculo" }, 
          { title: 'Janela de Tempo', screen: 'ListaDados', table: "janelaTempo" }, 
          { title: 'Horários', screen: 'ListaDados', table: "horarios" },
          { title: 'Responsáveis', screen: 'ListaDados', table: "responsaveis" }, 
          { title: 'Tipos de Contrato', screen: 'ListaDados', table: "tipoContrato" }, 
          { title: 'Pontos de Compostagem', screen: 'ListaDados', table: "pontosCompostagem" }, 
          ]}
      />
      <ScrollView>


        <View style={styles.containersuperior}>
          <View style={styles.containerdentro}>

            <TouchableOpacity
              onPress={navegarRotasColeta}
              style={styles.botao}
            >
              <ImageBackground
                source={require('../assets/imagens/mapa.png')}
                style={styles.imagensbackground}
              >
                <Text style={{ paddingVertical: 10, paddingLeft: 10, fontSize: 20 }}>
                  Rotas de Coleta
                </Text>
              </ImageBackground>

            </TouchableOpacity>
          </View>

          {/* <View style={styles.containerdentro}>
            <TouchableOpacity
              onPress={navegarColeta}
              style={styles.botao}
            >
              <View style={{ flexDirection: 'row', backgroundColor: '#9D9D9D', borderRadius: 30, flexDirection: 'row-reverse', }}>
                <View>

                </View>

                <ImageBackground
                  source={require('../assets/imagens/coleta.png')}
                  style={styles.imagensbackground2}
                >

                </ImageBackground>
                <Text style={{ paddingVertical: 10, paddingLeft: 10, fontSize: 20, flexDirection: 'column-reverse', flex: 1 }}>
                  Coleta
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <View style={styles.containerdentro}>
            <TouchableOpacity style={styles.botao} onPress={()=> navegarClientes()}>
              <ImageBackground
                source={require('../assets/imagens/identidade.png')}
                resizeMode='cover'
                style={styles.imagensbackground}
              >
                <Text style={{ paddingVertical: 10, paddingLeft: 10, fontSize: 20 }}>
                  Clientes
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.containerdentro}>
            <TouchableOpacity style={styles.botao} onPress={()=> navegarRelatorios()}>
              <ImageBackground
                source={require('../assets/imagens/report.jpg')}
                resizeMode='cover'
                
                style={styles.imagensbackground}
              >
                <Text style={{ paddingVertical: 10, paddingLeft: 10, fontSize: 20 }}>
                  Relatórios
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.containerinferior}>

        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#D9D9D9',
    height: '100%',
    display: 'flex',

  },
  containerinferior: {
    height: '15%',
  },
  containersuperior: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    width: '100%',
  },
  imagensbackground: {
    width: '100%',
    height: 160,
    borderRadius: 30,
    overflow: "hidden"
  },
  containerdentro: {
    width: '100%',
    height: 100,
    marginBottom: 100,
    maxWidth: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  imagensbackground2: {
    width: '100%',
    maxWidth: '50%',
    height: 160,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: '#9D9D9D',
  },
  botao: {
    elevation: 10,
    shadowColor: '#3C3C3C',
    borderRadius: 30
  }
});