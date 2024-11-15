import * as NestJSGraphQL from '@nestjs/graphql';
import * as TypeORM from 'typeorm';

@TypeORM.Entity()
@NestJSGraphQL.ObjectType()
class User {
  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.PrimaryGeneratedColumn('uuid')
  id: string;

  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.Column({ type: 'varchar', nullable: true })
  firstName?: string;

  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.Column({ type: 'varchar', nullable: true })
  lastName?: string;

  @NestJSGraphQL.Field(() => String, { nullable: false })
  @TypeORM.Column({ type: 'varchar', nullable: false })
  email!: string;

  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.Column({ type: 'varchar', nullable: false })
  password?: string;
}

export { User };
