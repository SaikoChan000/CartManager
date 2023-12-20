const db = require('../../database/db.js');
module.exports = {
    getAllItems: async function () {
        try {
            const result = await db.query(db.getAllItemsQuery);
            return { status: 200, data: result.rows };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    addItem: async function (name, price) {
        try {
            await db.query(db.addItemQuery, [name, price]);
            return { status: 200, message: `Added item named ${name} with price ${price}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    deleteItemById: async function (itemId) {
        let parsedId = parseInt(itemId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            let result = await db.query(db.getItemByIdQuery, [itemId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'Item not found' };
            }
            await db.query(db.deleteItemByIdQuery, [itemId]);
            return { status: 200, message: `Deleted item with id ${itemId}.` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    getItemById: async function (itemId) {
        let parsedId = parseInt(itemId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            const result = await db.query(db.getItemByIdQuery, [itemId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'Item not found' };
            }
            return { status: 200, data: result.rows };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    updateItemById: async function (itemId, name, price) {
        let parsedId = parseInt(itemId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            let result = await db.query(db.getItemByIdQuery, [itemId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'Item not found' };
            }
            await db.query(db.updateItemByIdQuery, [name, price, itemId]);
            return { status: 200, message: 'Update done' };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}