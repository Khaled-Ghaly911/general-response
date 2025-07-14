import { Resolver, Query, Args, Mutation, Info } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'; 
import { PaginationInput } from 'common/pagination/pagination-input'; 
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { UserResponse } from './response/user-response.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserResponse)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<User>{
    const user: User = await this.usersService.create(createUserDto);
    return user;
  }
   
  // @Mutation(() => [User])
  // async createManyUser(@Args('createUserDto',{ type: () => [CreateUserDto] }) createUserDto: CreateUserDto[]): Promise<User[]>{
  //   return this.usersService.createMany(createUserDto);
  // }

  @Query(() => UserResponse, { name: 'users' })
  async users(@Args('paginationInput') paginationInput: PaginationInput) {
    return await this.usersService.findAll(paginationInput);
  }

  @Query(() => UserResponse)
  async findUserById(@Args('id') id: string): Promise<User> {
    return await this.usersService.findById(id)
  }

  @Query(() => UserResponse)
  async findUserByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if(!user) throw new NotFoundException("user's not found")

    return user;
  }

  @Mutation(() => UserResponse)
  async updateUser(@Args('id') id: string, @Args('updateUserDto') updateUserData: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserData);
  }
 
  @Mutation(() => UserResponse) 
  async deleteUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.delete(id);
  }
}
