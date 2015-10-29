# hapi-es6-auth

A sample application with basic login. This project is using oauth2 Authentication
and a regular Postgres database.

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

* Python/pip: `sudo pip install -U docker-compose`
* Other: ``curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose``

## Setup

First you need to run `docker-compose build` in order to build the docker files.
Next you need `docker-compose up` to download the dependencies and run the linked
containers. Your final command will decide if you run the application in normal mode,
in development mode or if you want to run the tests.

    # docker-compose build
    # docker-compose up -d

    # docker-compose run web npm start
    # docker-compose run web gulp
    # docker-compose run web npm test

Now you can easily view the website at `http://localhost` on your host machine.

## License

[View the License](LICENSE)

## Contribution

Feel free to fork and make pull requests! I am very happy to see new stuff and
merge it into the project
