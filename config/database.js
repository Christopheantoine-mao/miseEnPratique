import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('projetNodeJs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;