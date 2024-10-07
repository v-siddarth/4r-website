/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:yRkt7K4TvCSJ@ep-small-boat-a5vkfzx2.us-east-2.aws.neon.tech/4r?sslmode=require',
    }
  };