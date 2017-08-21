import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema'


const app = Express();

app.use("/graphql", GraphHTTP({
    schema: Schema,
    graphiql: true
}))

app.listen("5000", ()=>{
    console.log("GraphQL server is running on port 5000;")
})