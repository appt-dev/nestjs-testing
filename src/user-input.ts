import * as NestJSGraphQL from '@nestjs/graphql';
import { IsString, Length, IsUUID, IsNotEmpty } from 'class-validator';

@NestJSGraphQL.InputType()
class UserInput {
  @NestJSGraphQL.Field(() => String, { nullable: true })
  @IsString()
  @Length(1)
  firstName?: string;

  @NestJSGraphQL.Field(() => String, { nullable: true })
  @IsString()
  @Length(1)
  lastName?: string;

  @NestJSGraphQL.Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  email!: string;

  @NestJSGraphQL.Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  password!: string;
}
export { UserInput };
