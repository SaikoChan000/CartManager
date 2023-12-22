module.exports = {
    Item: class {
        constructor(id, name, price, created_at) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.created_at = created_at;
        }
    },

    Cart: class {
        constructor(id, userid, name, created_at) {
            this.id = id;
            this.userid = userid;
            this.name = name;
            this.created_at = created_at;
        }
    },

    User: class {
        constructor(id, username, created_at) {
            this.id = id;
            this.username = username;
            this.created_at = created_at;
        }
    },

    ItemInCart: class {
        constructor(id, cart_id, item_id, amount, created_at) {
            this.id = id;
            this.cart_id = cart_id;
            this.amount = amount;
            this.created_at = created_at;
        }
    }

};