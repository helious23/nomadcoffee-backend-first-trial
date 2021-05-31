import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

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
          const { filename, createReadStream } = await avatarUrl;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatar = `http://localhost:4000/static/${newFilename}`;
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
