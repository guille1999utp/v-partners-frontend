import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import Axios from 'axios';
import { Dimensions } from 'react-native';

const GraphicBar = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const obtenerSeguidores = async () => {
      try {
        const dataConSeguidores = await Promise.all(
          data.map(async (usuario) => {
            const response = await Axios.get(`https://api.github.com/users/${usuario.login}`);
            const seguidores = response.data.followers;
            return { ...usuario, followers: seguidores };
          })
        );
        setUpdatedData(dataConSeguidores);
      } catch (error) {
        console.error('Error al obtener la información de seguidores:', error);
      }
    };

    obtenerSeguidores();
  }, [data]);

  return (
    <VictoryChart width={screenWidth} theme={VictoryTheme.material} height={250} padding={{
        right:40,
        left:100,
        top:20,
        bottom:30
    }}>
      <VictoryBar data={updatedData} x="login" y="followers" horizontal={true} />
    </VictoryChart>
  );
};

export default GraphicBar;