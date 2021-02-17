# Nuber Eats

The Backend of Nuber Eats Clone

## Set Up

```bash
nest g application
```

## Graphql API
패키지 설치

```bash
npm i @nestjs/graphql graphql-tools graphql apollo-server-express
```

## entities

- 우리의 데이터 베이스에 있는 모델을 상상하라

## dto

- input type 정의
- InputType (decorator) : argument를 object 형태로 넣어야함
- ArgsType (decorator) : argument를 개별로 넣어줄 수 있음 ,Arg decorator 로 하나하나 정의 해주는 것이 아닌 dto 파일에 따로 만들어줌 entity 의 ObjectType 과 같은 형태

## validate 

```bash
 npm i class-validator
 npm i class-transformer
```

## NestJS with Type ORM

```bash
 npm install --save @nestjs/typeorm typeorm pg
```
