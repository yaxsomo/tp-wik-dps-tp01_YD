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
## Separate build from execution

We created a second Dockerfile, in which we separated the build from the execution (see Dockerfile2 for reference)

### Building the Dockerfile2

In order to build from a specific Dockerfile, we will use this command : 

```bash
sudo docker build -t [DOCKER_CONTAINER_NAME] -f [DOCKERFILE_NAME] .
```

Exemple of build command :

```bash
sudo docker build -t test-node -f Dockerfile.2 .
```
### Executing the container for Dockerfile2

In order to execute this container, we will use the same command as before : 

```bash
docker run -it --rm -p 8080:6969 -e PING_LISTEN_PORT=6969 test-node
```

### Results with curl (again): 

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
< Date: Mon, 23 Oct 2023 14:52:16 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{"host":"localhost:8080","user-agent":"curl/7.88.1","accept":"*/*"}%   
```

## Issues encountered

If you're having this error while building : 

```bash
 => [internal] load build definition from Dockerfile2                                                                   0.0s
 => => transferring dockerfile: 976B                                                                                    0.0s
 => [internal] load .dockerignore                                                                                       0.0s
 => => transferring context: 2B                                                                                         0.0s
 => ERROR [internal] load metadata for docker.io/library/node:18                                                        0.4s
------
 > [internal] load metadata for docker.io/library/node:18:
------
Dockerfile2:25
--------------------
  23 |     
  24 |     
  25 | >>> FROM node:18
  26 |     
  27 |     WORKDIR /app
--------------------
ERROR: failed to solve: node:18: error getting credentials - err: exit status 1, out: ``
```

You can use this command first : 

```bash
docker pull node:18 
```

# tp-wik-dps-tp03_YD
TP 03 Devops

For this TP, we will have to use Docker Compose.
To do so, we created a docker-compose.yaml file in which we declared all the services, networks and volumes needed in order to execute the TP correctly (see docker-compose.yaml for reference).
We will have a total of 4 replicas of the service in order to assure a high availability for the project


### Configuration for this TP:

For this TP, we will setup the YAML file to use NGINX service, so we can execute a curl command on the port 8080.

#### Nginx.conf:

This file is essential for the load balancing of requests towards the 4 replicas.
Here's the content of the configuration file : 

```yaml
user nginx;
events {
  
}
http {
  server {
    listen 80;
    location / { 
      proxy_pass http://myapp:8080/;
    }
  }
}
```

This configuration will let us connect to the API through the port 8080

### Building and executing the project:

In order to build and execute the project we will use the following command :

```bash
sudo docker compose up
```

In case you modified something on the project and you wanted to rebuild and launch the project, use the following command instead :

```bash
sudo docker compose up --build
```

### Executing Results (Docker Compose side):

```bash
[+] Building 0.0s (14/14) FINISHED                                                                 docker:desktop-linux
 => [myapp internal] load build definition from Dockerfile                                                         0.0s
 => => transferring dockerfile: 717B                                                                               0.0s
 => [myapp internal] load .dockerignore                                                                            0.0s
 => => transferring context: 2B                                                                                    0.0s
 => [myapp internal] load metadata for docker.io/library/node:18                                                   0.0s
 => [myapp 1/9] FROM docker.io/library/node:18                                                                     0.0s
 => [myapp internal] load build context                                                                            0.0s
 => => transferring context: 358B                                                                                  0.0s
 => CACHED [myapp 2/9] WORKDIR /app                                                                                0.0s
 => CACHED [myapp 3/9] COPY package*.json ./                                                                       0.0s
 => CACHED [myapp 4/9] RUN npm install --production                                                                0.0s
 => CACHED [myapp 5/9] RUN npm install typescript --save-dev                                                       0.0s
 => CACHED [myapp 6/9] RUN npm install @types/node --save-dev                                                      0.0s
 => CACHED [myapp 7/9] RUN npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --li  0.0s
 => CACHED [myapp 8/9] COPY src ./src                                                                              0.0s
 => CACHED [myapp 9/9] RUN npx tsc                                                                                 0.0s
 => [myapp] exporting to image                                                                                     0.0s
 => => exporting layers                                                                                            0.0s
 => => writing image sha256:5702f7d9a95944b3de7615a85ed92c1692a09a7aef164de58fe5d03dfe0e3f42                       0.0s
 => => naming to docker.io/library/tp-wik-dps-tp01_yd-myapp                                                        0.0s
[+] Running 5/5
 ✔ Container tp-wik-dps-tp01_yd-myapp-4  Recreated                                                                 0.1s 
 ✔ Container tp-wik-dps-tp01_yd-myapp-1  Recreated                                                                 0.1s 
 ✔ Container tp-wik-dps-tp01_yd-myapp-2  Recreated                                                                 0.1s 
 ✔ Container tp-wik-dps-tp01_yd-myapp-3  Recreated                                                                 0.1s 
 ✔ Container tp-wik-dps-tp01_yd-proxy-1  Recreated                                                                 0.0s 
Attaching to tp-wik-dps-tp01_yd-myapp-1, tp-wik-dps-tp01_yd-myapp-2, tp-wik-dps-tp01_yd-myapp-3, tp-wik-dps-tp01_yd-myapp-4, tp-wik-dps-tp01_yd-proxy-1
tp-wik-dps-tp01_yd-myapp-2  | Starting HTTP Server..
tp-wik-dps-tp01_yd-myapp-3  | Starting HTTP Server..
tp-wik-dps-tp01_yd-myapp-1  | Starting HTTP Server..
tp-wik-dps-tp01_yd-myapp-4  | Starting HTTP Server..
tp-wik-dps-tp01_yd-proxy-1  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
tp-wik-dps-tp01_yd-proxy-1  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
tp-wik-dps-tp01_yd-proxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
tp-wik-dps-tp01_yd-proxy-1  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
tp-wik-dps-tp01_yd-proxy-1  | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
tp-wik-dps-tp01_yd-proxy-1  | /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
tp-wik-dps-tp01_yd-proxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
tp-wik-dps-tp01_yd-proxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
tp-wik-dps-tp01_yd-proxy-1  | /docker-entrypoint.sh: Configuration complete; ready for start up
tp-wik-dps-tp01_yd-proxy-1  | 192.168.65.1 - - [30/Oct/2023:09:34:38 +0000] "GET /ping HTTP/1.1" 200 95 "-" "curl/7.88.1"
```

### Executing Results (Curl side):

#### command -> curl http://localhost:8080/ping 

```bash
{"host":"myapp:8080","connection":"close","user-agent":"curl/7.88.1","accept":"*/*"}%  
```

### Stopping the service:

In order to stop the service, you can simply use the "Ctrl+C" command.
To delete the ressources created by the YAML file, use this command :

```bash
docker compose rm
```





