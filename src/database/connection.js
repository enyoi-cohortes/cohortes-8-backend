import { Sequelize, } from 'sequelize';

// OPTION A
// const connection1 = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// OPTION B 
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Something went wrong', err?.message));

export default sequelize;