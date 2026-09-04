CREATE TABLE `rsvps` (
	`id` text PRIMARY KEY NOT NULL,
	`names` text NOT NULL,
	`phone` text,
	`attendance` integer NOT NULL,
	`message` text,
	`created_at` text NOT NULL
);
