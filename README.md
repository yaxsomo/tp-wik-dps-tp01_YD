# tp-wik-dps-tp01_YD
TP 01 Devops

This mini-project consists in creating an HTTP server with only a possible route : 

- '/ping' will send an 'HTTP/1.1 200 OK' Response
- Every other route is going to send an 'HTTP/1.1 404 Not Found' Response

Once the project is running, we can access it with localhost, on a specified port via the PING_LISTEN_PORT environment variable


## How to execute (exemple on port 6969) 
### On the terminal, use the following commands in order :

#### Exporting the environment variable
On Linux/MacOS :
```bash
export PING_LISTEN_PORT=6969
```
On Windows :
```bash
set PING_LISTEN_PORT=6969
```

#### Compiling the Typescript file into a JS file
```bash
npx tsc
```
#### Building and executing the project
```bash
node build/index.js
```
## Tests
Now use the curl command in order to check if the execise is working correctly:
### Working case

#### command -> curl http://localhost:6969/ping -v

```bash
*   Trying 127.0.0.1:6969...
* Connected to localhost (127.0.0.1) port 6969 (#0)
> GET /ping HTTP/1.1
> Host: localhost:6969
> User-Agent: curl/7.88.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Mon, 16 Oct 2023 12:42:17 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{"host":"localhost:6969","user-agent":"curl/7.88.1","accept":"*/*"}%   
```
### Error 404 Case

#### command -> curl http://localhost:6969/yo -v

```bash
*   Trying 127.0.0.1:6969...
* Connected to localhost (127.0.0.1) port 6969 (#0)
> GET /yo HTTP/1.1
> Host: localhost:6969
> User-Agent: curl/7.88.1
> Accept: */*
> 
< HTTP/1.1 404 Not Found
< Date: Mon, 16 Oct 2023 12:44:30 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 0
< 
* Connection #0 to host localhost left intact
```

# tp-wik-dps-tp02_YD
TP 02 Devops

For this TP, we will have to put out project into a Docker container.
To do so, we created a Dockerfile in which we specified all the actions needed in order to execute the project correctly (See Dockerfile for reference)

## How to build docker image 
To build the docker image from the Dockerfile, we have to use the following command :
```bash
docker build -t [DOCKER_CONTAINER_NAME] .
```
###### Replace the DOCKER_CONTAINER_NAME with the choosen container name


## Run Docker container (exemple on port 6969)
In order to run the built Docker container, we will use this command :
```bash
docker run -it --rm -p [pc_port:docker_port] -e PING_LISTEN_PORT=[PORT] [DOCKER_CONTAINER_NAME]
```
Where :
- '-p' corresponds to the forwarding port from our pc to the docker image file port
- '-e' corresponds to the environment variable setup

Here's a complete run command :
```bash
docker run -it --rm -p 8080:6969 -e PING_LISTEN_PORT=6969 test-node
```


## Run Docker container
In order to verify the correct execution of the container, we will use again the curl command to check for HTTP header reception.

#### ATTENTION
##### The curl port have to be the forwarded one (pc_port), otherwise you will receive a 404 response

#### command -> curl http://localhost:8080/ping -v

```bash
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /ping HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.88.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Mon, 23 Oct 2023 12:38:43 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{"host":"localhost:8080","user-agent":"curl/7.88.1","accept":"*/*"}%  
```