const express = require('express')
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const hostname = 'https://local.debtwire.com'
const port = 4000
const graphqlRoute = '/api/graphql'

const authenticate = require('./middleware/authenticate')
const entitlements = require('./middleware/entitlements')
const entitlementsCleaner = require('./middleware/entitlementsCleaner')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type User {
    userId: String
    acurisUserId: String
    subscriptions: String
  }


  type Query {
    user: User
  }
`);

// The root provides a resolver function for each API endpoint
    /*return {
      userId: request.authentication.userId,
      acurisUserId: request.authentication.acurisUserId,
      subscriptions: request.authentication.subscriptions
    }*/
        
var root = {
  user: (_, request) => {
    console.log({authenticate: request.authentication})
    return {
      userId: request.authentication.userId,
      acurisUserId: request.authentication.acurisUserId,
      subscriptions: request.subscriptions
    }
  }
};

var app = express();
app.use(authenticate)
app.use(entitlements)
app.use(entitlementsCleaner)

app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

//express.get('/user')
