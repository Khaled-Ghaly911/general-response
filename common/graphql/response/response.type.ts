import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginatedResponse } from 'common/pagination/paginated-response';

export function ResponseType<TItem>(ItemClass: new () => TItem) {
  const PaginatedClass = PaginatedResponse(ItemClass);

  @ObjectType(`${ItemClass.name}Response`)
  abstract class ResponseTypeClass {
    @Field()
    status: boolean;

    @Field(() => Int)
    statusCode: number;

    @Field(() => String, { nullable: true })
    message?: string;

    @Field(() => ItemClass, { nullable: true })
    data?: TItem | null;


    @Field(() => PaginatedClass, { nullable: true })
    paginatedData?: InstanceType<typeof PaginatedClass>;
  }

  return ResponseTypeClass;
}
