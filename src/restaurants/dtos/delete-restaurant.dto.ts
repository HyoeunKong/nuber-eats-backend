import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteRestaurantInput {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends MutationOuput {}
