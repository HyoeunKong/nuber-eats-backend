import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    console.log(veganOnly);
    return [];
  }
  @Mutation((returns) => Boolean)
  createRestaurant(@Args() createRestaurantDto: createRestaurantDto): boolean {
    console.log(createRestaurantDto);
    return true;
  }
}
