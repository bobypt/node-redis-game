# Simple Node game

## Build project

 ```npm install```

 ## Start app
 ```npm start```

 Application will start locally and listen on port 8080.

 ## Test
 health url -  ```curl localhost:8080/api/v1/orderservice/health```
 get order details -  ```curl localhost:8080/api/v1/orderservice/orders/875855955```

 ## Build docker image
```docker build -t msdemo/orderservice .```

## Start a container
```docker run -p 8080:8080 --name order-service -t msdemo/orderservice```

## Stop the server
```docker rm -f order-service```

## Running redis locally

### Start
```docker pull redis```

```docker run -p 6379:6379 --name some-redis -d redis```

### Test

```redis-cli ping``` should get ```PONG``` back

```
redis-cli
127.0.0.1:6379> set red-count 0
OK
127.0.0.1:6379> get red-count
"0"
127.0.0.1:6379> get red-count
"0"
127.0.0.1:6379> incr red-count
(integer) 1
127.0.0.1:6379> get red-count
"1"
127.0.0.1:6379> incr red-count

```