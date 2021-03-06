import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';

import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOuput extends MutationOuput {}
