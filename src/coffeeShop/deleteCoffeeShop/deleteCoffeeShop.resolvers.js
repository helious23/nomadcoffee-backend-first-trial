import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(async (_, { id }) => {
      await client.coffeeShop.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
