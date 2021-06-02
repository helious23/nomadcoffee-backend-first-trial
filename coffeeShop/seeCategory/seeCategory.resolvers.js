import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { name, page }) => {
      const shops = await client.category
        .findUnique({
          where: {
            name,
          },
        })
        .shops({
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalShops = await client.coffeeShop.count({
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
      });
      return {
        ok: true,
        shops,
        totalPages: Math.ceil(totalShops / 5),
      };
    },
  },
};
