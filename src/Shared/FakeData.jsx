import { faker } from '@faker-js/faker';

// Function to create a random reusable product listing
function createRandomReuseProductList() {
    return {
        productName: faker.commerce.productName(), // Product name
        category: faker.commerce.department(), // Product category (e.g., Furniture, Electronics)
        condition: faker.helpers.arrayElement(['New', 'Like New', 'Used', 'Refurbished']), // Product condition
        originalPrice: faker.finance.amount(50, 5000, 0), // Original price before reuse
        reusePrice: faker.finance.amount(10, 1000, 0), // Price after reuse
        description: faker.commerce.productDescription(), // Product description
        image: faker.image.imageUrl(640, 480, 'recycling', true), // Image of the product (using a generic placeholder)
        materialType: faker.helpers.arrayElement(['Plastic', 'Metal', 'Wood', 'Paper', 'Textile', 'Glass']), // Material type
        weight: faker.datatype.number({ min: 1, max: 100 }) + ' kg', // Weight of the product in kilograms
        availability: faker.helpers.arrayElement(['For Sale', 'Donation', 'Upcycled']), // Availability type
        location: faker.address.city(), // Location where the product is available
    };
}

// Generate an array of reusable product listings
const reuseProductList = faker.helpers.multiple(createRandomReuseProductList, {
    count: 10, // Number of product listings to generate
});

// Exporting the generated product list
export default {
    reuseProductList,
};
