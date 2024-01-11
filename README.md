# CasoPracticoZEPO-1

## Proposito y alcance del proyecto

Haciendo uso de TypeScript dentro de un framework de backend basado en JavaScript, realizar una clase que realice una solicitud a la API disponible en https://openf1.org/, que proporciona información sobre la Fórmula 1. Dicha clase deberá de mostrar la siguiente información como resultado:
- El nombre completo de los pilotos cuya duración en el pit stop ha sido
inferior a 50 segundos.
- El nombre de los pilotos españoles
- El nombre de los pilotos finlandeses que tengan en su nombre o
apellido 'kk

## Herramientas y tecnologías utilizadas

- Typescript
- Express
- Axios

## Entorno de desarrollo

- src/  
    - formula1info.ts
    - index.ts
- package.lock.json
- package.json
- tsconfig.json 

## Implementación

Se ha optado por la implementacion de la clase "Formula1Info" dentro del archivo formula1Info.ts para interctuar con la API de OpenF1, dentro de ella se encuentran los metodos especificos para obtener y procesar los datos relacionados con la Formula 1. Permite diversas consultas, como obtener informacion sobre pilotos, datos de pit stops y filtrar estos datos segun criterios diversos. La estructura es bastante sencilla, ordenada por diferentes metodos que ayudan a la comprension del codigo y su limpieza.

Por utlimo, en el archivo "index.ts" se crea el servidor express en node.js que utiliza la clase anterior. Se usa el puerto 3000 y se configura un middleware para permitir solicitudes CORS (Cross-Origin Resource Sharing). Tambien se define la ruta para realizar las solicitudes.

Adicionalmente dentro del "tsconfig.json" se han descomentado algunos metodos que he considerado importantes para facilitar el desarrollo. 

## Manual de usuario

### Requisitos previos

Hay que tener instalado en nuestra maquina Node.js y npm.

### Configuracion y ejecucion

#### Instalar dependencias

Una vez tengamos clonado el repositorio en nuestra maquina local, debemos situarnos dentro del directorio y realizar la instalacion de las dependecias definidas en el archivo package.json haciendo uso del comando 'npm install'.

### Iniciar

Para iniciar la aplicación, hay que ejecutar el comando 'npm start'. Una vez iniciado el programa ya podemos acceder a la URL que no se nos indica para poder hacer las peticiones. 'http://localhost:3000/formula1'

Se nos mostrará el resultado de las peticiones realizadas. 