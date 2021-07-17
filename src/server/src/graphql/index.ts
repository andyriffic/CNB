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
import {
  query as mobQuery,
  schema as mobSchema,
  resolver as mobResolver,
} from './mob-leaderboard';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    gameHistory: [GameHistoryRecord]
    ${playerHistoryQuery}
    ${weeklySummaryQuery}
    ${mobQuery}
  }

  ${gameHistorySchema}
  ${weeklySummarySchema}
  ${playerHistorySchema}
  ${mobSchema}
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  gameHistory: gameHistoryResolver,
  playerHistory: playerHistoryResolver,
  weeklySummary: weeklySummaryResolver,
  ...mobResolver,
};

export const graphql = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
