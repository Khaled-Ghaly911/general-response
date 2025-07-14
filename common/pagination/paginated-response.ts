import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info.dto';

export function PaginatedResponse<TItem>(ItemClass: Type<TItem>) {
  @ObjectType(`${ItemClass.name}Paginated`)
  abstract class PaginatedType {
    @Field(() => [ItemClass])
    items!: TItem[];

    @Field(() => PageInfo)
    pageInfo!: PageInfo;
  }

  return PaginatedType;
}
