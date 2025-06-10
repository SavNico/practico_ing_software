# Primer paso

Primero necesitamos crear nuestro propio archivo .env para utilizar las configuraciones del .env.example

```bash
cp .env.example .env
```

Luego completar las variables de entorno. Ejemplo:

```
MYSQL_ROOT_PASSWORD=passwordroot
MYSQL_DATABASE=db
MYSQL_USER=root
MYSQL_PASSWORD=password
```

# Luego levantar los contenedores

con este comando vas a buildear las imágenes y levantar los contenedores

```bash
docker compose up --build -d
```

Con este comando va a crear los archivos necesario para que funcione la app, instalar las dependencias de node y crear la base de datos mas la tabla necesaria.

# Ruta de entrada

De la aplicación:

[http://localhost:3000/](http://localhost:3000/)

De PHPMyAdmin para ver la información de la base de datosÑ

[http://localhost:8080](http://localhost:8080)

user: root

password: la misma de la variable *MYSQL_ROOT_PASSWORD* de las variables de entorno

# Consideraciones

La app está creada para que se lo más sencillo posible de utilizar. En caso de que ocurra algún error probablemente esté relacionado con las variables de entorno. En ese caso se puede dar de baja los contenedores y borrar los volúmenes para después levantarlos nuevamente, ejemplo:

```bash
docker compose down -v
```
