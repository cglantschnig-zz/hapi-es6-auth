# hapi-es6-auth

A sample application with basic login. This project is using oauth2 Authentication
and a regular Postgres database.

## Usage

In order to make it runnable on all systems you first need to install [docker](https://www.docker.com/). Then just run the following commands and view
it in the browser on the given IP.

    # docker build -t hapi-es6-auth .
    # docker run --name db postgres:9.4
    # docker run --rm --link db:db -d hapi-es6-auth

Currently I am using here just single docker containers, but as soon
[docker-compose](https://github.com/docker/compose) will release the version 1.5.
This repository is going to use it. Version 1.5 brings support for Windows. You
could use some custom solutions like described [here](http://stackoverflow.com/questions/29289785/how-to-install-docker-compose-on-windows).

Just follow the [current status of docker-compose](https://github.com/docker/compose/wiki/1.5.0-Milestone-Project-Page)

## License

[View the License](LICENSE)

## Contribution

Feel free to fork and make pull requests! I am very happy to see new stuff and
merge it into the project
