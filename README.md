# da_dingambition

# System prerequisites
- Node 16.13.x installed
- Yarn global installed

## Development Setup
Don't forget to create the `.env` file.
```shell
cp .env.example .env
```
Then replace the variable entries. And run the project

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Deployment
[Docker](https://docs.docker.com/engine/install/) and docker-compose are required.

Once docker and docker-compose are installed on your machine/server, run the commands below:
```shell
docker-compose build
docker-compose up -d

# Or
docker-compose up --build --detach
```
cd existing_repo
git remote add origin https://gitlab.com/da_dingambition/da_dingambition_web.git
git branch -M main
git push -uf origin main

Docker compose will build nuxt container and nginx container, then map the port 80 from nginx to the `APP_PORT` (from .env file) to your machine.
