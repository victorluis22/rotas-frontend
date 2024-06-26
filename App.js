import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/login';
import TelaInicial from './screens/telainicial';
import RotasColeta from './screens/rotascoleta';
import Loading from "./screens/loading"

import CadastroCliente from './screens/cliente/cadastroCli';
import CadastroVeiculo from './screens/veiculo/cadastroVeic';
import CadastroTipoVeiculo from './screens/veiculo/cadastroTipoVeic';
import CadastroResponsavel from './screens/responsavel/cadastroResp';
import CadastroTipoContrato from './screens/contrato/cadastroTipoContrato';
import CadastroJanelaTempo from './screens/horario/cadastroJanelaTempo';
import CadastroHorario from './screens/horario/cadastroHorario';
import CadastroContrato from './screens/contrato/cadastroContrato';
import CadastroHorarioContrato from './screens/contrato/cadastroHorarioContrato';
import CadastroPontosCompostagem from './screens/pontosComp/cadastroPontosComp';
import CadastroHorarioPonto from './screens/pontosComp/cadastroHorarioPonto';
import CadastroHorarioVeiculo from './screens/veiculo/cadastroHorarioVeiculo';
import CadastroRespVeiculo from './screens/veiculo/cadastroRespVeiculo';

import ListaDados from './screens/listaDados/listaDados';
import ListaContrato from './screens/contrato/listaContrato';
import ListaHorarioContrato from './screens/contrato/listaHorarioContrato';
import ListaHorarioPonto from './screens/pontosComp/listaHorarioPonto';
import ListaHorarioVeiculo from './screens/veiculo/listaHorarioVeiculo';
import ListaRespVeiculo from './screens/veiculo/listaRespVeiculo';

import RoutesNoMap from './screens/routeNoMap/routeNoMap';
import RoutesMap from './screens/routeMap/routeMap';

import Relatorios from './screens/relatorio/relatorio';

import { AuthProvider } from './context/auth';
import { StatusBar } from 'expo-status-bar';

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
              name="CadastroPontosCompostagem" component={CadastroPontosCompostagem}
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
              name="CadastroHorarioContrato" component={CadastroHorarioContrato}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroHorarioVeiculo" component={CadastroHorarioVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroRespVeiculo" component={CadastroRespVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="CadastroHorarioPonto" component={CadastroHorarioPonto}
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
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ListaHorarioVeiculo" component={ListaHorarioVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ListaRespVeiculo" component={ListaRespVeiculo}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="ListaHorarioPonto" component={ListaHorarioPonto}
            />
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="RoutesNoMap" component={RoutesNoMap}
            />
            {/* <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="RoutesMap" component={RoutesMap}
            /> */}
            <Stack.Screen
              options={{
                title: '',
                headerTransparent: true,
                headerShown: false
              }}
              name="Relatorios" component={Relatorios}
            />
          </Stack.Navigator>
          <StatusBar style='light'/>
        </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

