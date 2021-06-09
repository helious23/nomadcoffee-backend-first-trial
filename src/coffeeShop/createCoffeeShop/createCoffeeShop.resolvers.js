import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { uploadToS3 } from "../../shared/shred.utils";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, categories, photos },
        { loggedInUser }
      ) => {
        let categoryObj = [];
        let slug = null;
        if (categories) {
          // slug = categories.map((category) =>
          //   category.replaceAll(" ", "-").toLowerCase()
          // );
          categoryObj = processCategories(categories);
        }
        const createdCoffeeShop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
          },
        });

        let fileUrl = null;
        let coffeeShopPhotos = [];
        if (photos) {
          fileUrl = await uploadToS3(photos, loggedInUser.id, "photos");
          coffeeShopPhotos = await client.coffeeShopPhoto.create({
            data: {
              ...(fileUrl && { url: fileUrl }),
              ...(fileUrl && {
                shop: {
                  connect: {
                    id: createdCoffeeShop.id,
                  },
                },
              }),
            },
          });
        }

        return {
          ok: true,
          shop: createdCoffeeShop,
          photos: coffeeShopPhotos,
        };
      }
    ),
  },
};
