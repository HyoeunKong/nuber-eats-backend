import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { User } from './entities/user.entity';
import { UsersResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
