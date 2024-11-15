import * as NestJSGraphQL from '@nestjs/graphql';
import { User } from './user-entity';
import { UserInput } from './user-input';
import { UserService } from './user.service';

@NestJSGraphQL.Resolver()
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @NestJSGraphQL.Query(() => [User])
  async users(): Promise<User[] | []> {
    return await this.userService.users();
  }

  @NestJSGraphQL.Mutation(() => User)
  async register(@NestJSGraphQL.Args('data') data: UserInput): Promise<User> {
    return await this.userService.register(data);
  }
}

export { UserResolver };
