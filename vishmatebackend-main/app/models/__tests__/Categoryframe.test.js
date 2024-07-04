const Categoryframe = require('../Categoryframe'); // Assuming the path is correct
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

describe('Categoryframe', () => {
    describe('createCategoryframe', () => {
        it('should create a new Categoryframe', () => {
            const newCategoryframe = {
                photo: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                status: 'active',
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return Categoryframe.createCategoryframe(newCategoryframe, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllCategoryframe', () => {
        it('should retrieve all News', async () => {
            const mockRows = [{ categoryframe_id: 1, status: 'English' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return Categoryframe.getAllCategoryframe((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM news',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateCategoryframeById', () => {
        it('should update a News by ID', async () => {
            const CategoryframeId = 1;
            const updatedCategoryframe = { heading: 'Updated English' };
            const mockResult = {
                photo: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                status: 'inactive',
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Categoryframe.updateCategoryframeById(CategoryframeId, updatedCategoryframe, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE news SET ? WHERE categoryframe_id = ?',
                    [updatedCategoryframe, CategoryframeId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });

    describe('deleteCategoryframeById', () => {
        it('should delete a category_frame by ID', async () => {
            const CategoryframeId = 1;
            const mockResult = { affectedRows: 1 };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Categoryframe.deleteCategoryframeById(CategoryframeId, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'DELETE FROM category_frame WHERE categoryframe_id = ?',
                    [CategoryframeId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});