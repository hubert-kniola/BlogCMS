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
  query GetTop3 {
    topThreePost {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      isTopPost
      categories {
        id
        title
        path
      }
      categoryTree {
        mainCategory {
          id
          title
          path
        }
        subCategory {
          id
          title
          path
        }
        tags {
          id
          title
          path
        }
      }
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
      url
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

export const GET_LAST_POST_TITLE_CONTENT = gql`
  query getLastPostTitleContent {
    lastPostTitleContent {
      id
      name
      value
    }
  }
`;

export const GET_FOOTER_CONTENT = gql`
  query getFootrtContent {
    footerContent {
      id
      name
      value
    }
  }
`;

export const GET_POSTS = gql`
  query GetAllPostsWithCategoryTree {
    posts {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      categories {
        id
        title
        path
        parentId
      }
      categoryTree {
        mainCategory {
          id
          title
          path
          parentId
        }
        subCategory {
          id
          title
          path
          parentId
        }
        tags {
          id
          title
          path
          parentId
        }
      }
    }
  }
`;

export const GET_POSTS_BY_ID = gql`
  query GetPostById($id: String!) {
    postById(id: $id) {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      isTopPost
      categories {
        id
        title
        path
      }
      categoryTree {
        mainCategory {
          id
          title
          path
        }
        subCategory {
          id
          title
          path
        }
        tags {
          id
          title
          path
        }
      }
    }
  }
`;

export const GET_SIMILAR_POST = gql`
  query GetSimilarPost($postId: String!) {
    similarPost(postId: $postId) {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      categories {
        id
        title
        path
      }
      categoryTree {
        mainCategory {
          id
          title
          path
        }
        subCategory {
          id
          title
          path
        }
        tags {
          id
          title
          path
        }
      }
    }
  }
`;

export const GET_POST_BY_PATH = gql`
  query GetPostByPath($path: String!) {
    postByPath(path: $path) {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      isTopPost
      categories {
        id
        title
        path
      }
    }
  }
`;

export const GET_FIRST_POST_PREMIER = gql`
  query GetFirstPostPremier {
    firstPostPremier {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      isTopPost
      categories {
        id
        title
        path
      }
      categoryTree {
        mainCategory {
          id
          title
          path
        }
        subCategory {
          id
          title
          path
        }
        tags {
          id
          title
          path
        }
      }
    }
  }
`;

export const GET_ALL_ACTIVE_POSTS = gql`
  query GetAllActivePosts {
    activePosts {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      categories {
        id
        title
        path
        parentId
      }
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

export const GET_TAGS = gql`
  query GetAllTags($categoryId: String!) {
    allTags(categoryId: $categoryId) {
      id
      title
      path
      objectType
      isConst
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

export const REMOVE_CONTACT_FORM_ELEMENT = gql`
  mutation RemoveContactForm($id: String!) {
    removeContactForm(id: $id)
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

export const INSERT_POST = gql`
  mutation InsertPost(
    $title: String!
    $content: String!
    $snippet: String!
    $timeToReadInMs: String!
    $primaryImgName: String!
    $contentImgName: [String!]!
    $publicationDate: DateTime
    $categories: [String!]!
  ) {
    createPost(
      post: {
        title: $title
        content: $content
        snippet: $snippet
        timeToReadInMs: $timeToReadInMs
        primaryImgName: $primaryImgName
        contentImgName: $contentImgName
        publicationDate: $publicationDate
        categories: $categories
      }
    ) {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      categories {
        id
        title
        path
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: String!
    $title: String!
    $content: String!
    $snippet: String!
    $timeToReadInMs: String!
    $primaryImgName: String!
    $contentImgName: [String!]!
    $publicationDate: DateTime
    $categories: [String!]!
  ) {
    updatePost(
      post: {
        id: $id
        title: $title
        content: $content
        snippet: $snippet
        timeToReadInMs: $timeToReadInMs
        primaryImgName: $primaryImgName
        contentImgName: $contentImgName
        publicationDate: $publicationDate
        categories: $categories
      }
    ) {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      categories {
        id
        title
        path
      }
    }
  }
`;

/*
 {
  "top": [
    "63befdda5f1761530cc5c5e6",
    "63befea55f1761530cc5c5e9",
    "63befe4c5f1761530cc5c5e8"]
}

Funkcja przetworzy maksymalnie 3 posty. Przesyłając ich 10, weźmie pierwsze 3. 
Musi być co najmniej jeden. Podajemy ID postów. Zawsze wysyłamy WSZYSTKIE!
*/

export const UPDATE_TOP_THREE_POST = gql`
  mutation UpdateTop($top: [String!]!) {
    updateTopPost(top: $top) {
      id
      title
      content
      snippet
      timeToReadInMs
      primaryImgName
      contentImgName
      publicationDate
      isTopPost
      categories {
        id
        title
        path
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation RemovePost($id: String!) {
    removePost(id: $id)
  }
`;

export const UPDATE_FOOTER_CONTENT = gql`
  mutation updateFooterContent($contentList: [ContentInput!]!) {
    updateFooterContent(contentList: $contentList) {
      id
      name
      value
    }
  }
`;

export const UPDATE_LAST_POST_TITLE_CONTENT = gql`
  mutation updateLastPostTieleContent($content: ContentInput!) {
    updateLastPostTieleContent(content: $content) {
      id
      name
      value
    }
  }
`;
