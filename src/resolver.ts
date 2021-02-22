import { PubSubEngine } from 'graphql-subscriptions'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root,
  ResolverFilterData,
  InputType,
  Field,
} from 'type-graphql'
import { Person } from './models/Person'
import connection from './database/connection'

interface PersonPayload {
  id: number;
  name: string;
  lastname: string;
  age: number;
}

@InputType()
class PersonInput {
  @Field()
  name: string;

  @Field()
  lastname: string;

  @Field()
  age: number;
}


@Resolver()
export class PrecatoResolver {
  @Query(() => [Person])
  async people() {
    const people = await connection('Persons').select('*')

    return people
  }

  @Mutation(() => Person)
  async createPerson(@PubSub() pubSub: PubSubEngine, @Arg('personInput') personInput: PersonInput) {

    try {
      
      const person = await connection('Persons').insert(personInput)

      const data = {
        ...personInput,
        id: person[0]
      }

      const payload = data

      await pubSub.publish('addPerson', payload)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  @Subscription({ topics: "addPerson" })
  showAddPeople(@Root() person: PersonPayload): Person {
    return person
  }
}
