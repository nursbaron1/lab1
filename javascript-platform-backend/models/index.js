import { Sequelize } from 'sequelize';

// Подключение к базе Neon (PostgreSQL)
const sequelize = new Sequelize(
  'postgresql://neondb_owner:npg_nj57hsBOxIyt@ep-lively-tree-adduv2p2-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // важно для Neon (иначе SSL-ошибка)
      },
    },
  }
);

// Проверяем соединение
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL (Neon) successfully.');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
})();

export default sequelize;
