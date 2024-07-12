```bash
docker build -f docker/Dockerfile -t nauticalbot .
```

```bash
docker run -d --name nautical-bot nauticalbot
```

```bash
docker rm $(docker ps -a -q -f status=exited)
```
