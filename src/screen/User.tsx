import React, { useState, useEffect } from 'react';
import { VStack, Box, Spinner, Heading, Text, Avatar, Link, HStack } from 'native-base';
import Axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { customAlert } from '../utils/CustomAlert';
import { ALERT_TYPE } from 'react-native-alert-notification';
import { UserScreenRouteProp } from '../interface/Routes';
import { UserGeneralData } from '../interface/Users';

const User = () => {
  const route = useRoute<UserScreenRouteProp>();
  const login = route.params?.login;

  const [usuario, setUsuario] = useState<UserGeneralData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await Axios.get<UserData>(`https://api.github.com/users/${login}`);
        setUsuario(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        customAlert("Error","Error al buscar al usuario.",ALERT_TYPE.DANGER);
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [login]);

  return (
    <VStack flex={1} p={4} justifyContent="center" alignItems="center">
      {loading ? (
        <Spinner color="blue.500" />
      ) : usuario ? (
        <Box width="100%" alignItems="center">
          <Avatar source={{ uri: usuario.avatar_url }} size="2xl" mb={4} />
          <Heading fontSize="xl" mb={2}>
            {usuario.name || 'Nombre no disponible'}
          </Heading>
          <Text mb={2} fontWeight="bold" fontSize="md" color="gray.500">
            {usuario.login}
          </Text>

          {/* Información Adicional */}
          <VStack alignItems="flex-start" width="100%" space={2}>
            <Text fontSize="md">{`ID: ${usuario.id}`}</Text>
            {usuario.bio && <Text fontSize="md">{`Biografía: ${usuario.bio}`}</Text>}
            <Text fontSize="md">{`Repositorios Públicos: ${usuario.public_repos}`}</Text>
            <Text fontSize="md">{`Seguidores: ${usuario.followers}`}</Text>
            {usuario.email && (
              <Text fontSize="md">
                Correo Electrónico: <Link color="blue.500" href={`mailto:${usuario.email}`}>{usuario.email}</Link>
              </Text>
            )}
            {usuario.blog && (
              <Text fontSize="md">
                Sitio Web: <Link color="blue.500" href={usuario.blog} target="_blank">{usuario.blog}</Link>
              </Text>
            )}
          </VStack>
        </Box>
      ) : (
        <Text>Error al cargar la información del usuario.</Text>
      )}
    </VStack>
  );
};

export default User;
