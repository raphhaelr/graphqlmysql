import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Person {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  lastname: string;
  
  @Field()
  age: number;
}