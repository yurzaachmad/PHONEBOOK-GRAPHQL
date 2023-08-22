const { buildSchema } = require("graphql");
const fs = require("fs");
const phoneSchema = require("../models/Phonebook");

const schema = buildSchema(`
scalar Upload

input ContactInput {
    name: String
    phone: String
}

input AvatarInput {
  avatar: String
}

type Contact {
    _id: ID!
    name: String
    phone: String
    avatar: String
}

type Query {
    getContacts: [Contact]
}

type Mutation {
    createContact(input: ContactInput): Contact
    updateContact(id: ID!, input: ContactInput): Contact
    updateAvatar(id: ID!, input: AvatarInput): Contact
    deleteContact(id: ID!): Contact
}
`);

class Contact {
  constructor(_id, { name, phone, avatar }) {
    this._id = _id;
    this.name = name;
    this.phone = phone;
    this.avatar = avatar;
  }
}

const solution = {
  getContacts: () => phoneSchema.find(),
  createContact: ({ input }) => phoneSchema.create(input),
  updateContact: ({ id, input }) =>
    phoneSchema.findByIdAndUpdate(id, input, { new: true }),
  deleteContact: ({ id }) => phoneSchema.findByIdAndRemove(id),
  updateAvatar: ({ id, input }) =>
    phoneSchema.findByIdAndUpdate(id, input, { new: true }),
};

module.exports = { schema, solution };

/*

query getContacts{
  getContacts {
    _id
    name
    phone
    avatar
  }
}

mutation createContact($name: String, $phone: String){
  createContact(input: {name: $name, phone: $phone}){
    _id
    name
    phone
    avatar
  }
}

mutation updateContact($id: ID!, $name: String, $phone: String){
  updateContact(id: $id, input: {name: $name, phone: $phone}){
    _id
    name
    phone
    avatar
  }
}

mutation updateAvatar($id: ID!, $avatar: String!){
  updateAvatar(id: $id, input: {avatar: $avatar}){
    _id
    name
    phone
    avatar
  }
}

mutation deleteContact($id: ID!){
  deleteContact(id: $id){
       _id
    name
    phone
    avatar
  }
}

*/
