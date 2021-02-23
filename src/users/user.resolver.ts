import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { boolean } from 'joi';
import {
  CreateAccountInput,
  CreateAccountOuput,
} from './dtos/create-account.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => Boolean)
  hi(): boolean {
    return true;
  }

  @Mutation((returns) => CreateAccountOuput)
  createAccount(@Args('input') createAccountInput: CreateAccountInput) {}
}
