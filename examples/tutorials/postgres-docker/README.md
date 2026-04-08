# Postgres + Docker Tutorial


## コマンド

```
docker run  \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mydb \
  -p 54321:5432 \
  postgres-tutorial
```
