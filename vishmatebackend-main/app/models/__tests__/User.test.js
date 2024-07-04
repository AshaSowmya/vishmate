const User = require('../User');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bcryptjs = require('bcryptjs');

jest.mock('mysql2', () => {
    const mockConnection = {
        query: jest.fn(),
    };
    return {
        createConnection: jest.fn(() => mockConnection),
    };
});

describe('User', () => {
    describe('createUser', () => {
        it('should create a new user', () => {
            const newUser = {
                name: 'Test User',
                mobile: 'test@example.com',
                email: 'password',
                password: 'user',
                privacy_status: '123',
                select_plan: 'gold',
                plan_price:'399',
                subscription_id: 'sccacIqcq9959',
                userstatus: 'aac'
            };

            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });

            bcrypt.hash = jest.fn((password, salt, callback) => {
                callback(null, 'hashed_password');
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                User.createUser(newUser, (error, result) => {
                    expect(mockQuery).toHaveBeenCalled();
                    expect(error).toBeNull();
                    expect(result).toBe(1); // Assuming you're expecting the insertId
                    resolve();
                });
            });
        });
    });

    describe('getAllUsers', () => {
        it('should retrieve all users', async () => {
            const mockQuery = jest.fn((query, callback) => {
                callback(null, [{ customer_id: 1, name: 'John', email: 'john@example.com' }]);
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                User.getAllUsers((error, result) => {
                    expect(mockQuery).toHaveBeenCalledWith(
                        'SELECT * FROM userlogin',
                        expect.any(Function)
                    );
                    expect(error).toBeNull();
                    expect(result).toEqual([{ customer_id: 1, name: 'John', email: 'john@example.com' }]);
                    resolve();
                });
            });
        });
    });

    describe('getUserByUsername', () => {
        it('should retrieve user by username', () => {
            const email = 'test@example.com';
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, [{ email: 'test@example.com', name: 'Test User' }]);
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                User.getUserByUsername(email, (error, result) => {
                    expect(mockQuery).toHaveBeenCalled();
                    expect(error).toBeNull();
                    expect(result).toEqual({ email: 'test@example.com', name: 'Test User' });
                    resolve();
                });
            });
        });
    });

    describe('comparePasswords', () => {
        it('should compare passwords correctly', () => {
            const mockCompare = jest.fn((password, hash, callback) => {
                callback(null, true); // Mocking password match
            });

            bcrypt.compare = mockCompare;

            return new Promise((resolve) => {
                User.comparePasswords('password', 'hashed_password', (error, result) => {
                    expect(mockCompare).toHaveBeenCalled();
                    expect(error).toBeNull();
                    expect(result).toBe(true);
                    resolve();
                });
            });
        });
    });

    describe('updatePassword', () => {
        it('should update the user password', async () => {
            const userId = 1; // Replace with a valid user ID from your database
            const newPassword = 'newPassword';

            const hashMock = 'hashedPassword';
            const bcryptjsHashMock = jest.spyOn(bcryptjs, 'hash').mockResolvedValue(hashMock);

            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { affectedRows: 1 }); // Mocking affectedRows
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                User.updatePassword(userId, newPassword).then((result) => {
                    expect(bcryptjsHashMock).toHaveBeenCalledWith(newPassword, 10);
                    expect(mockQuery).toHaveBeenCalledWith(
                        'UPDATE userlogin SET password = ? WHERE customer_id = ?', // Adjusted SQL query
                        [hashMock, userId],
                        expect.any(Function)
                    );
                    expect(result).toBe('Password updated successfully');
                    resolve();
                });
            });
        },10000);

        it('should reject with an error when newPassword is not provided', async () => {
            const userId = 1; // Replace with a valid user ID from your database

            return new Promise((resolve) => {
                User.updatePassword(userId, '').catch((error) => {
                    expect(error).toEqual({ message: 'New password is required' });
                    resolve();
                });
            });
        });

        it('should reject with an error when hashing the password fails', async () => {
            const userId = 1; // Replace with a valid user ID from your database
            const newPassword = 'newPassword';
            const hashError = new Error('Hashing error');

            jest.spyOn(bcryptjs, 'hash').mockRejectedValue(hashError);

            return new Promise((resolve) => {
                User.updatePassword(userId, newPassword).catch((error) => {
                    expect(error).toEqual(hashError);
                    resolve();
                });
            });
        });

        it('should reject with an error when updating the password fails', async () => {
            const userId = 1; // Replace with a valid user ID from your database
            const newPassword = 'newPassword';

            const hashMock = 'hashedPassword';
            jest.spyOn(bcryptjs, 'hash').mockResolvedValue(hashMock);

            const mockQuery = jest.fn((query, values, callback) => {
                callback(new Error('Update error'), null);
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                User.updatePassword(userId, newPassword).catch((error) => {
                    expect(error).toEqual(new Error('Update error'));
                    resolve();
                });
            });
        });
    });
});