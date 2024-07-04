const Advertisement = require('../Advertisement'); // Assuming the path is correct
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

describe('Advertisement', () => {
    describe('createAdvertisement', () => {
        it('should create a new Advertisement', () => {
            const newAdvertisement = {
                news_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                heading: 'active',
                tagline:'vignesh',
                status:'efqed'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return Advertisement.createAdvertisement(newAdvertisement, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllAdvertisement', () => {
        it('should retrieve all News', async () => {
            const mockRows = [{ news_id: 1, heading: 'English' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return Advertisement.getAllAdvertisement((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM news',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateAdvertisementById', () => {
        it('should update a News by ID', async () => {
            const AdvertisementId = 1;
            const updatedAdvertisement = { heading: 'Updated English' };
            const mockResult = {
                news_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                heading: 'inactive',
                tagline:'marshal',                              
                status:'efqed',
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Advertisement.updateAdvertisementById(AdvertisementId, updatedAdvertisement, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE news SET ? WHERE news_id = ?',
                    [updatedAdvertisement, AdvertisementId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });

    describe('deleteAdvertisementById', () => {
        it('should delete a News by ID', async () => {
            const AdvertisementId = 1;
            const mockResult = { affectedRows: 1 };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Advertisement.deleteAdvertisementById(AdvertisementId, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'DELETE FROM news WHERE news_id = ?',
                    [AdvertisementId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});