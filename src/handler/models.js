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
        constructor(cart_id, item_id, amount) {
            this.cart_id = cart_id;
            this.item_id = item_id;
            this.amount = amount;
        }
    }

};