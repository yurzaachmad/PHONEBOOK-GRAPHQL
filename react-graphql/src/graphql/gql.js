import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query getContacts {
    getContacts {
      _id
      name
      phone
      avatar
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation createContact($name: String, $phone: String) {
    createContact(input: { name: $name, phone: $phone }) {
      _id
      name
      phone
      avatar
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: ID!, $name: String, $phone: String) {
    updateContact(id: $id, input: { name: $name, phone: $phone }) {
      _id
      name
      phone
      avatar
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($id: ID!, $avatar: String!) {
    updateAvatar(id: $id, input: { avatar: $avatar }) {
      _id
      name
      phone
      avatar
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      _id
      name
      phone
      avatar
    }
  }
`;
