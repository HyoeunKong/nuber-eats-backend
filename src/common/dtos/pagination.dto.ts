import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { MutationOuput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field((type) => Int, { defaultValue: 1 })
  page: number;
}
@ObjectType()
export class PaginationOutput extends MutationOuput {
  @Field((type) => Int, { nullable: true })
  totalPages?: number;

  @Field((type) => Int, { nullable: true })
  totalResults?: number;
}
