import { gql, useQuery } from "@apollo/client";

export const GET_TOP3 = gql`
  query GeTop3 {
    top3 {
    }
  }
`;

export const GET_FAQ = gql`
  query GetFaq {
    faq {
    }
  }
`;

export const GET_CAROUSEL = gql`
  query GetCarousel {
    carousel {
    }
  }
`;

export const GET_NEWEST = gql`
  query GetNewest {
    newest {
    }
  }
`;

export const GET_FOOTER = gql`
  query GeFooter {
   footer {
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
    }
  }
`;

export const GET_ABOUT = gql`
  query GetAbout {
    about {
    }
  }
`;

export const GET_CONTACT = gql`
  query GetContact {
    contact {
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory {
    category {
    }
  }
`;
