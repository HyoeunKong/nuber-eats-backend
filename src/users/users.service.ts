import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
  ) {
    console.log(config.get('SECRET_KEY'));
  }

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        //make error
        return { ok: false, error: 'There is a user with that email elready' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      //make error
      return { ok: false, error: "Couldn't crate account" };
    }
    //check new user
    //create user & hash the password
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const correctUser = await user.checkPassword(password);
      if (!correctUser) {
        return {
          ok: false,
          error: 'Wron Password',
        };
      }
      const token = jwt.sign(
        { id: user.id, password: '1234' },
        this.config.get('SECRET_KEY'),
      );
      return {
        ok: true,
        token,
      };
    } catch (err) {
      return {
        ok: false,
        error: err,
      };
    }
  }
}
