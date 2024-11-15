import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user-entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './orm.config';
import { UserResolver } from './user-resolver';

describe('User Resolver', () => {
  let userService: UserService;
  let userResolver: UserResolver;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRootAsync({
          useFactory: getOrmConfig,
        }),
      ],

      providers: [UserService, UserResolver],
    }).compile();

    userService = module.get<UserService>(UserService);
    userResolver = module.get<UserResolver>(UserResolver);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Smith',
        password: 'Password@1',
        email: 'alice@gmail.com',
      };

      const registeredUser = await userResolver.register(newUser);
      expect(registeredUser).toMatchObject(newUser);
    });
  });

  describe('login', () => {
    it('should be able to login', async () => {
      const loginData = {
        password: 'Password@1',
        email: 'alice@gmail.com',
      };

      const isLogin = await userResolver.login(loginData);
      expect(isLogin).toBeTruthy();
    });
  });
});
