import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      password: String
      location: String
      avatarUrl: Upload
      githubUsername: String
    ): MutationResponse!
  }
`;
