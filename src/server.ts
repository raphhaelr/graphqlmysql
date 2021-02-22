import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { PrecatoResolver } from './resolver'

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PrecatoResolver]
  })

  const server = new ApolloServer({ schema })

  server.listen({port: 4100}, () => console.log('Running.'))
}


bootstrap()