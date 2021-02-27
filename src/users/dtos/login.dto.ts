import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOuput {
  @Field((returns) => String, { nullable: true })
  token?: string;
}
