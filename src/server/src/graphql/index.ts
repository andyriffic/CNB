import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import {
  schema as gameHistorySchema,
  resolver as gameHistoryResolver,
} from './game-history';
import {
  query as playerHistoryQuery,
  schema as playerHistorySchema,
  resolver as playerHistoryResolver,
} from './player-history';
import {
  query as weeklySummaryQuery,
  schema as weeklySummarySchema,
  resolver as weeklySummaryResolver,
} from './weekly-summary';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    gameHistory: [GameHistoryRecord]
    ${playerHistoryQuery}
    ${weeklySummaryQuery}
  }

  ${gameHistorySchema}
  ${weeklySummarySchema}
  ${playerHistorySchema}
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  gameHistory: gameHistoryResolver,
  playerHistory: playerHistoryResolver,
  weeklySummary: weeklySummaryResolver,
};

export const graphql = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
