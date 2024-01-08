module.exports = {
    Item: class {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    },

    Cart: class {
        constructor(id, userid, name) {
            this.id = id;
            this.userid = userid;
            this.name = name;
        }
    },

    User: class {
        constructor(id, username) {
            this.id = id;
            this.username = username;
        }
    },

    ItemInCart: class {
        constructor(cart_id, item_id, amount) {
            this.cart_id = cart_id;
            this.item_id = item_id;
            this.amount = amount;
        }
    }

};