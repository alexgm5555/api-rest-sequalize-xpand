import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USERNAME || 'admin',
  process.env.DB_PASSWORD || 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
