import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import TelaInicial from './screens/telainicial';
import DisponibilidadeVeiculos from './screens/disponibilidadeveiculos';
import ColetaCliente from './screens/coletacliente';
import EntregaCompostagem from './screens/entregacompostagem';
import PontosCompostagem from './screens/pontoscompostagem';
import RotasColeta from './screens/rotascoleta';
import Coleta from './screens/coleta/coleta';
import ColetaMap from './screens/coletamap';
import Loading from "./screens/loading"

import CadastroCliente from './screens/cliente/cadastroCli';
import CadastroVeiculo from './screens/veiculo/cadastroVeic';
import CadastroTipoVeiculo from './screens/veiculo/cadastroTipoVeic';
import CadastroResponsavel from './screens/responsavel/cadastroResp';
import CadastroTipoContrato from './screens/contrato/cadastroTipoContrato';
import CadastroJanelaTempo from './screens/horario/cadastroJanelaTempo';
import CadastroHorario from './screens/horario/cadastroHorario';
import CadastroContrato from './screens/contrato/cadastroContrato';

import ListaDados from './screens/listaDados';
import ListaContrato from './screens/contrato/listaContrato';
import ListaHorarioContrato from './screens/contrato/listaHorarioContrato';

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
              name="CadastroVeiculo" component={CadastroVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroTipoVeiculo" component={CadastroTipoVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroJanelaTempo" component={CadastroJanelaTempo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroHorario" component={CadastroHorario}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroResponsaveis" component={CadastroResponsavel}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroTipoContrato" component={CadastroTipoContrato}
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
              name="CadastroContrato" component={CadastroContrato}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ListaDados" component={ListaDados}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ListaContrato" component={ListaContrato}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ListaHorarioContrato" component={ListaHorarioContrato}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

