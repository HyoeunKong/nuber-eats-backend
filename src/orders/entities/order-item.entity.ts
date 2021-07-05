import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish, DishOption } from 'src/restaurants/entities/dish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field((type) => [DishOption], { nullable: true })
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish?: Dish;

  @Column({ type: 'json', nullable: true })
  options?: DishOption[];
}
