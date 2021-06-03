import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shred.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          password: newPassword,
          location,
          avatarUrl,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let avatar = null;
        if (avatarUrl) {
          avatar = await uploadToS3(avatar, loggedInUser.id, "avatars");
        }

        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            name,
            username,
            email,
            location,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatar && { avatarUrl: avatar }),
            githubUsername,
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Can't update profile",
          };
        }
      }
    ),
  },
};
