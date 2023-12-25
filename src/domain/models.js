module.exports = {
    Item: class {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    },

    CartItem: class {
        constructor(item, amount) {
            this.item = item;
            this.amount = amount;
        }
    },

    Cart: class {
        constructor(id, userid, name, cartItems) {
            this.id = id;
            this.userid = userid;
            this.name = name;
            this.cartItems = cartItems;
        }
    },

    User: class {
        constructor(id, username) {
            this.id = id;
            this.username = username;
        }
    }
};