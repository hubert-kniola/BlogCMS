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

export const ADD_CAROUSEL_ELEMENT = gql`
  mutation AddCarousel(
    $title: String!
    $content: String!
    $publicationDate: DateTime!
    $imgName: String!
    $active: Boolean!
    $url: String!
  ) {
    addCarouselElement(
      carousel: {
        title: $title
        content: $content
        publicationDate: $publicationDate
        imgName: $imgName
        active: $active
        url: $url
      }
    ) {
      id
      title
      content
      publicationDate
      imgName
      active
    }
  }
`;

export const UPDATE_CAROUSEL_ELEMENT = gql`
  mutation UpdateCarousel(
    $id: String!
    $title: String!
    $content: String!
    $publicationDate: DateTime!
    $imgName: String!
    $active: Boolean!
    $url: String!
  ) {
    updateCarousel(
      carousel: {
        id: $id
        title: $title
        content: $content
        publicationDate: $publicationDate
        imgName: $imgName
        active: $active
        url: $url
      }
    ) {
      title
      content
      publicationDate
      imgName
      active
      url
    }
  }
`;

export const REMOVE_CAROUSEL_ELEMENT = gql`
  mutation RemoveCarousel($id: String!) {
    removeCarusel(id: $id)
  }
`;

export const UPDATE_ABOUT = gql`
  mutation UpdateAbout(
    $id: String!
    $title: String!
    $text: String!
    $imgName: String!
  ) {
    updateAbout(
      about: { id: $id, title: $title, text: $text, imgName: $imgName }
    ) {
      id
      title
      text
      imgName
    }
  }
`;

export const ADD_FAQ_ELEMENT = gql`
  mutation AddFaq($question: String!, $answer: String!) {
    createFaq(faq: { question: $question, answer: $answer }) {
      id
      question
      answer
    }
  }
`;

export const UPDATE_FAQ_ELEMENT = gql`
  mutation UpdateFaq($id: String!, $question: String!, $answer: String!) {
    updateFaq(faq: { id: $id, question: $question, answer: $answer }) {
      id
      question
      answer
    }
  }
`;

export const REMOVE_FAQ_ELEMENT = gql`
  mutation removeFaq($id: String!) {
    removeFaq(id: $id)
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContactInfo(
    $id: String!
    $title: String!
    $content: String!
    $textBoxes: [TextBoxInput!]!
  ) {
    updateContactInfo(
      contactInfo: {
        id: $id
        title: $title
        content: $content
        textBoxes: $textBoxes
      }
    ) {
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
