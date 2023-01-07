import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GraphQlURL } from "../settings";

const apolloClient = new ApolloClient({
  uri: GraphQlURL,
  cache: new InMemoryCache(),

  headers: {
    credentials: "same-origin",
    //temporary solution
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcm9udGVuZFVzZXIiLCJqdGkiOiJiNWE0ZWNjYS00MGVkLTRkNGYtYjJiYy1lYjY2MmRkYmEwNjMiLCJlbWFpbCI6InVzZXJAZnJvbnRlbmQuY29tIiwibmFtZWlkIjoiNjNiOTZhMTc0YTdhNDIxZDY2MjE4NzUyIiwibmJmIjoxNjczMDk2MDA2LCJleHAiOjE2NzMxMzkyNTEsImlhdCI6MTY3MzA5NjAwNn0.fyqfAnEgPjrLERTD3Mg8hOITD98N3kurKzqcs4k1SZg`,
  },
});

export default apolloClient;
