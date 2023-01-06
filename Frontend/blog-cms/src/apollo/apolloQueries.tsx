import { gql, useQuery } from "@apollo/client";

export const GET_TOP3 = gql`
  query GeTop3 {
    top3 {
      id
    }
  }
`;

export const GET_FAQ = gql`
  query GetFaq {
    faq {
      id
    }
  }
`;

export const GET_CAROUSEL = gql`
  query GetCarousel {
    carousel {
      id
    }
  }
`;

export const GET_NEWEST = gql`
  query GetNewest {
    newest {
      id
    }
  }
`;

export const GET_FOOTER = gql`
  query GeFooter {
    footer {
      id
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
    }
  }
`;

export const GET_ABOUT = gql`
  query getAbout {
    about {
      id
      title
      text
      img
    }
  }
`;

export const GET_CONTACT = gql`
  query GetContact {
    contact {
      id
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory {
    category {
      id
    }
  }
`;
