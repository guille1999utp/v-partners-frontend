# Github Search App

Esta aplicación de React Native permite buscar usuarios de Github y mostrar información detallada sobre usuarios similares obtenidos de la API de GitHub. Además, presenta una gráfica de barras comparando la cantidad de seguidores de los usuarios filtrados.

## Funcionalidades

- Búsqueda de Usuarios de Github: Ingresa el nombre de un usuario de Github en el campo de búsqueda y presiona el botón "Buscar". La aplicación buscará usuarios en la API de GitHub que coincidan con el nombre proporcionado.

- Visualización de Resultados: Después de la búsqueda, se mostrará una lista con los primeros 10 usuarios obtenidos de la API de GitHub que coincidan con la búsqueda. Cada elemento de la lista incluirá información como el nombre de usuario y una foto de perfil.

- Detalle de Usuario: Toca uno de los usuarios de la lista para ver más detalles. La pantalla de detalle mostrará información más completa sobre el usuario, como su avatar, nombre, identificación, y más.

- Gráfica de Barras: En la pantalla principal de la aplicación, se presenta una gráfica de barras horizontal que compara la cantidad de seguidores de los usuarios filtrados.

## Cómo Ejecutar Localmente

Sigue estos pasos para ejecutar la aplicación en tu entorno local:

1. Clona el Repositorio:

```console
git clone https://github.com/guille1999utp/v-partners-frontend.git
```

2. Luego entra al archivo del repositorio

```console
cd v-partners-frontend
```

3. Instala las Dependencias:

```console
npm install
```

4. Ejecuta la Aplicación:

```console
npx react-native run-android
```
o

```console
npm run android
```

Asegúrate de tener un emulador de Android en funcionamiento o un dispositivo Android conectado.

## Cómo Realizar el Build

Para construir una versión de producción de la aplicación, sigue estos pasos:

1. Build para Android, vamos al directorio raiz de la aplicacion, luego entramos a la carpeta "android" y ejecutamos el siguiente comando en terminal:

```console
./gradlew assembleRelease
```

Esto construirá una versión de lanzamiento de la aplicación para Android. El archivo APK resultante se puede encontrar en android/app/build/outputs/apk/release/app-release.apk.

ya con ese archivo simplemente lo puedes descargar un tu mobile y lo ejecutas para instalarlo y ya tendras la aplicacion corriendo en tu telefono celular.