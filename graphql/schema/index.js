const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Cart{
  product: [Product!]
}

type Address{
  add1: String!
  landmark: String
  street: String
  city: String!
  state: String!
  pincode: Int!
  phoneNo:String!
}

input AddressInput{
  add1: String!
  landmark: String
  street: String
  city: String!
  state: String!
  pincode: Int!
  phoneNo:String!
}

type OrdersProductList{
  product: Product!
}

input  OrdersProductListInput{
  productID: String!
}

input UpdateOrder{
  orderID: String!
}


type Orders{
  _id: ID!
  user: User!
  name: Name!
  address:  Address!
  orderProducts: [OrdersProductList!]!
  orderStatus: Boolean!
  createdAt: String!
  updatedAt: String!
}

input OrderInput{
  userId: String!
  name: NameInput!
  address: AddressInput!
}


type SearchProducts{
  _id: ID!
  product: Product!
  user: User!
  createdAt: String!
  updatedAt: String!
}

input SearchProductInput{
  productID: String!
  userID: String!
}

type UserCart{
  product: Product!
}


type Price{
  originalPrice: Float!
  discountPrice: Float!
}

input PriceInput{
  originalPrice: Float!
  discountPrice: Float!
}

type Review{
  rating: Int!
  comment: String!
  user: User!
}

input ReviewInput{
  productID: String!
  rating: Int!
  comment: String!
  userID: String!
}

type Product{
  _id: ID!
  name: String!
  description: String!
  image: String!
  price: Price!
  available: Int!
  weight: Float!
  category: String!
  company: String!
  reviews: [Review!]
  createdAt: String!
  updatedAt: String!
}

input ProductInput{
  productId: String
  name: String!
  description: String!
  image: String!
  price: PriceInput!
  available: Int!
  weight: Float!
  category: String!
  company: String!
}

type Name{
  firstName: String!
  lastName: String!
}

input NameInput{
  firstName: String!
  lastName: String!
}

type User{
  _id: ID!
  name: Name!
  email: String!
  password: String!
  searchproducts: [SearchProducts!]
  orderHistory: [Orders!]!
  cart: [UserCart!]
  createdAt: String!
  updatedAt: String!
}

input UserInput{
  name: NameInput!
  email: String!
  password: String!
}

type AuthData{
  userID: ID!
  token:  String!
  tokenExpiration: Int!
}

type RootQuery{
users:[User!]!
userById(userId: String!): User!
products:[Product!]!
productByID(productId: String!): Product!
searchproducts: [SearchProducts!]!
orders: [Orders!]!
ship:[Orders!]!
orderById(orderId:String!): Orders!
productByCollection(collectionName: String!): [Product]
productByName(productName:String!,collectionName:String!):[Product]

}

type RootMutation{
  addReview(reviewInput: ReviewInput): Review,
  addSearchProduct(searchProductInput: SearchProductInput): SearchProducts,
  addToCart(productID: String , userID: String): Cart,

  createUser(userInput:UserInput):User,
  createProduct(productInput: ProductInput): Product,
  createOrder(orderInput: OrderInput): Orders,

  removeFromCart(productID: String! , userID: String!): UserCart,
  removeProduct(productId: String!):Product

  shipOrder(orderId:String!): Orders,

  updateOrder(updateOrderInput: UpdateOrder):Orders,
  updateProduct(productInput: ProductInput): Product

  login(email: String! , password: String!): AuthData

}

schema{
  query: RootQuery,
  mutation:RootMutation
}
`);

// type Reviews{
//   comment: String
//   user: User
// }

// input ReviewsInput{
//   comment: String
//   user: User
// }
