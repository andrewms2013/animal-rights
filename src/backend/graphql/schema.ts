import { merge } from 'lodash';
import { gql, makeExecutableSchema } from 'apollo-server-koa';
import { typeDefs as User } from "@graphql/typedefs/user-typedefs";
import { resolvers as userResolvers } from "@graphql/resolvers/user-resolvers";
import { AuthDirective } from "@graphql/directives/isAuthenticated";

const Query = gql`
    type Query {
        _empty: String
    }
`;

const resolvers = {};

const schema = makeExecutableSchema({
    typeDefs: [ Query, User ],
    resolvers: merge(resolvers, userResolvers),
    schemaDirectives: {
        auth: AuthDirective,
    }
});

export { schema };
