import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker'


const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Todo = conn.define('todo', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})

User.hasMany(Todo);
Todo.belongsTo(User);

conn.sync({force: true}).then(()=>{
    _.times(10, ()=>{
        return User.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        }).then(user => {
            return user.createTodo({
                title: `${user.firstName} todo`,
                description: Faker.lorem.sentence()
            })
        })
    })
});

export default conn;