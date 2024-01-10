const domain = require('../../domain/domain.js')
const dto = require('../models.js')
module.exports = {
    getAllCarts: async function() {
        try {
            const domainCarts = await domain.getAllCarts();
            if (domainCarts instanceof Error) {
                return { status: 409, message: domainCarts.message};
            }
            if (Object.keys(domainCarts).length === 0) {
                return { status: 404, message: 'No carts found'};
            }
            const dtoCarts = domainCarts.map(cart => new dto.Cart(cart.id, cart.userid, cart.name))
            return { status: 200, data: dtoCarts };
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
            let userResult = await domain.getUserById(userid);
            if (userResult instanceof Error) {
                return { status: 409, message: userResult.message};
            }
            if (Object.keys(userResult).length === 0) {
                return { status: 404, message: `Can not find user (user ID: ${userid})`};
            }
            let addCartResult = await domain.addCart(name, userid);
            if (addCartResult instanceof Error) {
                return { status: 409, message: addCartResult.message};
            }
            return { status: 201, message: `Added cart with name ${name} for user (user ID: ${userid})` };
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
            let userResult = await domain.getUserById(userid);
            if (userResult instanceof Error) {
                return { status: 409, message: userResult.message};
            }
            if (Object.keys(userResult).length === 0) {
                return { status: 404, message: `Can not find user (user ID: ${userid})`};
            }
            const deleteCartsResult = await domain.deleteCartsByUserId(userid);
            if (deleteCartsResult instanceof Error) {
                return { status: 409, message: deleteCartsResult.message};
            }
            return { status: 200, message: `Deleted all carts from user (user ID: ${userid})` };
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
            let domainCart = await domain.getCartContent(cartid);
            if (domainCart instanceof Error) {
                return { status: 409, message: domainCart.message};
            }
            if (Object.keys(domainCart).length === 0) {
                return { status: 404, message: `Can not find cart (cart ID: ${cartid})`};
            }
            if (Array.isArray(domainCart.cartItems)) {
                const cartContent = domainCart.cartItems.map(cartItem => new dto.ItemInCart(cartid, cartItem.item.id, cartItem.amount));
                return { status: 200, data: cartContent };
            } else {
                throw new Error('Cart Content is not an array');
            }
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
            let cartResult = await domain.getCartById(cartid);
            if (cartResult instanceof Error) {
                return { status: 409, message: cartResult.message};
            }
            if (Object.keys(cartResult).length === 0) {
                return { status: 404, message: `Can not find cart (cart ID: ${cartid})`};
            }
            const domainCartDelete = await domain.deleteCartById(cartid);
            if (domainCartDelete instanceof Error) {
                return { status: 409, message: domainCartDelete.message};
            }
            return { status: 200, message: `Deleted cart (cart ID: ${cartid})` };
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
        let cartResult = await domain.getCartById(cartId);
            if (cartResult instanceof Error) {
                return { status: 409, message: cartResult.message};
            }
            if (Object.keys(cartResult).length === 0) {
                return { status: 404, message: `Can not find cart (cart ID: ${cartId})`};
            }
        try {
            const domainAddItemResult = await domain.addItemToCart(cartId, itemId, amount);
            if (domainAddItemResult instanceof Error){
                return { status: 409, message: domainAddItemResult.message};
            }
            return { status: 200, message: `Added ${amount} of item into cart (item ID: ${itemId}, cart ID: ${cartId})` };
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
            let cartResult = awaitdomain.getCartById(cartId);
            if (cartResult instanceof Error) {
                return { status: 409, message: cartResult.message};
            }
            if (Object.keys(cartResult).length === 0) {
                return { status: 404, message: `Can not find cart (cart ID: ${cartId})`};
            }
            const domainContentResult = await domain.getItemInCart(cartId, itemId);
            if (domainContentResult instanceof Error) {
                return { status: 409, message: domainContentResult.message};
            }
            if (Object.keys(domainContentResult).length === 0) {
                return { status: 404, message: `No entry for item in cart found (item ID: ${itemId}, cart ID: ${cartId})`};
            }
            const domainRemoveResult = await domain.removeItemFromCart(cartId, itemId);
            if (domainRemoveResult instanceof Error){
                return { status: 409, message: domainRemoveResult.message};
            }
            return { status: 200, message: `Removed item from cart (item ID: ${itemId}, cart ID: ${cartId})` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    clearCart: async function (cartId) {
        let parsedId = parseInt(cartId);
        if (isNaN(parsedId)) {
            return { status: 400, message: 'Invalid ID supplied' };
        }
        try {
            let domainCartResult = await domain.getCartById(cartId);
            if (domainCartResult instanceof Error) {
                return { status: 409, message: domainCartResult.message};
            }
            if (Object.keys(domainCartResult). length === 0) {
                return { status: 404, message: `Can not find cart (cart ID: ${cartId})`};
            }
            const domainClearResult = await domain.clearCart(cartId);
            if (domainClearResult instanceof Error){
                return { status: 409, message: domainClearResult.message};
            }
            return { status: 200, message: `Cart cleared (cart ID: ${cartId})` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
