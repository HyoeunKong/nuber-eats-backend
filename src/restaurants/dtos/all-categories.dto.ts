import { Field, ObjectType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class AllCategoriesOutput extends MutationOuput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}
