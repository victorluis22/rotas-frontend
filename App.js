import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import TelaInicial from './screens/telainicial';
import AlocacaodeHorarios from './screens/alocacaodehorarios';
import DisponibilidadeVeiculos from './screens/disponibilidadeveiculos';
import ColetaCliente from './screens/coletacliente';
import EntregaCompostagem from './screens/entregacompostagem';
import ResponsavelVeiculo from './screens/responsavelveiculo';
import CadastroVeiculo from './screens/veiculo/cadastroveiculo/cadastroveiculos';
import DiasdaSemana from './screens/diasdasemana';
import JaneladeTempo from './screens/janeladetempo';
import Responsaveis from './screens/responsaveis';
import TipodeContrato from './screens/tipodecontrato';
import PontosCompostagem from './screens/pontoscompostagem';
import RotasColeta from './screens/rotascoleta';
import Coleta from './screens/coleta/coleta';
import ColetaMap from './screens/coletamap';
import Loading from "./screens/loading"
import CadastroCliente from './screens/cliente/cadastroCliente/cadastroCli';
import ListaDados from './screens/listaDados';

import { AuthProvider } from './context/auth';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="Login" component={Login}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="TelaInicial" component={TelaInicial}
            />

            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="AlocacaodeHorarios" component={AlocacaodeHorarios}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="DisponibilidadeVeiculos" component={DisponibilidadeVeiculos}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ColetaCliente" component={ColetaCliente}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="EntregaCompostagem" component={EntregaCompostagem}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ResponsavelVeiculo" component={ResponsavelVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroVeiculo" component={CadastroVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="DiasdaSemana" component={DiasdaSemana}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="JaneladeTempo" component={JaneladeTempo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="Responsaveis" component={Responsaveis}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="TipodeContrato" component={TipodeContrato}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="PontosCompostagem" component={PontosCompostagem}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="RotasColeta" component={RotasColeta}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="Coleta" component={Coleta}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ColetaMap" component={ColetaMap}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroCliente" component={CadastroCliente}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ListaDados" component={ListaDados}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

