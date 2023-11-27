-- +migrate Up

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "created_at" timestamp
);

CREATE TABLE "carts" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "name" varchar
);

CREATE TABLE "items" (
  "id" integer PRIMARY KEY,
  "price" integer,
  "name" varchar
);

CREATE TABLE "item_in_cart" (
  "id" integer PRIMARY KEY,
  "cart_id" integer,
  "item_id" integer,
  "amount" integer
);

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "item_in_cart" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");

ALTER TABLE "item_in_cart" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");
