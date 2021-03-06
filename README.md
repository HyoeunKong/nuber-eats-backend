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

#### joi
데이터 유효성 검사 툴
```bash
npm i joi
```

## synchronize option in TypeOrmModule 
true 일 경우 TypeORM이 Entity를 찾고 알아서 migration 해줌
DB 구성을 자동으로 바꿔줌

## TypeOrmModule Repository
Typescript를 이용해서  DB에 있는 table 에 접근

#### Activate Record vs Data Mapper
DB랑 상호작용할 때 쓰는 패턴

#### Active Record
```typescript
export class Restaurant extends BaseEntity
```
- 소규모 앱에서 단순하게 사용할 수 있도록 함

#### Data Mapper
- Repository 를 사용함
- Repository : Entity와 상호작용 담당
- Entity랑 실제로 상호작용하는 Repository만 추가적으로 필요함.
- 유지 관리하는걸 도와주고 대규모 앱에서 유용
- 노마드 프로젝트에서 Data Mapper 을 쓰는 이유 : NestJS + TypeORM 개발환경에서 Repository를 사용하는 모듈을 쓸 수 있다.
- Repository 를 사용하면 어디서든지 접근가능(실제로 구현하는 서비스에서 접근이 가능하고 테스팅할 때도 접근 가능)

## Mapped Types
base type을 바탕으로 다른 버전들을 만들 수 있게 해줌
entity 파일에서 graphQL schma, dto, DB table 을 모두 만들 수 있음

## Password Hash
DB에 password를 저장할떄는 꼭 단방향 으로 해싱해 주어야함.

### listener
entity에 무슨 일이 생길 때 실행됨

Any of your entities can have methods with custom logic
that listen to specific entity events.

@AfterLoad(), @BeforeInsert.. 등등

###Bcrpyt
hash 하고 hash를 확인하는 데도 사용

```bash
npm i bcrypt
npm i @types/bcrypt --dev-only
```

## JWT 모듈 직접 구현 하기
```bash
npm i jsonwebtoken
npm i @types/jsonwebtoken --only-dev
```

privateKey: token을 지정하기 위해 사용

PrivateKey를 이용해서 token을 지정해 주는 목적
- token을 수정했는지  확인가능
- 사용자가 정보를 수정하면 수정된 정보를 인지 할 수 있음

token을 user에게 지정해주면
사용자는 token에 뭐가들어있는지 알 수 있음
token에 중요한 정보 넣으면 안됨(아이디 정도)
jwt의 목적은 보안이 아님 
json web token을 이용해서 우리만이 유효한 인증을 할 수 있게 함
내부에 담겨진 정보 자체가 아닌, 정보의 진위 여부가 중요하다.
토큰이 우리의 것인지, 아무도 수정하지 않았는지가 중요함

#### Global Module 만들기
@Global() 데코레이터를 붙여주면됨!
모듈마다 일일히 import하지 않고 app에만 import 해줘도됨

#### Module 에 config 추가
1. jwt > interfaces 폴더 생성
2. JwtModuleOptions 작성
3. forRoot에 옵션 추가해줌
```typescript
 JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
```

#### http request 를 resolver로  가져오기
```typescript

...

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      console.log(decoded);
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(decoded['id']);
          req['user'] = user;
        } catch (e) {}
      }
    }
    next();
  }
}

```
1. apollo server의 context 사용
- request context 는 각 request에서 사용이 가능
- contest가 함수로 정의되면 매 request 마다 호출됨 이것은 req property를 포함한 object를 Express로 부터 받는다.
- context에  property를 넣으면 resolver 안에서 사용할  수 있다.

정리🍺
1. token을 request header에 붙여서 보냄
2. JwtMiddleware가 request를 먼저 받음
3. JwtMiddleware가 token으로 id를 찾고 id로 user를 찾아서 request user 를 request에 넣어줌(request안에 새로운걸 넣어준거임)
4. request가 GraphQLModule로 와서 context안으로 들어감
5. resolver가 context에 접근할 수 있음

### Guard
request를 다음 단계로  진행할지  말지 결정함

```bash
nest  g mo auth
```

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}


```
 canActivate() : true를 리턴하면 request를 진행시키고 false를 리턴하면 request를 멈춤
  const gqlContext = GqlExecutionContext.create(context).getContext() : http 요청을 graphQL 형태로 바꿔줌
