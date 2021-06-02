import { gql } from "apollo-server-core";

export default gql`
  type SeeCoffeeShopsResult {
    ok: Boolean!
    error: String
    shops: [CoffeeShop]
    totalPages: Int!
  }
  type Query {
    seeCoffeeShops(page: Int!): SeeCoffeeShopsResult
  }
`;
