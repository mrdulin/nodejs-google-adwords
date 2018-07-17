import { GraphQLServer } from 'graphql-yoga';
import * as path from 'path';
import { Prisma } from 'prisma-binding';

// const links = [{ id: 'link-0', description: 'Fullstack tutorial for GraphQL', url: 'www.howtographql.com' }];
// let idCount = links.length;

// 解析器函数中的context是解析器函数间通信用的
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: (root: any, args: any, context: any, info: any) => {
      return context.db.query.links({}, info);
    }
  },
  Mutation: {
    post: (root: any, args: any, context: any, info: any) => {
      return context.db.mutation.createLink(
        {
          data: {
            url: args.url,
            description: args.description
          }
        },
        info
      );
    }
  },
  // 可以删除Link解析器函数，字段都是标量类型，graphql会自动推断
  Link: {
    id: (root: any) => root.id,
    description: (root: any) => root.description,
    url: (root: any) => root.url
  }
};

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, './schema.graphql'),
  resolvers,
  context: (req: any) => ({
    ...req,
    db: new Prisma({
      typeDefs: path.resolve(__dirname, './generated/prisma.graphql'),
      endpoint: 'https://us1.prisma.sh/official_dulin-262917/hackernews/dev',
      secret: 'mysecret123',
      debug: true
    })
  })
});

server.start(() => {
  console.log('Server is running on http://localhost:4000');
});
