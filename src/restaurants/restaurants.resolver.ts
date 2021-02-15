import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  @Query(() => Boolean)
  isPizzaGood(): boolean {
    return true;
  }
}
