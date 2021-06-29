import {schema} from './schema'
import {context} from './context'
import {ApolloServer} from "apollo-server-express";
const express = require("express");
const expressJwt = require("express-jwt");

const app = express()

const server = new ApolloServer({
    schema: schema,
    // @ts-ignore
    context: ({req : {user}}) => ({...context, user}),
});

server.start().then((value) => {
    app.use(
        expressJwt({
            secret: process.env.JWT_SECRET,
            algorithms: ["HS256"],
            credentialsRequired: false
        })
    )

    server.applyMiddleware({app})

    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
})






