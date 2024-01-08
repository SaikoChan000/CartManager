const db = require('../../database/db.js');
const domain = require('../../domain/domain.js');
const dto = require('../models.js')
module.exports = {
    getAllUsers: async function () {
        try {
            const usersArr = await domain.getAllUsers();
            if (usersArr instanceof Error) {
                return { status: 400, message: usersArr.message};
            }
            if (Object.keys(usersArr).length === 0) {
                return { status: 404, message: 'No users found'};
            }
            const dtoUsers = usersArr.map(user => new dto.User(user.id, user.username));
            return { status: 200, data: dtoUsers };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    addUser: async function (username) {
        try {
            const addUserResult = domain.addUser(username);
            if (addUserResult instanceof Error) {
                return { status: 500, message: addUserResult.message};
            }
            return { status: 200, message: `Added user ${username}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    getUserById: async function (userId) {
        let parsedId = parseInt(userId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            const userResult = await domain.getUserById(userId);
            if (userResult instanceof Error) {
                return { status: 400, message: userResult.message };
            }
            const userDto = userResult.map(user => new dto.User(user.id, user.username));
            if (Object.keys(userDto).length === 0) {
                return { status: 404, message: `No user found (user ID: ${userId})`};
            }
                return { status: 200, data: userDto };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    updateUserById: async function (userId, username) {
        let parsedId = parseInt(userId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            //check if user exists;
            const userResult = await domain.getUserById(userId);
            if (Object.keys(userResult).length === 0) {
                return { status: 404, message: `No user found (user ID: ${userId})` };
            }
            const updateUserResult = await domain.updateUserById(username, userId);
            if (updateUserResult instanceof Error) {
                return { status: 400, message: updateUserResult.message};
            }
            return { status: 200, message: 'Update done' };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    deleteUserById: async function (userId) {
        let parsedId = parseInt(userId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            //check if user exists;
            const userResult = await domain.getUserById(userId);
            if (Object.keys(userResult).length === 0) {
                return { status: 404, message: `No user with found (user ID: ${userId})` };
            }
            const deleteUserResult = await domain.deleteUserById(userId);
            if (deleteUserResult instanceof Error) {
                return { status: 400, message: deleteUserResult.message};
            }
            return { status: 200, message: `Deleted user (user ID: ${userId})` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}