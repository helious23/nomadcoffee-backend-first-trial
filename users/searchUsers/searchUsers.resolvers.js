import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const ok = await client.user.count({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      if (!Boolean(ok)) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalUsers = await client.user.count({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      return {
        ok: true,
        users,
        totalPages: Math.ceil(totalUsers / 5),
      };
    },
  },
};
