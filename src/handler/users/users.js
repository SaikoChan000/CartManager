const db = require('../../database/db.js');
module.exports = {
    getAllUsers: async function () {
        try {
            const result = await db.query(db.getAllUsersQuery);
            return { status: 200, data: result.rows };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    addUser: async function (username) {
        try {
            await db.query(db.addUserQuery, [username]);
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
            const result = await db.query(db.getUserByIdQuery, [userId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'User not found' };
            }
            return { status: 200, data: result.rows };
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
            let result = await db.query(db.getUserByIdQuery, [userId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'User not found' };
            }
            await db.query(db.updateUserByIdQuery, [username, userId]);
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
            let result = await db.query(db.getUserByIdQuery, [userId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'User not found' };
            }
            await db.query(db.deleteUserByIdQuery, [userId]);
            return { status: 200, message: `Deleted user with id ${userId}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}