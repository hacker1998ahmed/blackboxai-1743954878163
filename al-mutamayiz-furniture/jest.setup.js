const { sequelize } = require('./config/database');

beforeAll(async () => {
    await sequelize.sync(); // Sync the database for testing
});

afterAll(async () => {
    await sequelize.close(); // Close the database connection after tests
});