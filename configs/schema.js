// /configs/schema.js

import { integer, json, pgTable, serial, varchar, timestamp, decimal } from "drizzle-orm/pg-core";

// Waste Listing Table
export const WasteListing = pgTable('waste_listing', {
    id: serial('id').primaryKey(),
    listingTitle: varchar('listing_title').notNull(),
    tagline: varchar('tagline'),
    description: varchar('description').notNull(),
    originalPrice: decimal('original_price'),
    sellingPrice: decimal('selling_price').notNull(),
    priceType: varchar('price_type'),
    category: varchar('category').notNull(),
    subCategory: varchar('sub_category'),
    quantity: integer('quantity'),
    location: varchar('location'),
    coordinates: json('coordinates'),
    features: json('features'),
    createdBy: varchar('created_by').notNull(),
    userName: varchar('user_name').notNull().default('siddarth'),
    userImageUrl: varchar('user_image_url').default('https://www.tubeguruji.com/_next/image?url=%2Flogo2.jpg&w=128&q=75'),
    postedOn: timestamp('posted_on').defaultNow(),
});

// Waste Images Table
export const WasteImages = pgTable('waste_images', {
    id: serial('id').primaryKey(),
    imageUrl: varchar('image_url').notNull(),
    wasteListingId: integer('waste_listing_id').notNull().references(() => WasteListing.id),
});
