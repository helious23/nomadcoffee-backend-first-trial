import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver((_, { id }) =>
      client.coffeeShop.delete({
        where: {
          id,
        },
      })
    ),
  },
};
