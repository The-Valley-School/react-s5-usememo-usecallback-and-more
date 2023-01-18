# VIDEO 06 - Caso Práctico: UseCallback y React.memo con API

Para trabajar con APIs vamos simular una en local haciendo uso de la siguiente librería:

[https://github.com/typicode/json-server](https://github.com/typicode/json-server)

Dentro del enlace oficial podrás encontrar toda la info de cómo usarla e instalarla, aún así, vamos a dejar por aquí los comandos básicos.

Para instalar la librería en tu proyecto:

`npm install json-server`

Después debemos crear un JSON que hará de base de datos, en nuestro caso lo dejamos en la raíz y lo llamamos “**fake-api.json**”, y le añadiremos cierto contenido:

```json
{
  "spents": [
    {
      "name": "Gasolina",
      "ammount": 200,
      "imageUrl": "https://image.shutterstock.com/image-photo/diesel-pistol-car-tank-refueling-600w-1888756075.jpg",
      "id": 1
    },
    {
      "name": "Netflix",
      "ammount": 15,
      "imageUrl": "https://image.shutterstock.com/image-photo/los-angeles-october-23-23021-600w-2062987472.jpg",
      "id": 2
    },
    {
      "name": "Móvil",
      "ammount": 30,
      "imageUrl": "https://image.shutterstock.com/image-photo/happy-businessman-sitting-coffee-shop-600w-2078709274.jpg",
      "id": 3
    },
    {
      "name": "Micrófono",
      "ammount": 90,
      "imageUrl": "https://image.shutterstock.com/image-vector/microphone-retro-vocal-radio-equipment-600w-1665029149.jpg",
      "id": 4
    }
  ]
}
```

Posteriormente añadiremos en el package.json un comando para levantar el servidor local, y lo haremos en un puerto diferente al que usa React, en nuestro caso usaremos el 4000 y el package.json quedará así:

```json
{
  "name": "react-s5-usememo-usecallback-and-more",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "json-server": "^0.17.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start-fake-api": "json-server --watch fake-api.json --port 4000"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

A partir de ahí construiremos nuestra app de gastos, haremos uso de todo lo que hemos visto hasta ahora:

- UseCallback
- UseState
- React.memo
- …
- etc

Añadiendo además peticiones a API de tipo POST, GET y DELETE.

Podrás encontrar el código final de ejemplo en Github:

[https://github.com/The-Valley-School/react-s5-usememo-usecallback-and-more](https://github.com/The-Valley-School/react-s5-usememo-usecallback-and-more)
