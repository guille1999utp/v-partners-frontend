import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import {
  Input,
  Stack,
  Button,
  FormControl,
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
} from 'native-base';
import { ALERT_TYPE } from 'react-native-alert-notification';

import { useFormik } from 'formik';
import Axios from 'axios';
import { customAlert } from '../utils/CustomAlert';
import GraphicBar from '../components/GraphicBar';
import { SearchResult, User } from '../interface/Users';
import { SearchUsuarioNavigationProp } from '../interface/Routes';

interface SearchUsuarioProps {
  navigation: SearchUsuarioNavigationProp;
}

const SearchUsuario: React.FC<SearchUsuarioProps> = ({ navigation }) => {
  const [result, setResult] = useState<User[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { values, setFieldValue, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      usuario: '',
    },
    validate: (values) => {
      const errors: { usuario?: string } = {};

      if (values.usuario.length < 4) {
        errors.usuario = 'Debe tener al menos 4 letras.';
      }

      if (values.usuario.toLowerCase() === 'doublevpartners') {
        errors.usuario = 'La palabra "doublevpartners" no está permitida.';
      }

      return errors;
    },
    onSubmit: async (value) => {
      const user: string = value.usuario;

      try {
        setLoading(true); 

        const response = await Axios.get<SearchResult>(`https://api.github.com/search/users?q=${user}`);

        const items = response.data.items;

        if (items.length === 0) {
          setSearchError('No se encontraron usuarios.');
        } else {
          setSearchError(null);
          setResult(items.slice(0, 10).map((item) => ({ id: item.id, login: item.login, avatar: item.avatar_url })));
        }

        Keyboard.dismiss();
      } catch (error) {
        console.error('Error:', error);
        customAlert('Error', 'Error en la búsqueda.', ALERT_TYPE.DANGER);
        setSearchError('Error en la búsqueda.');
      } finally {
        setLoading(false); 
      }
    },
  });

  return (
    <Box flex={1} px="3" my="4">
      <Stack space={4} w="100%" h="100%" mx="auto">
        <FormControl isRequired isInvalid={errors.usuario && touched.usuario}>
          <FormControl.Label>Usuario</FormControl.Label>
          <Input
            defaultValue=""
            placeholder="Ingrese Usuario"
            value={values.usuario}
            onChangeText={(text) => setFieldValue('usuario', text)}
            onSubmitEditing={handleSubmit}
          />
          <FormControl.ErrorMessage>{errors.usuario}</FormControl.ErrorMessage>
          <Button style={style.botton} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : 'Buscar'}
          </Button>
        </FormControl>
        {searchError ? (
          <Text color="red.500" fontWeight="bold">
            {searchError}
          </Text>
        ) : result.length > 0 ? (
          <Box flex={1}>
            <GraphicBar data={result} />
            <Heading fontSize="xl" p="4" pb="3">
              Resultados
            </Heading>
            <FlatList
              data={result}
              renderItem={({ item }) => (
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'muted.50',
                  }}
                  borderColor="muted.800"
                  pl={['0', '4']}
                  pr={['0', '5']}
                  py="2">
                  <TouchableOpacity onPress={() => navigation.navigate('Usuario', { login: item.login })}>
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <Avatar
                        size="48px"
                        source={{
                          uri: item.avatar,
                        }}
                      />
                      <VStack>
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold>
                          {item.login}
                        </Text>
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {item.id}
                        </Text>
                      </VStack>
                      <Spacer />
                    </HStack>
                  </TouchableOpacity>
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};

const style = StyleSheet.create({
  botton: {
    marginTop: 20,
  }
});

export default SearchUsuario;
