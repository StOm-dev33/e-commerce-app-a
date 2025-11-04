import { mutation } from './_generated/server';

export const seed = mutation({
  args: {},
  handler: async (ctx: any) => {
    const products = [
      {
        name: 'XX99 Mark II Headphones',
        description: 'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.',
        price: 2999,
        category: 'headphones',
        features: [
          'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening.',
          'Featuring a Bluetooth wireless technology that delivers exceptional sound quality, these headphones are perfect for music lovers who want to experience their music without any wires.',
        ],
        images: [
          '/images/product-xx99-mark-two-headphones/image-1.jpg',
          '/images/product-xx99-mark-two-headphones/image-2.jpg',
          '/images/product-xx99-mark-two-headphones/image-3.jpg',
        ],
        inBox: [
          { item: 'Headphone Unit', quantity: 1 },
          { item: 'Replacement Earcups', quantity: 2 },
          { item: '3.5mm Audio Cable', quantity: 1 },
          { item: 'Travel Bag', quantity: 1 },
        ],
      },
      {
        name: 'ZX9 Speaker',
  description: "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity.",
        price: 4500,
        category: 'speakers',
        features: [
          'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs.',
          "Discover clear, more natural sounding highs than the competition with ZX9's signature planar diaphragm tweeter.",
        ],
        images: [
          '/images/product-zx9-speaker/image-1.jpg',
          '/images/product-zx9-speaker/image-2.jpg',
          '/images/product-zx9-speaker/image-3.jpg',
        ],
        inBox: [
          { item: 'Speaker Unit', quantity: 1 },
          { item: 'Speaker Cloth Panel', quantity: 2 },
          { item: 'User Manual', quantity: 1 },
          { item: '3.5mm Audio Cable', quantity: 1 },
          { item: '10m Optical Cable', quantity: 1 },
        ],
      },
      {
        name: 'YX1 Wireless Earphones',
        description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones.',
        price: 599,
        category: 'earphones',
        features: [
          'Experience unrivalled stereo sound thanks to innovative acoustic technology.',
          'These earphones have been created from durable, high-quality materials tough enough to take anywhere.',
        ],
        images: [
          '/images/product-yx1-earphones/image-1.jpg',
          '/images/product-yx1-earphones/image-2.jpg',
          '/images/product-yx1-earphones/image-3.jpg',
        ],
        inBox: [
          { item: 'Earphone Unit', quantity: 2 },
          { item: 'Multi-size Earplugs', quantity: 6 },
          { item: 'User Manual', quantity: 1 },
          { item: 'USB-C Charging Cable', quantity: 1 },
          { item: 'Travel Pouch', quantity: 1 },
        ],
      },
    ];

    for (const product of products) {
      await ctx.db.insert('products', product);
    }

    return 'Products seeded successfully';
  },
});