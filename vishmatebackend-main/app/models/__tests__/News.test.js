const News = require('../News'); // Assuming the path is correct
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

describe('News', () => {
    describe('createNews', () => {
        it('should create a new News', () => {
            const newNews = {
                news_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                heading: 'active',
                tagline:'vignesh',
                status:'efqed'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return News.createNews(newNews, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllNews', () => {
        it('should retrieve all News', async () => {
            const mockRows = [{ news_id: 1, heading: 'English' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return News.getAllNews((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM news',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateNewsById', () => {
        it('should update a News by ID', async () => {
            const NewsId = 1;
            const updatedNews = { heading: 'Updated English' };
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
            return News.updateNewsById(NewsId, updatedNews, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE news SET ? WHERE news_id = ?',
                    [updatedNews, NewsId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });

    describe('deleteNewsById', () => {
        it('should delete a News by ID', async () => {
            const NewsId = 1;
            const mockResult = { affectedRows: 1 };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return News.deleteNewsById(NewsId, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'DELETE FROM news WHERE news_id = ?',
                    [NewsId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});
