# 🎡 Graviton Store's API

Hosted in https://graviton-api.herokuapp.com/

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

2. Start the project in dev mode. This command will start a development server.
```sh
$ npm run dev
```
## 🔌 Publishing Plugins
1. Fork this repository.
2. `git clone https://github.com/<YOUR USERNAME>/store-api.git`
3. `cd data`
4. `mkdir <PLUGIN-NAME>`
5. `cd <PLUGIN-NAME>`
6. Create a file called `manifest.yaml`.
7. In `manifest.yaml` put the following:
```yaml
name: <PLUGIN-NAME>
id: <ID-FOR-PLUGIN>
author: <YOUR-NAME>
description: <DESCRIPTION>
repository: <LINK-TO-PLUGIN-REPO>
releases:
 - version: <PLUGIN-VERSION>
   minTarget: <SPECIFIC-GRAVITON-VERSION>
   target: <GRAVITON-VERSION>
   url: <LINK-TO-PLUGIN-RELEASE-ZIP>
```
##### About the yaml information above
* `id, repository, url`: __cannot__ contain whitespace
* To create a release for your plugin:
  1. On your plugin's repository homepage, create a release and upload a `.zip` folder with only functional files for the plugin
  2. Once the release is published, copy the download-url, and release version of the release and paste into the `url`, `version` fields above respectively.
* `minTarget` will be a the full version of Graviton(`X.X.X`)
* `target` will only be the first two numbers of the Graviton version(`X.X`)
8. Commit changes and create PR

## 🎎 Contributing
#### Before commiting on git

* Get all your linting error (with ESlint)
```sh
$ npm run lint
```

* Fix all your linting error automatically (with ESlint)
```sh
$ npm run lint:fix
```

## 🧦 Tests

To run the tests, run:
```shell
$ npm test
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

## Contributors 🤠
LucasAlt [Github](https://github.com/LucasCtrl)
