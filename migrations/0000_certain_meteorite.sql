CREATE TABLE "products" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric NOT NULL,
	"in_stock" boolean DEFAULT true NOT NULL
);
