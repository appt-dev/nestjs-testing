import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as TypeORM from 'typeorm';
import { User } from './user-entity';
import { UserInput } from './user-input';
import { LoginInput } from './login-input';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: TypeORM.Repository<User>,
  ) {}

  getLoggerContext(methodName: string): string {
    return `${UserService.name} --> ${methodName}`;
  }

  async users(): Promise<User[] | []> {
    try {
      const users: User[] | [] = await this.userRepository.find();
      return users;
    } catch (error: any) {
      throw new Error(`Failed to load users`);
    }
  }

  async register(data: UserInput): Promise<User> {
    try {
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

      const user: User = await this.userRepository.save(userToCreate);

      if (user) {
        return user;
      }
      throw new Error(`Registration failed`);
    } catch (error: any) {
      throw new Error(`Failed to register`);
    }
  }

  async login(data: LoginInput): Promise<boolean> {
    try {
      const user: User = await this.userRepository.findOne({
        where: {
          email: data.email,
        } as TypeORM.FindOptionsWhere<User>,
      });
      if (user) {
        return true;
      }
      return false;
    } catch (error: any) {
      return false;
    }
  }
}
export { UserService };
