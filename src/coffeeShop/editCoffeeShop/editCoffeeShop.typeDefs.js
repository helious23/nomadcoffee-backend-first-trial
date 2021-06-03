import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editCoffeeShop(
      id: Int!
      latitude: String
      longitude: String
      categories: [String]
      photos: Upload
    ): MutationResponse!
  }
`;
