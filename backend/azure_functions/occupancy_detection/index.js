// Occupancy Detection Function
// Processes IoT sensor data and updates space availability

const { app } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid');

app.http('occupancyDetection', {
    // New logic for real-time occupancy tracking
    methods: ['GET', 'POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        context.log('Processing occupancy data...');

        try {
            const building = request.params.building;
            const room = request.params.room;
            const body = await request.text();
            const data = body ? JSON.parse(body) : null;

            // Validate input
            if (!building || !room) {
                return { status: 400, body: 'Building and room parameters are required' };
            }

            // Create document for Cosmos DB with additional fields
            const occupancyData = {
                historicalData: [], // To store historical occupancy data
                currentOccupancy: data?.currentOccupancy || 0, // Current occupancy count
            };
            const document = {
                id: uuidv4(),
                timestamp: new Date().toISOString(),
                building,
                room,
                status: data?.status || 'unknown', // Status of the room
                occupancyData, // Include occupancy data in the document
                sensorData: data?.sensorData || null,
                metadata: {
                    source: 'iot-sensor',
                    processedAt: new Date().toISOString()
                }
            };

            // Return response and save to Cosmos DB
            return {
                body: JSON.stringify(document),
                status: 200,
                outputDocument: document
            };
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return {
                status: 500,
                body: `Internal Server Error: ${error.message}`
            };
        }
    }
});
