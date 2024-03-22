# Schäppli

## An Äppli a day keeps the tutor away

### Meta information

START HACK 2024
This project was created in 36h between the 20th and 22nd of March 2024 in cooperation with the [city of St. Gallen (CH)](https://www.stadt.sg.ch/).
Team: **Nightjet Enjoyers**

### Members

-   [Andreas Stettin](https://www.linkedin.com/in/andreas-stettin/)
-   Markus Schertler
-   Adrián Pintér
-   [Tobias Kendlbacher](https://kendlbat.dev/)

### How to run

#### Prerequisites

-   Docker & Docker Compose (preferably on Linux)
-   API key for [Opendata St. Gallen](https://daten.stadt.sg.ch/)

#### Running

##### Setup

Provide the API key for [Opendata St. Gallen](https://daten.stadt.sg.ch/) in a `.env` file placed at the project root.  
It should look like the following:

```env
SG_API_KEY=yourkeyhere
```

##### Docker

Start the docker containers using the following command.  
_When running the first time, you need to run this, wait for the database to initialize and keycloak to crash, then you have to restart the containers._

```sh
docker compose up -d
```

The services use the following ports:
|Port|Description|
|---|---|
|3000|Node.js Express server|
|5432|PostgreSQL Database|
|8080|Keycloak Identity Management|

_IMPORTANT: Before running in production, the keycloak server should be setup properly using HTTPS, the current setup is very proof-of-concept!_

### Development setup

#### Prerequisites

#### Prerequisites

-   Docker & Docker Compose (preferably on Linux)
-   API key for [Opendata St. Gallen](https://daten.stadt.sg.ch/)
-   Node.js, at least version 20
-   NPM or PNPM

#### Setup

Provide the API key for [Opendata St. Gallen](https://daten.stadt.sg.ch/) in a `.env` file placed at the project root.  
It should look like the following:

```env
SG_API_KEY=yourkeyhere
```

The services use the following ports, so make sure they are free:
|Port|Description|
|---|---|
|3000|Node.js Express server|
|4321|Frontend dev server|
|5432|PostgreSQL Database|
|8080|Keycloak Identity Management|

#### Docker

First, start the PostgreSQL database using the following:

```sh
docker compose up -d postgres
```

Wait for the startup to finish (around 20s), then start the Keycloak instance using:

```sh
docker compose up -d keycloak
```

You only have to start these once, you can leave them running in the background while developing.

#### Backend development server

First, make sure you installed all the dependencies using:

```sh
npm i
```

Then start the backend server using:

```sh
npm run dev
```

Leave this running in the background, start a new terminal for all following commands.

#### Frontend development server (Astro + Vite)

_All commands in this category are supposed to be run in the `client` directory._

```sh
cd client
```

Again, install the dependencies (independent from backend) using:

```sh
npm i
```

Then, start the dev server using:

```sh
npm run dev
```

You should now be able to see the frontend in your browser on [localhost:4321](http://localhost:4321/).

_Note that when logging in, you will get redirected to localhost:3000. This is fine, just remember to manually navigate back to localhost:4321 for live-refreshing.  
Otherwise, you will be very confused because none of your changes will be visible._

### Shutting down

To turn off the service, first close your development terminals using `Ctrl+C` (only when in dev mode).  
Then, stop the docker containers using:

```sh
docker compose down
```

If you want to save some disk space, you can also remove them using:

```sh
docker compose rm
```
