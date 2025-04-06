-- SQL Database Setup for USF SmartStudy Spaces
-- Creates tables for user authentication, audit logs, and reference data

-- 1. Create Users Table
CREATE TABLE Users (
    UserId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    NetID NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    LastLogin DATETIME2 NULL
);

-- 2. Create Authentication Table
CREATE TABLE Authentication (
    AuthId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    PasswordHash NVARCHAR(255) NOT NULL,
    Salt NVARCHAR(100) NOT NULL,
    LastUpdated DATETIME2 DEFAULT SYSUTCDATETIME()
);

-- 3. Create Audit Log Table
CREATE TABLE AuditLogs (
    LogId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NULL FOREIGN KEY REFERENCES Users(UserId),
    ActionType NVARCHAR(50) NOT NULL,
    TableName NVARCHAR(100) NOT NULL,
    RecordId NVARCHAR(255) NOT NULL,
    OldValues NVARCHAR(MAX) NULL,
    NewValues NVARCHAR(MAX) NULL,
    Timestamp DATETIME2 DEFAULT SYSUTCDATETIME(),
    IPAddress NVARCHAR(50) NULL
);

-- 4. Create Reference Data Tables
CREATE TABLE Buildings (
    BuildingId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Code NVARCHAR(10) NOT NULL UNIQUE,
    Name NVARCHAR(100) NOT NULL,
    Campus NVARCHAR(50) NOT NULL,
    IsActive BIT DEFAULT 1
);

CREATE TABLE StudySpaces (
    SpaceId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    BuildingId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Buildings(BuildingId),
    RoomNumber NVARCHAR(20) NOT NULL,
    Capacity INT NOT NULL,
    SpaceType NVARCHAR(50) NOT NULL,
    Features NVARCHAR(MAX) NULL,
    IsAccessible BIT DEFAULT 0,
    UNIQUE (BuildingId, RoomNumber)
);

-- 5. Create Indexes for Performance
CREATE INDEX IX_Users_NetID ON Users(NetID);
CREATE INDEX IX_AuditLogs_Timestamp ON AuditLogs(Timestamp);
CREATE INDEX IX_StudySpaces_Building ON StudySpaces(BuildingId);