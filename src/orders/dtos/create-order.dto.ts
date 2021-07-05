import { InputType, ObjectType, Field, Int, PickType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class CreateOrderInput extends PickType(Order, ['items']) {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class CreateOrderOutput extends MutationOuput {}
