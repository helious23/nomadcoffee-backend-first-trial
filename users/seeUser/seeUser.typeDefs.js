import { gql } from "apollo-server-core";

export default gql`
  type SeeUserResult {
    ok: Boolean!
    error: String
    following: [User]
    followers: [User]
  }
  type Query {
    seeUser(username: String!, lastId: Int): SeeUserResult!
  }
`;
