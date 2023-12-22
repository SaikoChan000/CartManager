module.exports = {
    Item: class {
        constructor(id, price, name, created_at) {
            this.id = id;
            this.price = price;
            this.name = name;
            this.created_at = created_at;
        }
    },

    Cart: class {
        constructor(id, user_id, name, created_at) {
            this.id = id;
            this.user_id = user_id;
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
            this.item_id = item_id;
            this.amount = amount;
            this.created_at = created_at;
        }
    }
};