import { gql } from "@apollo/client";

export const GET_CATEGORY_OBJECT = gql`
  query GetMenu {
    category(where: { and: [{ parentId: { eq: null } }] }) {
      id
      title
      path
      objectType
      subCategory(where: { objectType: { eq: CATEGORY } }) {
        id
        title
        path
        objectType
        subCategory(where: { objectType: { eq: CATEGORY } }) {
          id
          title
          path
          objectType
          subCategory(where: { objectType: { eq: CATEGORY } }) {
            id
            title
            path
            objectType
          }
        }
      }
    }
  }
`;

export const GET_ROUTE = gql`
  query GetRoute {
    category {
      id
      title
      path
      objectType
    }
  }
`;

export const GET_TOP3 = gql`
  query GeTop3 {
    top3 {
      id
    }
  }
`;

export const GET_FAQ = gql`
  query GetAllFaq {
    allFaq {
      id
      question
      answer
    }
  }
`;

export const GET_CAROUSEL = gql`
  query GetCarousels {
    carousels {
      id
      title
      content
      publicationDate
      imgName
      active
    }
  }
`;

export const GET_ACTIVE_CAROUSEL = gql`
  query GetActiveCarousels {
    activeCarousels {
      id
      title
      content
      publicationDate
      imgName
      active
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
      imgName
    }
  }
`;

export const GET_CONTACT_INFO = gql`
  query GetContactInfo {
    contactInfo {
      id
      title
      content
      textBoxes {
        fieldName
        content
      }
    }
  }
`;

export const GET_CONTACT_FORMS = gql`
  query GetContactForms {
    contactForms {
      id
      name
      email
      content
    }
  }
`;

export const GET_CONTACT = gql`
  query GetContact {
    posts {
      id
    }
  }
`;

/* MUTATION */

export const POST_CONTACT_FORM = gql`
  mutation CreateContactForm(
    $name: String!
    $email: String!
    $content: String!
  ) {
    createContactForm(
      contactForm: { name: $name, email: $email, content: $content }
    ) {
      id
      name
      email
      content
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($title: String!, $path: String!, $parentId: String!) {
    createCategory(
      category: { title: $title, path: $path, parentId: $parentId }
    ) {
      id
      title
      path
      objectType
      subCategory {
        id
        title
        path
        objectType
      }
    }
  }
`;

export const REMOVE_CATEGORY_WITH_SUBCATEGORY = gql`
  mutation RemoveCategory($id: String!) {
    removeCategory(id: $id)
  }
`;
