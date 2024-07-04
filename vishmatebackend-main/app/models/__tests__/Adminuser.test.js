const Adminuser = require('../Adminuser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bcryptjs = require('bcryptjs');

// Mocking database connection
jest.mock('mysql2', () => {
    const mockConnection = {
        query: jest.fn(),
    };
    return {
        createConnection: jest.fn(() => mockConnection),
    };
});

describe('Adminuser', () => {
    describe('createAdminuser', () => {
        it('should create a new adminuser', () => {
            const newUser = {
                user_name: 'Test User',
                admin_email: 'test@example.com',
                password: 'password',
                category: 'user',
            };

            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { insertId: 1 }); // Mocking insertId
            });

            bcrypt.hash = jest.fn((password, salt, callback) => {
                callback(null, 'hashed_password');
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                Adminuser.createAdminuser(newUser, (error, result) => {
                    expect(mockQuery).toHaveBeenCalled();
                    expect(error).toBeNull();
                    expect(result).toBe(1); // Assuming you're expecting the insertId
                    resolve();
                });
            });
        });
    });

    describe('getAllAdminuser', () => {
        it('should retrieve all admin users', async () => {
            const mockQuery = jest.fn((query, callback) => {
                callback(null, [{ adminuser_id : 1, user_name: 'John', email: 'john@example.com' }]);
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                Adminuser.getAllAdminuser((error, result) => {
                    expect(mockQuery).toHaveBeenCalledWith(
                        'SELECT * FROM admin_user',
                        expect.any(Function)
                    );
                    expect(error).toBeNull();
                    expect(result).toEqual([{ adminuser_id: 1, user_name: 'John', email: 'john@example.com' }]);
                    resolve();
                });
            });
        });
    });

    describe('getUserByUsername', () => {
        it('should retrieve adminuser by username', async () => {
            const email = 'test@example.com';
            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, [{ email: 'test@example.com', user_name: 'Test User' }]);
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                Adminuser.getUserByUsername(email, (error, result) => {
                    expect(mockQuery).toHaveBeenCalled();
                    expect(error).toBeNull();
                    expect(result).toEqual({ email: 'test@example.com', user_name: 'Test User' });
                    resolve();
                });
            });
        });
    });

    describe('comparePasswords', () => {
        it('should compare passwords correctly', async () => {
            const mockCompare = jest.fn((password, hash, callback) => {
                callback(null, true); // Mocking password match
            });

            bcrypt.compare = mockCompare;

            return new Promise((resolve) => {
                Adminuser.comparePasswords('password', 'hashed_password', (error, result) => {
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
            const adminuserId = 1; // Replace with a valid user ID from your database
            const newAdminPassword = 'newAdminPassword';

            const hashMock = 'hashedPassword';
            const bcryptjsHashMock = jest.spyOn(bcryptjs, 'hash').mockResolvedValue(hashMock);

            const mockQuery = jest.fn((query, values, callback) => {
                callback(null, { affectedRows: 1 }); // Mocking affectedRows
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                Adminuser.adminupdatePassword(adminuserId, newAdminPassword).then((result) => {
                    expect(bcryptjsHashMock).toHaveBeenCalledWith(newAdminPassword, 10);
                    expect(mockQuery).toHaveBeenCalledWith(
                        'UPDATE admin_user SET password = ? WHERE adminuser_id = ?', // Adjusted SQL query
                        [hashMock, adminuserId],
                        expect.any(Function)
                    );
                    expect(result).toBe('Password updated successfully');
                    resolve();
                });
            });
        }, 10000); // Increased timeout to 10 seconds

        it('should reject with an error when newPassword is not provided', async () => {
            const adminuserId = 1; // Replace with a valid user ID from your database

            return new Promise((resolve) => {
                Adminuser.adminupdatePassword(adminuserId, '').catch((error) => {
                    expect(error).toEqual({ message: 'New password is required' });
                    resolve();
                });
            });
        });

        it('should reject with an error when hashing the password fails', async () => {
            const adminuserId = 1; // Replace with a valid user ID from your database
            const newAdminPassword = 'newAdminPassword';
            const hashError = new Error('Hashing error');

            jest.spyOn(bcryptjs, 'hash').mockRejectedValue(hashError);

            return new Promise((resolve) => {
                Adminuser.adminupdatePassword(adminuserId, newAdminPassword).catch((error) => {
                    expect(error).toEqual(hashError);
                    resolve();
                });
            });
        });

        it('should reject with an error when updating the password fails', async () => {
            const adminuserId = 1; // Replace with a valid user ID from your database
            const newAdminPassword = 'newAdminPassword';

            const hashMock = 'hashedPassword';
            jest.spyOn(bcryptjs, 'hash').mockResolvedValue(hashMock);

            const mockQuery = jest.fn((query, values, callback) => {
                callback(new Error('Update error'), null);
            });

            mysql.createConnection().query = mockQuery;

            return new Promise((resolve) => {
                Adminuser.adminupdatePassword(adminuserId, newAdminPassword).catch((error) => {
                    expect(error).toEqual(new Error('Update error'));
                    resolve();
                });
            });
        });
    });
});
