CREATE TABLE "cities_weather" (
	"id" uuid PRIMARY KEY NOT NULL,
	"city_id" integer NOT NULL,
	"weather_data" json NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"update_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "cities_weather" ADD CONSTRAINT "cities_weather_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_active_cities_weather" ON "cities_weather" USING btree ("city_id","created_at") WHERE deleted_at IS NULL;