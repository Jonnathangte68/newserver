const { ApolloServer, gql } = require('apollo-server');

const feeds = [
  {
    title: 'My new blog',
    author: 'Michael Crichton',
    points: 3,
    website: 'web.com',
    url: 'test.io'
  },
  {
    title: 'Hello from the other side!',
    author: 'Anything',
    points: 6,
    website: 'display.com',
    url: 'checktest.io'
  }
];
const typeDefs = gql`
  type Feed {
    title: String
    author: String
    points: Int
    website: String
    url: String
  }
  type Query {
    feeds: [Feed]
  }

  type Mutation {
    postNewFeed (
      title: String
      author: String
      points: Int
      website: String
      url: String
    ): Feed
  }
`;
const resolvers = {
  Query: {
    feeds: () => feeds,
  },
  Mutation: {
      postNewFeed: (parent, args) => {
          const feed = {
          title: args.title,
          author: args.author,
          points: args.points,
          website: args.website,
          url: args.url,
       }
       feeds.push(feed);
       return feed
     }
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: process.env.ENGINE_API_KEY && {
    apiKey: process.env.ENGINE_API_KEY,
  },
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
