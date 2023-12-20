const db = require('../../database/db.js');
module.exports = {
    getAllCarts: async function() {
        try {
            const result = await db.query(db.getAllCartsQuery);
            return { status: 200, data: result.rows };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    addCart: async function (name, userid) {
        let parsedId = parseInt(userid);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            let userResult = await db.query(db.getUserByIdQuery, [userid]);
            if (userResult.rows.length === 0) {
                return { status: 404, message: 'User not found' };
            }
            await db.query(db.addCartQuery, [name, userid]);
            return { status: 200, message: `Added cart with name ${name} for user with id ${userid}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    deleteCartsByUserId: async function (userid) {
        let parsedId = parseInt(userid);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            let userResult = await db.query(db.getUserByIdQuery, [userid]);
            if (userResult.rows.length === 0) {
                return { status: 404, message: 'User not found' };
            }
            await db.query(db.deleteCartsByUserIdQuery, [userid]);
            return { status: 200, message: `Deleted all carts from user with id ${userid}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    getCartById: async function (cartid) {
        let parsedId = parseInt(cartid);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            let cartResult = await db.query(db.getCartByIdQuery, [cartid]);
            if (cartResult.rows.length === 0) {
                return { status: 404, message: 'Cart not found' };
            }
            const cartContentResult = await db.query(db.getCartContentQuery, [cartid]);
            return { status: 200, data: cartContentResult.rows };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    deleteCartById: async function (cartid) {
        let parsedId = parseInt(cartid);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            let cartResult = await db.query(db.getCartByIdQuery, [cartid]);
            if (cartResult.rows.length === 0) {
                return { status: 404, message: 'Cart not found' };
            }
            await db.query(db.deleteCartByIdQuery, [cartid]);
            return { status: 200, message: `Deleted cart with id ${cartid}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    addItemToCart: async function (cartId, itemId, amount) {
        let parsedCartId = parseInt(cartId);
        let parsedItemId = parseInt(itemId);
        if (isNaN(parsedCartId) || isNaN(parsedItemId)) {
            return { status: 400, message: 'Invalid cart or item ID supplied' };
        }
        try {
            let cartResult = await db.query(db.getCartByIdQuery, [cartId]);
            if (cartResult.rows.length === 0) {
                return { status: 404, message: 'Cart not found' };
            }
            let itemResult = await db.query(db.getItemByIdQuery, [itemId]);
            if (itemResult.rows.length === 0) {
                return { status: 404, message: 'Item not found' };
            }
            await db.query(db.addItemToCartQuery, [cartId, itemId, amount]);
            return { status: 200, message: `Added ${amount} of item with id ${itemId} into cart with id ${cartId}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    removeItemFromCart: async function (cartId, itemId) {
        let parsedCartId = parseInt(cartId);
        let parsedItemId = parseInt(itemId);
        if (isNaN(parsedCartId) || isNaN(parsedItemId)) {
            return { status: 400, message: 'Invalid cart or item ID supplied' };
        }
        try {
            let result = await db.query(db.getItemInCartQuery, [cartId, itemId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'Entry not found' };
            }
            await db.query(db.removeItemFromCartQuery, [cartId, itemId]);
            return { status: 200, message: `Removed item with id ${itemId} from cart with id ${cartId}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    clearCart: async function (cartId) {
        let parsedId = parseInt(cartId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid cart ID supplied' };
        }
        try {
            let result = await db.query(db.getCartByIdQuery, [cartId]);
            if (result.rows.length === 0) {
                return { status: 404, message: 'Cart not found' };
            }
            await db.query(db.clearCartQuery, [cartId]);
            return { status: 200, message: `Emptied cart with id ${cartId}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
