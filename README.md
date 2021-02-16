# Projects dashboard API

## Installation

Firstly you need to install node_modules by running this command

```bash
$ npm install
```

Then, you need to create .env file and setup environment variables (See example at .env.dist)

## Running the app

Run the following command to start docker container with mysql

```bash
$ docker-compose up
```

After that, you can start the server by running the following command

```bash
$ npm start
```

## Deployment

Firstly, you need to run

```bash
$ gcloud init
```

Then, you can deploy the app to Google App Engine by running

```bash
$ gcloud app deploy
```
