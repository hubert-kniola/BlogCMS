import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GraphQlURL } from "../settings";

const apolloClient = new ApolloClient({
  uri: GraphQlURL,
  cache: new InMemoryCache(),

  headers: {
    credentials: "same-origin",
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJqdGkiOiJmMjg3OWQwMy0xNzUxLTQ5NWYtODlhNy0wYTgzZDZkZjY5ZjgiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1laWQiOiI2MzUwNDg1ZWI5MDI4OWQzYjAzYWFlMmUiLCJuYmYiOjE2NzMwMTE3OTUsImV4cCI6MTY3MzA1NTA0MCwiaWF0IjoxNjczMDExNzk1fQ.tTcvVmTvQbYvnHR2G379z5JgU0BxOMqZYokFZQCq878`,
  },
});

export default apolloClient;
