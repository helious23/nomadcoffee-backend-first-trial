import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!

    # Edit Profile
    location: String
    avatarUrl: String
    githubUsername: String

    # Follow
    following(lastId: Int): [User]
    followers(lastId: Int): [User]

    # Computed field
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!

    createdAt: String!
    updatedAt: String!
  }
`;
