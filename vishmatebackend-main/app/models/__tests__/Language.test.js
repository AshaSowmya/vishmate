const Language = require('../Language'); // Assuming the path is correct
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

describe('Language', () => {
    describe('createLanguage', () => {
        it('should create a new language', () => {
            const newLanguage = {
                language_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                language_name: 'English',
                status: 'active'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return Language.createLanguage(newLanguage, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllLanguage', () => {
        it('should retrieve all languages', async () => {
            const mockRows = [{ language_id: 1, language_name: 'English' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return Language.getAllLanguage((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM language',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateLanguageById', () => {
        it('should update a language by ID', async () => {
            const languageId = 1;
            const updatedLanguage = { language_name: 'Updated English' };
            const mockResult = {
                language_image: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                language_name: 'Updated English',
                status: 'inactive'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Language.updateLanguageById(languageId, updatedLanguage, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE language SET ? WHERE language_id = ?',
                    [updatedLanguage, languageId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });

    describe('deleteLanguageById', () => {
        it('should delete a language by ID', async () => {
            const languageId = 1;
            const mockResult = { affectedRows: 1 };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return Language.deleteLanguageById(languageId, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'DELETE FROM language WHERE language_id = ?',
                    [languageId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});
