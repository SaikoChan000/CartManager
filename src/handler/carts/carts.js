const domain = require('../../domain/domain.js')
const dto = require('../models.js')
module.exports = {
    getAllCarts: async function() {
        try {
            const domainCarts = await domain.getAllCarts();
            const dtoCarts = domainCarts.map(cart => new dto.Cart(cart.id, cart.userid, cart.name, cart.created_at))
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
                return { status: 404, message: 'User not found' };
            }
            let addCartResult = await domain.addCart(name, userid);
            if (addCartResult instanceof Error) {
                return { status: 500, message: `Adding Cart failed with name ${name} for user with id ${userid}` };
            }
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
            let userResult = await domain.getUserById(userid);
            if (userResult instanceof Error) {
                return { status: 404, message: 'User not found' };
            }
            const deleteCartsResult = await domain.deleteCartsByUserId(userid);
            if (deleteCartsResult instanceof Error) {
                return { status: 500, message: `Deleting Carts from user with id ${userid} failed`};
            }
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
            let domainCart = await domain.getCartContent(cartid);
            if (domainCart instanceof Error) {
                return { status: 500, message: `Failed to get Cart Content for Cart with ID ${cartid}`};
            }
            //transform domain cart object into dto ItemInCart array
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
            let cartResult = awaitdomain.getCartById(cartid);
            if (cartResult instanceof Error) {
                return { status: 404, message: 'Cart not found' };
            }
            const domainCartDelete = await domain.deleteCartById(cartid);
            if (domainCartDelete instanceof Error) {
                return { status: 500, message: `Deleting cart with ID ${cartid} failed`};
            }
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
            const domainAddItemResult = await domain.addItemToCart(cartId, itemId, amount);
            if (domainAddItemResult instanceof Error){
                // wir lesen hier den error raus den wir in der domain.js zurückgeben
                return { status: 400, message: domainAddItemResult.message};
            }
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
            const domainContentResult = await domain.getItemInCart(cartId, itemId);
            if (domainContentResult instanceof Error) {
                return { status: 404, message: 'Entry not found' };
            }
            const domainRemoveResult = await domain.removeItemFromCar(cartId, itemId);
            if (domainRemoveResult instanceof Error){
                return { status: 500, message: `Removing Item with ID ${itemId} from cart with ID ${cartId} failed`};
            }
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
            let domainCartResult = await domain.getCartById(cartId);
            if (domainCartResult instanceof Error) {
                return { status: 404, message: 'Cart not found' };
            }
            const domainClearResult = await domain.clearCart(cartId);
            if (domainClearResult instanceof Error){
                return { status: 500, message: `Clearing cart with ID ${cartId} failed`}
            }
            return { status: 200, message: `Emptied cart with id ${cartId}` };
        } catch (err) {
            console.error(err);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
