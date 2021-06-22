import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@ArgsType()
export class CategoryInput {
  @Field((type) => String)
  slug: string;
}

@ObjectType()
export class CategoryOuput extends MutationOuput {
  @Field((type) => Category, { nullable: true })
  category?: Category;
}
