const Categorypost = require('../Categorypost'); // Assuming the path is correct
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

describe('Categorypost', () => {
    describe('createCategorypost', () => {
        it('should create a new Categorypost', () => {
            const newCategorypost = {
                category_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                category_name: 'sample',
                category_status:'active'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return Categorypost.createCategorypost(newCategorypost, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllCategorypost', () => {
        it('should retrieve all Categorypost', async () => {
            const mockRows = [{ category_id: 1, status: 'English' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return Categorypost.getAllCategorypost((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM category_post',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateCategorypostById', () => {
        it('should update a category by ID', async () => {
            const CategorypostId = 1;
            const updatedCategorypost = { heading: 'Updated English' };
            const mockResult = {
                category_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                category_name: 'sample',
                category_status:'active'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Categorypost.updateCategorypostById(CategorypostId, updatedCategorypost, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE category_post SET ? WHERE category_id = ?',
                    [updatedCategorypost, CategorypostId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });

    describe('deleteCategorypostById', () => {
        it('should delete a categorypost by ID', async () => {
            const CategorypostId = 1;
            const mockResult = { affectedRows: 1 };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Categorypost.deleteCategorypostById(CategorypostId, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'DELETE FROM category_post WHERE category_id = ?',
                    [CategorypostId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});