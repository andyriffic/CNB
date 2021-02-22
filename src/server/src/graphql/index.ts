import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import {
  schema as gameHistorySchema,
  resolver as gameHistoryResolver,
} from './game-history';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    gameHistory: [GameHistoryRecord]
  }

  ${gameHistorySchema}
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  gameHistory: gameHistoryResolver,
};

export const graphql = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
