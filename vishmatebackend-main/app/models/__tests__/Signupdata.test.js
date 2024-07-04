const Signupdata = require('../Signupdata');
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

describe('Signupdata', () => {
    describe('createSignupdata', () => {
        it('should create a new Signup data', () => {
            const newSignupdata = {
                name: 'Test Name',
                mobilenumber: '1234567890',
                email: 'test@example.com'
            };

            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });

            mysql.createConnection().query = mockQuery;

            return Signupdata.createSignupdata(newSignupdata, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllSignupdata', () => {
        it('should retrieve all Signup data', async () => {
            const mockRows = [{ signupdata_id: 1, name: 'Test User' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return Signupdata.getAllSignupdata((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM signupdata',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateSignupdataById', () => {
        it('should update a signup data by ID', async () => {
            const signupdataId = 1;
            const updatedSignupdata = { name: 'Updated Signup data' };
            const mockResult = {
                name: 'Updated User',
                mobilenumber: '8220886251',
                email: 'admin@gmail.com',
            };

            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });

            mysql.createConnection().query = mockQuery;

            return Signupdata.updateSignupdataById(signupdataId, updatedSignupdata, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE signupdata SET ? WHERE signupdata_id = ?',
                    [updatedSignupdata, signupdataId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});
