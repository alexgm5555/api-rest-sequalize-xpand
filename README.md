

# Xpand API

Es importante tener instalado en la maquina Docker Destop, para agilizar la instalación

1. Clonar proyecto
2. Instalar Dependencias
```npm install```
3. Cambiar las variables de entorno
3. inicializar Docker Desktop
4. Levantar la base de datos
```
docker-compose up --build
```
nota: el anterior comando dejarlo corriendo mientras se hacen las consultas

5. Inicializar: 
```npm run start:dev``` o
```npm start```

7. Los EndPoint Disponibles son:
CRUD Tabla Notes
```
POST http://localhost/api/notes //Crear nota o
POST http://###.###.#.#:3002/api/notes //Crear nota
{
  "title": "",
  "description": ""
}
GET http://localhost/api/notes            //Obtener todos las notas
GET http://localhost/api/notes?id=$id     //Obtiene la nota de acuerdo a su id
DELETE http://localhost/api/notes?id=$id  //Elimina la nota de acuerdo a su id
PATCH http://localhost/api/notes?id=$id   //Actualiza algún campo de la nota
{
  "title": "",
  "description": "",
  "state": "",
  "final_note": 0
}
```



