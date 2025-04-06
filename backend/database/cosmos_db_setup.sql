-- Cosmos DB Setup for USF SmartStudy Spaces
-- Creates required containers and stored procedures

-- 1. Create Occupancy Data Container
CREATE CONTAINER IF NOT EXISTS occupancyData WITH PARTITION KEY = /building

-- 2. Create Bookings Container
CREATE CONTAINER IF NOT EXISTS bookings WITH PARTITION KEY = /userId

-- 3. Create Users Container
CREATE CONTAINER IF NOT EXISTS users WITH PARTITION KEY = /email

-- 4. Create Stored Procedure for Occupancy Updates
CREATE PROCEDURE updateOccupancy
@building string, @room string, @status string
AS BEGIN
    -- Upsert operation for occupancy records
    var document = {
        id: @building + '-' + @room + '-' + new Date().toISOString(),
        building: @building,
        room: @room,
        status: @status,
        timestamp: new Date().toISOString()
    };
    var isAccepted = __.createDocument(
        __.getSelfLink(),
        document,
        (err, item) => {
            if (err) throw err;
        });
    if (!isAccepted) getContext().getResponse().setBody(500, 'Failed to update occupancy');
END

-- 5. Create Indexing Policy for efficient queries
ALTER CONTAINER occupancyData WITH INDEXING POLICY {
    "indexingMode": "consistent",
    "automatic": true,
    "includedPaths": [
        {
            "path": "/building/?",
            "indexes": [
                {
                    "kind": "Range",
                    "dataType": "String",
                    "precision": -1
                }
            ]
        },
        {
            "path": "/timestamp/?",
            "indexes": [
                {
                    "kind": "Range",
                    "dataType": "Number",
                    "precision": -1
                }
            ]
        }
    ]
}