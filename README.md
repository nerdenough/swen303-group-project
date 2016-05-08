# SWEN303 Group Project
## Getting Started
- `cd` into your swen303-group-project directory
- Run `npm install` to install any necessary local packages
- Run `npm install -g gulp` to install gulp
- Run `npm start` to start the server

## Vagrant
The Vagrant machine is used to host the PostgreSQL database, the ports for which
are then forwarded to the host machine. This box is based on Ubuntu 14.04 64-bit
(Trusty).

### Prerequisites
- [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://www.vagrantup.com/downloads.html)

### Setting Up
- Run `vagrant box add ubuntu/trusty64` to add the base image for the box
- `cd` into your swen303-group-project directory
- Run `vagrant up` to start the box

*Note: `vagrant suspend` can be used to stop the box at any time.*

## PostgreSQL
- User: `pgsql`
- Pass: `pgsql`
- Database: `swen303`
- Connection String: `postgres://pgsql:pgsql@localhost:15432/swen303`
