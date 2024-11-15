import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4/index.js';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverAsyncConfig } from '@nestjs/apollo';
import { User } from './user-entity.js';
import { getOrmConfig } from './orm.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as TypeORM from 'typeorm';

const gqlConfig: ApolloDriverAsyncConfig = {
  driver: ApolloDriver,
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig,
    }),
  ],
  useFactory: async (dataSource: TypeORM.DataSource) => ({
    path: '/graphql',
    autoSchemaFile: true,
    sortSchema: true,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  }),
  inject: [TypeORM.DataSource],
};

export { gqlConfig };
