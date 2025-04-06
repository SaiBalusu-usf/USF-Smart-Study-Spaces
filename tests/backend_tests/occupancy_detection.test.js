const assert = require('assert');
const { app } = require('../../../backend/azure_functions/occupancy_detection/index');

describe('Occupancy Detection Function', () => {
    it('should return 400 when missing parameters', async () => {
        const req = {
            params: {},
            method: 'GET'
        };
        
        const res = await app.http('occupancyDetection', {
            method: 'GET',
            authLevel: 'function'
        }).handler(req, {});

        assert.strictEqual(res.status, 400);
    });

    it('should process valid occupancy data', async () => {
        const req = {
            params: {
                building: 'LIB',
                room: '101'
            },
            method: 'POST',
            body: JSON.stringify({
                status: 'occupied',
                sensorData: { motion: true, sound: false }
            })
        };
        
        const res = await app.http('occupancyDetection', {
            method: 'POST',
            authLevel: 'function'
        }).handler(req, {});

        assert.strictEqual(res.status, 200);
        const body = JSON.parse(res.body);
        assert.strictEqual(body.building, 'LIB');
        assert.strictEqual(body.room, '101');
        assert.strictEqual(body.status, 'occupied');
    });
});