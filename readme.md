# Graviton Store's API

Hosted in https://graviton-api.herokuapp.com/

**Note**:

You can make requests / 50 seconds / IP

## 📖 Usage:

| Method | Endpoint | Description |
| ------------- | ------------- | ----- |
| GET | / | Get API information |
| GET | /plugins/ | Get the whole list of plugin ids |
| GET | /plugins/:pluginID | Get plugin info by it's id |

## 🛠️ Development

1. Install all the dependencies
```sh
$ npm install
```

2. Start the project in dev mode. This command will start a development server with nodemon for automatic reload ([according to the doc](https://nodemon.io/)).
```sh
$ npm run dev
```

### Utils
#### Before commiting on git

* Get all your linting error (with ESlint)
```sh
$ npm run lint
```

* Fix all your linting error automatically (with ESlint)
```sh
$ npm run lint:fix
```

#### When you want
* Test the API using `Jest` and `supertest`
```sh
$ npm run test
```

## 💾 Production

1. Install all the dependencies
```sh
$ npm install
```

2. Start the project in production mode.
```sh
$ npm run start
```

**Note**

You can also start the server using [PM2](https://pm2.keymetrics.io/) with the command:
```sh
pm2 start index.js
```
