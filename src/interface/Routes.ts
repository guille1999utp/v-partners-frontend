import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AppStackParamList = {
  Buscar: undefined;
  Usuario: { login?: string };
};

export type SearchUsuarioNavigationProp = StackNavigationProp<AppStackParamList, 'Buscar'>;

export type UserScreenRouteProp = RouteProp<AppStackParamList, 'Usuario'>;