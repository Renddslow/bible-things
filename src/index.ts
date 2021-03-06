import { ApolloServer, gql } from 'apollo-server';

import Character from './gql/characters';
import Location from './gql/location';
import getCharacter from './controllers/getCharacter';
import getLocation from './controllers/getLocation';
import getCharacterRelationships from './controllers/getCharacterRelationships';

const typeDefs = [
  Location,
  Character,
  gql`
    type Query {
      character(id: String!): Character
      characters: [Character]
    }
  `,
];

const resolvers = {
  Query: {
    character: getCharacter,
  },
  TimeAndPlace: {
    location: getLocation,
  },
  Character: {
    relationshipsConnection: getCharacterRelationships,
  },
  CharacterRelationshipsEdge: {
    node: (parent) => getCharacter(null, { id: parent.id }),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`📕 Running Bible GQL server at ${url}`);
});
