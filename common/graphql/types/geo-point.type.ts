import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class GeoPoint {
  @Field()          type: string;
  @Field(() => [Float]) coordinates: number[];
}
