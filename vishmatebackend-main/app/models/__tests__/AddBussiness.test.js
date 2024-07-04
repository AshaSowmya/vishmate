const AddBussiness = require('../AddBussiness'); // Assuming the path is correct
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

describe('AddBussiness', () => {
    describe('createAddBussiness', () => {
        it('should create a new Bussiness', () => {
            const newAddBussiness = {
                customer_id: '1',
                upload_logo: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                selected_category: 'active',
                bussiness_name:'vignesh',
                address:'efqed',
                mobile_no:'8220886251',
                alternate_no:'9245511712',
                email:'admin@gmail.com',
                website:'www.demo.com'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });
            mysql.createConnection().query = mockQuery;
            return AddBussiness.createAddBussiness(newAddBussiness, (error, result) => {
                expect(mockQuery).toHaveBeenCalled();
                expect(error).toBeNull();
                expect(result).toEqual(1); // Assuming you're expecting the insertId
            });
        });
    });

    describe('getAllAddBussiness', () => {
        it('should retrieve all AddBussiness', async () => {
            const mockRows = [{ bussiness_id: 1, bussiness_name: 'English' }];
            const mockQuery = jest.fn((query, callback) => {
                callback(null, mockRows);
            });

            mysql.createConnection().query = mockQuery;

            return AddBussiness.getAllAddBussiness((error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'SELECT * FROM add_bussiness',
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockRows);
            });
        });
    });

    describe('updateAddBussinessById', () => {
        it('should update a AddBussiness by ID', async () => {
            const AddBussinessId = 1;
            const updatedAddBussiness = { bussiness_name: 'Updated English' };
            const mockResult = {
                customer_id: '1',
                upload_logo: '5ba3a6ab-1b45-41a2-85c6-0424f48c183b-Digital Marketing Hiring Poster 09 May.jpg',
                selected_category: 'inactive',
                bussiness_name:'marshal',
                address:'efqed',
                mobile_no:'9245511712',
                alternate_no:'8220886251',
                email:'demo@gmail.com',
                website:'www.admin.com'
            };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return AddBussiness.updateAddBussinessById(AddBussinessId, updatedAddBussiness, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'UPDATE add_bussiness SET ? WHERE bussiness_id = ?',
                    [updatedAddBussiness, AddBussinessId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });

    describe('deleteAddBussinessById', () => {
        it('should delete a AddBussiness by ID', async () => {
            const AddBussinessId = 1;
            const mockResult = { affectedRows: 1 };
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, mockResult);
            });
            mysql.createConnection().query = mockQuery;
            return AddBussiness.deleteAddBussinessById(AddBussinessId, (error, result) => {
                expect(mockQuery).toHaveBeenCalledWith(
                    'DELETE FROM add_bussiness WHERE bussiness_id = ?',
                    [AddBussinessId],
                    expect.any(Function)
                );
                expect(error).toBeNull();
                expect(result).toEqual(mockResult);
            });
        });
    });
});
