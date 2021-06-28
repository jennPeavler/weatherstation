export const schema = gql`
  type Quote {
    text: String!
  }


  type Query {
    getQuote(city: String!): Quote!
  }
`