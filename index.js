require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const session = require('express-session');
const client = require('./client');
const stripe = require('./stripe');

const app = express();

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolver');
const dataSources = require('./graphql/dataSources');

app.use(cors());
app.use(express.json());

// Mise en place de la session
app.use(session({
    secret: '4ea614bd-d104-4502-a8b7-82bceb918f3b',
    resave: true,
    saveUninitialized: true,
}));

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return{
            session: req.session,
            sqlClient: client
        }
    },
    dataSources: () => dataSources

})

app.use(graphqlServer.getMiddleware());
app.use(stripe);


const port = process.env.PORT || 3000;
app.listen(port, _ => {
    console.log(`Listening on ${port}`);
});