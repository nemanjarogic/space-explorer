const { gql } = require("apollo-server");

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    "Query for a field that takes an argument"
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  "Defines queries that clients can execute against the data graph in order to fetch data"
  type Query {
    "Returns an array of all upcoming launches"
    launches(
      "The number of results to show. Must be >= 1. Default = 20"
      pageSize: Int

      "If you add a cursor here, it will only return results _after_ this cursor"
      after: String
    ): LaunchConnection!

    "Returns a single launch that corresponds to the id argument provided to the query"
    launch(id: ID!): Launch

    "Returns details for the User that's currently logged in"
    me: User
  }

  "Enables clients to modify data"
  type Mutation {
    "Enables a logged-in user to book a trip on one or more launches"
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    "Enables a logged-in user to cancel a previously booked trip"
    cancelTrip(launchId: ID!): TripUpdateResponse!

    "Enables a user to log in by providing their email address."
    login(email: String): User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    "Indicates the current position in the data set"
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
`;

module.exports = typeDefs;
