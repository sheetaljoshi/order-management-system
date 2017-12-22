# Order Management System
Example CRUD application using Spring Boot + AngularJS

## Getting started
Run backend locally:
```shell
cd server
mvn spring-boot:run
```
Backend will start on port 8080

Install client dependencies:
```shell
cd client
npm install
```

Run frontend locally:
```shell
npm run serve
```
Frontend will start on port 8081, all requests will be proxied to port 8080.

## Description
The project consists of 2 modules.

### Server
* *Maven* as build automation tool.
* *Spring Boot* for auto-configuration of the application context.
* *Spring Data* for work with persistence context.
* *H2* as in-memory DB.
* *Lombok* to generate a boilerplate code for POJO.

### Client
* *NPM* as package manager.
* *Webpack* as build tool.
* *AngularJS* as frontend framework.
* *UI Bootstrap* for UI components.

### Screenshots
![Screen 1](/assets/image-1.png)
![Screen 2](/assets/image-2.png)
