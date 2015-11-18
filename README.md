# hapi-es6-auth

[![build](https://circleci.com/gh/cglantschnig/hapi-es6-auth/tree/master.svg?style=shield)](https://circleci.com/gh/cglantschnig/hapi-es6-auth/tree/master)

A sample application which shows how to handle authentication with custom authorization.
The system is build on an docker environment for easy setup and use.

Here a list of implemented features and tested:

* Token authentication (with roles to auhorize)
* Account registration
* Password reset function
* Forgot password (with sending an email)
* set password as admin

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
in development mode or if you want to run the tests. The option `--service-ports`
exposes all ports in a run command, by default ports just get exposed by the command
`docker-compose up`.

    # docker-compose build
    # docker-compose up -d

    # docker-compose run --service-ports web npm start
    # docker-compose run --service-ports web gulp
    # docker-compose run web npm test

Now you can easily view the website at `http://localhost` on your host machine.

## Todo List

The points below are the current todo list. Feel free to add points.

 - [ ] Test Data loading with dependencies instead of order
 - [ ] facebook/twitter login for mobile and web
 - [ ] token for devices
 - [ ] user account history
 - [ ] change promises with async/await
 - [ ] add api documentation as markdown
 - [ ] add a linter in form of a circleci or git commit pre hook

## License

 [View the License](LICENSE)

## Contribution

Feel free to fork and make pull requests! I am very happy to see new stuff and
merge it into the project
