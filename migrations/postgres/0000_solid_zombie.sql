CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"city" varchar(50) NOT NULL,
	"state" varchar(25) NOT NULL,
	"country_code" char(2) NOT NULL,
	"latitude" numeric(6, 4) NOT NULL,
	"longitude" numeric(7, 4) NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"update_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_active_cities_country_state_city" ON "cities" USING btree ("country_code","state","city") WHERE deleted_at IS NULL;