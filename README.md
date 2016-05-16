# SWEN303 Group Project
## Getting Started
- `cd` into your swen303-group-project directory
- Run 'vagrant up' to start the VM
- Run `npm install` to install any necessary local packages
- Run `npm install -g gulp mocha` to install gulp and mocha
- Run `npm start` to start the server

## Vagrant
The Vagrant machine is used to host the MySQL database, the ports for which are
then forwarded to the host machine. This box is based on Ubuntu 14.04 64-bit
(Trusty).

### Prerequisites
- [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://www.vagrantup.com/downloads.html)

### Setting Up
- Run `vagrant box add ubuntu/trusty64` to add the base image for the box
- `cd` into your swen303-group-project directory
- Run `vagrant up` to start the box

*Note: `vagrant suspend` can be used to stop the box at any time.*

## MySQL
- User: `vagrant`
- Pass: `vagrant`
- Database: `vagrant`

## Contributing
For working on this project, please ensure you follow the
[Feature Branch Workflow](https://www.atlassian.com/pt/git/workflows#!workflow-feature-branch)
to ensure consistency throughout the code.

`.eslintrc` has been added to ensure consistency throughout JavaScript files.
This file is based on the
[Node Style Guide](https://github.com/felixge/node-style-guide/blob/master/Readme.md)
and should be used with a valid eslint checker. Main points:
- Use 2 spaces for indentation
- Limit JavaScript files to 80 characters per line
- Use ===, !== instead of ==, !=
