// src/users/dto/user-response.type.ts
import { ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { ResponseType } from 'common/graphql/response/response.type';

@ObjectType('UserResponse')
export class UserResponse extends ResponseType(User) {}