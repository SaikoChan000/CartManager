-- +migrate Up

CREATE TABLE "users" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "username" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "carts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "name" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "items" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "price" float,
  "name" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "item_in_cart" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "cart_id" integer,
  "item_id" integer,
  "amount" integer,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "item_in_cart" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");

ALTER TABLE "item_in_cart" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

