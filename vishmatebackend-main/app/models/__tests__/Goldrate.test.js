const Goldrate = require('../Goldrate');
const mysql = require('mysql2');

jest.mock('mysql2', () => {
    const mockQuery = jest.fn();
    const mockConnection = {
        query: mockQuery,
    };
    return {
        createConnection: jest.fn(() => mockConnection),
    };
});

describe('Goldrate', () => {
    describe('createGoldrate', () => {
        it('should create a new Add Goldrate', () => {
            const newGoldrate = {
                time: '12:02:06.000000',
                location: '1234567890',
                goldrate: 'food',
                silverrate:'wdv'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return Goldrate.createGoldrate(newGoldrate, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllGoldrate', () => {
        it('should retrieve all goldrate', async () => {
            const mockRows = [{ goldrate_id: 1, name: 'Test User' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return Goldrate.getAllGoldrate((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM goldrate',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateGoldrateById', () => {
        it('should update a goldrate by ID', async () => {
            const goldrateId = 1;
            const updatedGoldrate = { name: 'Updated goldrate data' };
            const mockResult = {
                time: '11:02:06.000000',
                location: '4481811818',
                goldrate: 'wewe',
                silverrate:'wefef'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Goldrate.updateGoldrateById(goldrateId, updatedGoldrate, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE goldrate SET ? WHERE goldrate_id = ?',
                    [updatedGoldrate, goldrateId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});
