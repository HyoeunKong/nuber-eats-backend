import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImage: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  //하나의 카테고리는 여러개의 레스토랑을 가진다.
  @Field((type) => [Restaurant])
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}

//클래스 하나로 graphQL 스키마와 DB에 저장되는 실제 데이터 형식을 만들 수 있다.
