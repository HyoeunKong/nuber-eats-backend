import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Category } from '../entities/category.entity';

@InputType()
export class CategoryInput extends PaginationInput {
  @Field((type) => String)
  slug: string;
}

@ObjectType()
export class CategoryOuput extends PaginationOutput {
  @Field((type) => Category, { nullable: true })
  category?: Category;
}
