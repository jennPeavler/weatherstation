export const schema = gql`
  type Weather {
    city: String!
    conditions: [String!]
    temp: Int!,
		humidity: Int!,
		descriptions: [String!]
  }


  type Query {
    getWeather(city: String!): Weather!
  }
`