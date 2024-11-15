import { Module } from '@nestjs/common';
import { ApolloDriverAsyncConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { gqlConfig } from './gql.config.js';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRootAsync<ApolloDriverAsyncConfig>(gqlConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
