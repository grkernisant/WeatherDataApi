CREATE TABLE `cities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`city` varchar(50) NOT NULL,
	`state` varchar(25) NOT NULL,
	`country_code` char(2) NOT NULL,
	`latitude` decimal(6,4) NOT NULL,
	`longitude` decimal(7,4) NOT NULL,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	`active_key` varchar(1) GENERATED ALWAYS AS (CASE WHEN deleted_at IS NULL THEN '1' ELSE NULL END) VIRTUAL,
	CONSTRAINT `cities_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_active_cities_country_state_city` UNIQUE(`country_code`,`state`,`city`,`active_key`)
);
--> statement-breakpoint
CREATE TABLE `cities_weather` (
	`id` varchar(36) NOT NULL,
	`city_id` int NOT NULL,
	`weather_data` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`update_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	`active_key` varchar(1) GENERATED ALWAYS AS (CASE WHEN deleted_at IS NULL THEN '1' ELSE NULL END) VIRTUAL,
	CONSTRAINT `cities_weather_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_active_cities_weather` UNIQUE(`city_id`,`created_at`,`active_key`)
);
--> statement-breakpoint
ALTER TABLE `cities_weather` ADD CONSTRAINT `cities_weather_city_id_cities_id_fk` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE no action ON UPDATE no action;