import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import SearchUsuario from "../screen/SearchUsuario";
import User from "../screen/User";
import { AppStackParamList } from "../interface/Routes";

const Stack = createStackNavigator<AppStackParamList>();

function StackNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Buscar" component={SearchUsuario} options={{ title: 'Buscar Usuario' }}/>
        <Stack.Screen name="Usuario" component={User} options={({ route }) => ({ title: route.params?.login || 'Usuario' })}/>
      </Stack.Navigator>
    );
  }



export default StackNavigation;