import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    categories: ({ id }) =>
      client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
    photos: ({ id }) =>
      client.coffeeShopPhoto.findMany({
        where: {
          shop: {
            id,
          },
        },
      }),
  },
  Category: {
    totalShops: async ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
