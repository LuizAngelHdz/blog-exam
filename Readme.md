# Backend - Blog 
# Instalación

- version de  [Node.js](https://nodejs.org/) 16.16.0

# Instalación de dependencias

### Yarn

```sh
yarn 
```

### NPM
```sh
npm i 
```
# Levantamiento del blog

### Yarn
```sh
yarn start
```
### NPM
```sh
npm run start
```

# variables de entorno
| Nombre      | Valor     | Descripcción                                              |
| ----------- | --------- | --------------------------------------------------------- |
| DB_HOST     | 127.0.0.9 | Host en donde se encuentra la base de datos               |
| DB_USER     | root      | Nombre del usuario para poder conectar a la base de datos |
| DB_PASSWORD |           | Contraseña que se asigno a la base de datos               |
| DB_NAME     | blogexam  | Nombre de la base de datos                                |
| DB_PORT     | 3306      | Puerto para la conexión de la base de datos               |

## Endpoints creados

| Endpoint | Metodo | Descripcción                                                                            |
| -------- | ------ | --------------------------------------------------------------------------------------- |
| /blogs   | GET    | End point creado para obtener la lista de los post del blog creados en la base de datos |
| /blogs   | POST   | End point creado para guaardar un nuevo post en la base de datos                        |
| /blogs   | PUT    | End point creado para actializar el post seleccionado en la base de dato                |
| /blogs   | DELETE | End point creado para eliminar un post seleccionado de la base de datos                 |

# Creación de la base de datos
### Query para la creación de la base 

```sh
CREATE DATABASE blogexam
```

#### Query para utilizar la base de datos creada

```sh
USE blogexam
```
#### Query para la creación de la tabla utilizada
```sh

CREATE TABLE Articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    date VARCHAR(50),
    content TEXT
)
```

> [!CAUTION]
> Crear previamente la base de datos y tablas utilizadas en el  proyecto para su correcto funcionamiento