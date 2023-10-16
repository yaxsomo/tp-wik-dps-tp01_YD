# tp-wik-dps-tp01_YD
TP 01 Devops

Name: Yassine DEHHANI


## How to execute (exemple on port 7000) 
### On the terminal, use the following commands in order :

#### Exporting the environment variable
On Linux/MacOS :
```bash
export PING_LISTEN_PORT=7000
```
On Windows :
```bash
set PING_LISTEN_PORT=7000
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
