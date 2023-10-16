# tp-wik-dps-tp01_YD
TP 01 Devops

Name: Yassine DEHHANI


## How to execute : 

On the terminal, use the following commands in order :

On Linux/MacOS :
- export PING_LISTEN_PORT=[replace this part with the port numer, e.g. 7000]
On Windows :
- set PING_LISTEN_PORT=[replace this part with the port numer, e.g. 7000]



- npx tsc (this command will compile the Typescript file and generate an index.js on the build folder)
- node build/index.js  (for executing the script)

Now use the curl command in order to check if the execise is working correctly:

## Working case

### command -> curl http://localhost:6969/ping -v

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
