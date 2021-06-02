import { gql } from "apollo-server-core";

export default gql`
  type SeeCategoryResult {
    ok: Boolean!
    error: String
    shops: [CoffeeShop]
    totalPages: Int
  }
  type Query {
    seeCategory(name: String!, page: Int!): SeeCategoryResult
  }
`;
