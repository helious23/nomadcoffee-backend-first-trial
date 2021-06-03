import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      const shops = await client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalShops = await client.coffeeShop.count();
      return {
        ok: true,
        shops,
        totalPages: Math.ceil(totalShops / 5),
      };
    },
  },
};
