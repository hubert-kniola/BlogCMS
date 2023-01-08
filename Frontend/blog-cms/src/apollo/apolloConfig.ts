import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GraphQlURL } from "../settings";

const apolloClient = new ApolloClient({
  uri: GraphQlURL,
  cache: new InMemoryCache(),

  headers: {
    credentials: "same-origin",
    //temporary solution
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcm9udGVuZFVzZXIiLCJqdGkiOiJhNzVkMjZmNC02ZDU3LTQ3OTEtYTA1OC00NzJiNjE0ODg2ZWYiLCJlbWFpbCI6InVzZXJAZnJvbnRlbmQuY29tIiwibmFtZWlkIjoiNjNiOTZhMTc0YTdhNDIxZDY2MjE4NzUyIiwibmJmIjoxNjczMTgyMzcwLCJleHAiOjE5ODg4MDE1NzAsImlhdCI6MTY3MzE4MjM3MH0.TcqD2zjfxTRFgJA1NieA2kgUzHgVU0k-R7dAz9oSEgo`,
  },
});

export default apolloClient;
