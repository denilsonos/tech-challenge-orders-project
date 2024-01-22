# tech-challenge-orders-project

Project Tech Challenge Group 62

## Descrição

Este projeto contempla um sistema para gerenciamento de pedidos e estoque.
## Tecnologia

TypeScript: 5.2.2
![Linkedin: HelioSoares](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)

Node: 20.2.1
![Linkedin: HelioSoares](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)




## Desenvolvimento

O desenvolvimento se deu por meio de Pair programming, onde os atores e ouvintes definidos([documentação de base](https://docs.google.com/document/d/1T5h---6pFPUxed4JcuHohJVm-L-NUCaBk-LMAonPDmI/edit?usp=sharing)), implementaram e testaram os cenários encontrados no Tech challenge.
## Deploy

Para rodar o projeto você precisa configurar o arquivo .env, utilizando como base o .env.example.

Exemplo:
```env
    DB_HOST=db
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=mydb
    DB_PORT=3306
    APP_PORT=3000
    APP_HOST=0.0.0.0
    NODE_ENV=dev
```


### Docker

Para execução via docker

```bash
  docker-compose up
```

### Kubernetes

Para execução via kubernetes (Recomendamos para execução local o uso do [minikube](https://minikube.sigs.k8s.io/docs/start/))

```bash
  kubectl apply -f kubernetes/pvc-db.yaml
  kubectl apply -f kubernetes/pv-db.yaml
  kubectl apply -f kubernetes/config-map-db.yaml
  kubectl apply -f kubernetes/config-map-app.yaml
  kubectl apply -f kubernetes/deployment-db.yaml
  kubectl apply -f kubernetes/service-db.yaml
  kubectl apply -f kubernetes/deployment-app.yaml
  kubectl apply -f kubernetes/hpa.yaml
  kubectl apply -f kubernetes/service-app.yaml
```
## Swagger

http://localhost:3000/docs
## Postman

[Collection para teste](https://github.com/denilsonos/tech-challenge-orders-project/blob/main/Tech%20Challenge%20Collection.postman_collection.json)

