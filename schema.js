import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} from 'graphql'
import DB from './db'

// Types
const User = new GraphQLObjectType({
    name: 'user',
    description: 'This is a respresentation of a user',

    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(user){
                    return user.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(user){
                    return user.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(user){
                    return user.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(user){
                    return user.email;
                }
            },
            todos: {
                type: new GraphQLList(Todo),
                resolve(user){
                    return user.getTodos();
                }
            }
        }
    }
});

const Todo = new GraphQLObjectType({
    name: 'Todo',
    description: 'This respresents a todo object',

    fields: () => {
        return {
            title: {
                type: GraphQLString,
                resolve(todo){
                    return todo.title;
                }
            },
            description: {
                type: GraphQLString,
                resolve(todo){
                    return todo.description;
                }
            },
            completed:  {
                type: GraphQLBoolean,
                resolve(todo){
                    return todo.title;
                }
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query',

    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(_, args){
                    return DB.models.user.findAll({where: args});
                }
            },
            todos: {
                type: new GraphQLList(Todo),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(_, args){
                    return DB.models.todo.findAll({where: args});
                }
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: Query
})

export default Schema;