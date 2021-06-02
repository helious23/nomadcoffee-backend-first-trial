import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { uploadToS3, delPhotoS3 } from "../../shared/shred.utils";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, latitude, longitude, categories, photos },
        { loggedInUser }
      ) => {
        const oldCafe = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
            photos: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!oldCafe) {
          return {
            ok: false,
            error: "CoffeeShop not found.",
          };
        }
        let fileUrl = null;
        if (photos) {
          fileUrl = await uploadToS3(photos, loggedInUser.id, "photos");
        }

        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            latitude,
            longitude,
            ...(categories && {
              categories: {
                disconnect: oldCafe.categories,
                connectOrCreate: processCategories(categories),
              },
            }),
            ...(photos && {
              photos: {
                deleteMany: {},
              },
            }),
          },
        });

        if (photos) {
          await client.coffeeShopPhoto.create({
            data: {
              ...(fileUrl && { url: fileUrl }),
              ...(fileUrl && {
                shop: {
                  connect: {
                    id,
                  },
                },
              }),
            },
          });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};
