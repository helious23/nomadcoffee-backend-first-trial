import client from "../../client";

export default {
  Query: {
    seeCategories: async (_, { page }) => {
      const categories = await client.category.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalCategories = await client.category.count();
      return {
        ok: true,
        categories,
        totalPages: Math.ceil(totalCategories / 5),
      };
    },
  },
};
