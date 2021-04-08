import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { MutationOuput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantInput extends OmitType(
  Restaurant,
  ['id', 'category', 'owner'],
  InputType,
) {}

@ObjectType()
export class CreateRestaurantOutput extends MutationOuput {}
