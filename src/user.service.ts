import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as TypeORM from 'typeorm';
import { User } from './user-entity';
import { UserInput } from './user-input';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: TypeORM.Repository<User>,
  ) {
  }

  getLoggerContext(methodName: string): string {
    return `${UserService.name} --> ${methodName}`;
  }

  async users(): Promise<User[] | []> {
    try {
      debugger
      const users: User[] | [] = await this.userRepository.find();
      return users;
    } catch (error: any) {
      debugger
      throw new Error(`Failed to load users`);
    }
  }

  async register(data: UserInput): Promise<User> {
    try {
      debugger
      if (!data.password) {
        throw new Error(`Password is mandatory`);
      }

      const fetchedUser: User = await this.userRepository.findOne({
        where: {
          email: data.email,
        },
      });

      if (fetchedUser) {
        throw new Error(`User with the same phone number/email already exists`);
      }

      const userToCreate: User = this.userRepository.create(data);

      debugger
      const user: User = await this.userRepository.save(userToCreate);

      debugger
      if (user) {
        return user;
      }
      throw new Error(`Registration failed`);
    } catch (error: any) {
      debugger
      throw new Error(`Failed to register`);
    }
  }

  // async login(data: Inputs.LoginInput): Promise<Maybe<LoginOutput>> {
  //   const invalidPasswordErrorMessage: string = messages.INVALID_PASSWORD_MSG;
  //   const loginFailedErrorMessage: string = messages.LOGIN_FAILED_MSG;
  //   const errorMap: Record<string, string> = {
  //     [invalidPasswordErrorMessage]: invalidPasswordErrorMessage,
  //     [loginFailedErrorMessage]: loginFailedErrorMessage,
  //   };
  //   try {
  //     const user: Maybe<User> = await this.userRepository.findOne({
  //       where: {
  //         email: data.email,
  //       } as TypeORM.FindOptionsWhere<User>,
  //     });

  //     if (user?.password) {
  //       const validPassword: boolean = await bcrypt.compare(
  //         data.password,
  //         user.password,
  //       );

  //       if (!validPassword) {
  //         throw new Error(messages.INVALID_PASSWORD_MSG);
  //       }

  //       const token: string = await this.jwtService.signAsync(
  //         { email: data.email, id: user.id },
  //         {
  //           secret: this.configService.get('jwtSecret'),
  //           expiresIn: constants.EXPIRES_IN,
  //         },
  //       );

  //       if (user && token) {
  //         return {
  //           accessToken: token,
  //         } as LoginOutput;
  //       }
  //     }
  //     throw new Error(messages.LOGIN_FAILED_MSG);
  //   } catch (error: any) {
  //     this.loggerService.error(
  //       error?.message,
  //       error?.stack,
  //       this.getLoggerContext(this.login.name),
  //     );
  //     throw new Error(errorMap[error?.message] ?? messages.LOGIN_FAILED_MSG);
  //   }
  // }
}
export { UserService };
