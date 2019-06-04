const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const feeds = [
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    points: 3,
    website: 'web.com'
  },
  {
    title: 'Dinamic Test',
    author: 'Anything',
    points: 6,
    website: 'display.com'
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Feed {
    title: String
    author: String
    points: Int
    website: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    feeds: [Feed]
  }

  type Mutation {
    post (
      title: String,
      author: String,
    ): Book
    postNewFeed (
      title: String
      author: String
      points: Int
      website: String
    ): Feed
  }
`;
let idCount = books.length;
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    feeds: () => feeds,
  },
  Mutation: {
      // 2
      post: (parent, args) => {
         const book = {
          title: args.title,
          author: args.author,
        }
        books.push(book);
        return book
      },
      postNewFeed: (parent, args) => {
          const feed = {
          title: args.title,
          author: args.author,
          points: args.points,
          website: args.website,
       }
       feeds.push(feed);
       return feed
     }
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
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
