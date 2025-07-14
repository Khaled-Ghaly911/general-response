import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from './page-info.dto';

const paginationCache = new Map<any, any>();

export function PaginatedResponse<TItem>(ItemClass: new () => TItem) {
  
  if (paginationCache.has(ItemClass)) {
    return paginationCache.get(ItemClass);
  }

  @ObjectType(`${ItemClass.name}Paginated`)
  abstract class PaginatedType {
    @Field(() => [ItemClass])
    items!: TItem[];

    @Field(() => PageInfo)
    pageInfo!: PageInfo;
  }

  paginationCache.set(ItemClass, PaginatedType);
  return PaginatedType;
}
