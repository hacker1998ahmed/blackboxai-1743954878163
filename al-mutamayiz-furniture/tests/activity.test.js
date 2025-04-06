const request = require('supertest');
const app = require('../server'); // Assuming server.js exports the app
const { User, ActivityLog } = require('../models');

describe('Activity API', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Create a test user
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'admin'
        });
        userId = user.id;

        // Generate a token for the test user
        // Replace with actual token generation logic
        token = 'your_generated_jwt_token'; 
    });

    afterAll(async () => {
        await User.destroy({ where: { id: userId } });
        await ActivityLog.destroy({ where: { user_id: userId } });
    });

    it('should fetch user activity logs', async () => {
        const response = await request(app)
            .get('/api/activity')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.logs).toBeDefined();
    });

    it('should log user activity', async () => {
        const response = await request(app)
            .post('/api/activity')
            .set('Authorization', `Bearer ${token}`)
            .send({ action: 'User logged in' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Activity logged successfully');
    });
});