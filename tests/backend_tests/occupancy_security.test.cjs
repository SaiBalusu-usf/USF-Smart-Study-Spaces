const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the registered handler with a local SDK stub; this does not emulate
// the Azure host or establish that the existing v3/v4 host setup is deployable.
let registration;
vm.runInNewContext(fs.readFileSync(path.join(__dirname,
  '../../backend/azure_functions/occupancy_detection/index.js'), 'utf8'), {
  require(name) {
    if (name === '@azure/functions') return { app: { http(_name, options) { registration = options; } } };
    if (name === 'uuid') return { v4: () => 'test-document-id' };
    throw new Error('Unexpected dependency');
  },
});
const request = (text) => ({ params: { building: 'LIB', room: '101' }, text });

test('keeps function-key authorization enabled', () => {
  assert.equal(registration.authLevel, 'function');
});

test('unexpected failures do not expose internal details to callers or logs', async () => {
  const logs = [];
  const result = await registration.handler(request(async () => {
    throw new Error('fixture-internal-database-connection-detail');
  }), { log: message => logs.push(message) });
  assert.equal(result.status, 500);
  assert.equal(result.body, 'Internal Server Error');
  assert.ok(!JSON.stringify(logs).includes('fixture-internal-database-connection-detail'));
});

test('valid occupancy requests retain document fields', async () => {
  const result = await registration.handler(request(async () => JSON.stringify({
    status: 'occupied', currentOccupancy: 3, sensorData: { motion: true },
  })), { log() {} });
  assert.equal(result.status, 200);
  const document = JSON.parse(result.body);
  assert.equal(document.building, 'LIB');
  assert.equal(document.room, '101');
  assert.equal(document.status, 'occupied');
  assert.equal(document.occupancyData.currentOccupancy, 3);
  assert.equal(document.sensorData.motion, true);
});
