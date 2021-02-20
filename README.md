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
- 데이터베이스에 저장되는 데이터의 형태를 보여주는 모델

decorator
@ObjectType - 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL decorator
@Entity - TypeORM 이 DB에 데이터를 저장하게 해줌

두개를 같이 쓸 수 있음
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

## .env with NestJs

```bash
npm i --save @nestjs/config
npm i cross-env
```

cross-env 가상 변수를 설정할 수 있도록 함

환경변수 유효성 검사
환경변수 유효성 검사를 해서 환경변수들이 준비 되지 않으면 앱이 실행되지 않도록 한다.

###joi
데이터 유효성 검사 툴
```bash
npm i joi
```

## synchronize option in TypeOrmModule 
true 일 경우 TypeORM이 Entity를 찾고 알아서 migration 해줌
DB 구성을 자동으로 바꿔줌
