const Marketplace = require('../Marketplace'); // Assuming the path is correct
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

describe('Marketplace', () => {
    describe('createMarketplace', () => {
        it('should create a new Marketplace', () => {
            const newMarketplace = {
                service_name:'vignesh',
                price_amount:'200',
                selected_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                about: 'sample',
                tools_used:'node',
                status:'active'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return Marketplace.createMarketplace(newMarketplace, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllMarketplace', () => {
        it('should retrieve all Marketplace', async () => {
            const mockRows = [{ marketplace_id: 1, status: 'English' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return Marketplace.getAllMarketplace((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM market_place',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateMarketplaceById', () => {
        it('should update a category by ID', async () => {
            const MarketplaceId = 1;
            const updatedMarketplace = { heading: 'Updated English' };
            const mockResult = {
                service_name:'vignesh',
                price_amount:'200',
                selected_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                about: 'sample',
                tools_used:'node',
                status:'active'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Marketplace.updateMarketplaceById(MarketplaceId, updatedMarketplace, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE market_place SET ? WHERE marketplace_id = ?',
                    [updatedMarketplace, MarketplaceId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });

    describe('deleteMarketplaceById', () => {
        it('should delete a Marketplace by ID', async () => {
            const MarketplaceId = 1;
            const mockResult = { affectedRows: 1 };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Marketplace.deleteMarketplaceById(MarketplaceId, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'DELETE FROM market_place WHERE marketplace_id = ?',
                    [MarketplaceId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});