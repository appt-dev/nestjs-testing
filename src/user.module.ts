import { Module } from '@nestjs/common';
import { User } from './user-entity.js';
import { getOrmConfig } from './orm.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service.js';
import { UserResolver } from './user-resolver.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig,
    }),
  ],

  providers: [UserService, UserResolver],
})
export class UserModule {}
