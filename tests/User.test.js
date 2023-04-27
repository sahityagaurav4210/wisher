require('dotenv/config');

const request = require('supertest');

describe('controllers.User.js', function () {

    describe('POST /user/register', function () {
        it('should give 400 response on receiving in-complete payload', async function () {
            const req = {
                "name": 'Ballu Sir',
                "email": 'ballu@gmail.com',
                "dob": '2000-06-25',
                "ipAddress": '172.37.2.10'
            }

            request('http://localhost:8003/').post('user/register').send(req).end((err, res) => {
                expect(res.statusCode).toBe(400);
            });
        });

        it('should give 400 response on receiving same phone number', async () => {

            const req = {
                "name": 'Ballu Sir',
                "email": 'ballu@gmail.com',
                "phone": 9646560395,
                "dob": '2000-06-25',
                "ipAddress": '172.37.2.10'
            }

            request('http://localhost:8003/').post('user/register').send(req).end((err, res) => {
                expect(res.statusCode).toBe(400);
            });

        });

        it('should register a new user', async () => {

            const req = {
                "name": 'Ballu Sir',
                "email": 'ballu@gmail.com',
                "phone": 9646560395,
                "dob": '2000-06-25',
                "ipAddress": '172.37.2.10'
            }

            request('http://localhost:8003/').post('user/register').send(req).end((err, res) => {
                expect(res.statusCode).toBe(201);
            });

        });

    });

});