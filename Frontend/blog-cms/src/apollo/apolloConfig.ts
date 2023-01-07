import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GraphQlURL } from "../settings";

const apolloClient = new ApolloClient({
  uri: GraphQlURL,
  cache: new InMemoryCache(),

  headers: {
    credentials: "same-origin",
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJqdGkiOiIzZWYxN2E2NS04OTEwLTQ5NTYtYjFhZS00ZTdiNTE3MWRiODEiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1laWQiOiI2MzUwNDg1ZWI5MDI4OWQzYjAzYWFlMmUiLCJuYmYiOjE2NzMwOTIzNjUsImV4cCI6MTY3MzEzNTYxMCwiaWF0IjoxNjczMDkyMzY1fQ.18l9tzOPyFtiGXyans3P5Z2uaqDO0EIsVOYWC0D0rvY`,
  },
});

export default apolloClient;
