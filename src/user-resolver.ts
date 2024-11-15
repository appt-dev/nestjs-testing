import * as NestJSGraphQL from '@nestjs/graphql';
import { User } from './user-entity';
import { UserInput } from './user-input';
import { UserService } from './user.service';
import { LoginInput } from './login-input';

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

  @NestJSGraphQL.Mutation(() => Boolean)
  async login(@NestJSGraphQL.Args('data') data: LoginInput): Promise<boolean> {
    return await this.userService.login(data);
  }
}

export { UserResolver };
