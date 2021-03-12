import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,

    private readonly jwtService: JwtService,
  ) {}

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

      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );

      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
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
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
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
          error: 'Wrong Password',
        };
      }
      const token = this.jwtService.sign(user.id);
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
  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne(userId);
    console.log(userId, user, email);
    try {
      if (email) {
        user.email = email;
        user.verified = false;
        console.log(this.verifications.create({ user }), 'ddd');

        await this.verifications.save(this.verifications.create({ user }));
      }
      if (password) {
        user.password = password;
      }

      const updatedUser = await this.users.save(user);
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyEmail(code: string): Promise<boolean> {
    try {
      const verification = await this.verifications.findOne(
        { code },
        // { loadRelationIds: true },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        console.log(verification.user);

        this.users.save(verification.user);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
