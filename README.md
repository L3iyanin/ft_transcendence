<p align="center">
  <img src="https://github.com/L3iyanin/ft_transcendence/blob/main/readme/images/logo.svg" />
</p>

## ft_transcendence:
ft_transcendence is the last project in the commen core of 1337 School (42Network).
It’s a Pong Multiplayer Game.

## Main Features:
- Pong Multiplayer Online Game
- Direct and group chat (with diffrent permissions and configs)
- Profile that contains: achivments and stats

## Technologies
[![Html](https://img.shields.io/badge/Html-20232A?style=flat&logo=html5&logoColor=E44D26&link=https://github.com/arihant-jain-09)](https://github.com/L3iyanin)
[![Css](https://img.shields.io/badge/Css-20232A?style=flat&logo=css3&logoColor=1572B6&link=https://github.com/arihant-jain-09)](https://github.com/L3iyanin)
[![Figma](https://img.shields.io/badge/Figma-20232A?style=flat&logo=figma&logoColor=FFFFFF&link=https://github.com/arihant-jain-09)](https://github.com/L3iyanin)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB&link=https://github.com/arihant-jain-09)](https://github.com/L3iyanin)
[![Nestjs](https://img.shields.io/badge/Nest-20232A?style=flat&logo=nestjs&logoColor=ED2945)](https://github.com/L3iyanin)
[![Socket.io](https://img.shields.io/badge/Socket.io-20232A?style=flat&logo=socket.io&logoColor=FFF)](https://github.com/L3iyanin)

## Run and build

### Requirements
- docker
- docker-compose

#### Clone the project

```bash
git clone https://github.com/L3iyanin/ft_transcendence.git
```

#### Create .env file

```bash
cp .env.sample .env # and change the values by your own
```

### Startup project
```bash
make
# or
make init
```

### Cleanup project
```bash
make fclean
```

### Run project after you have already startup it
```bash 
make up
```

To see the frontend `127.0.0.1:80`.

To see the backend `127.0.0.1:80/api`.

The page will reload if you make edit the frontend folder.

and also the backend will reload if you make edit the backend folder.

## Workflows

1. request come from browser to nginx server.
2. if the request start with `/api` or `/socket.io` it will be redirected to the backend container and will be served by nestjs.
3. if the request not start with `/api` and `/socket.io` it will be redirected to the frontend container and will be served by react.
