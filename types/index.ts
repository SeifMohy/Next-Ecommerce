import Product from 'pages/product/[slug]'

export interface Product {
  products: any
  id: number
  name: string
  slug: string
  color: string
  price: string
  availableQty: number
  imageSrc: string
  imageAlt: string
}

export interface CartItem extends Product {
  quantity: number
}

export type Category = {
  name: string
  featured: Product[]
}

export type Page = {
  name: string
  href: string
}
export type Navigation = {
  categories: Category[]
  pages: Page[]
}

//make each type alone and export
//create google sheets response type

export type AppStateType = {
  products: Products[]
  categories: Categories[]
  cart: Cart[]
  order: Order
}

export type Products = {
  id: string
  name: string
  slug: string
  imageAlt: string
  categoryId: string
  trending: string
  featured: string
}
export interface Cart extends Products {
  images: Images[]
  variants: ProductVariants[]
  app: any
  quantity: number
}
export type Dropdown = {
  value: string
  id: string
}
export type Categories = {
  id: string
  name: string
}
export type ProductImages = {
  id: string
  productId: string
  imageSrc: string
  imageAlt: string
}
export type ProductVariants = {
  id: string
  productId: string
  color: string
  size: string
  price: string
  avaiableQty: string
}

export type Images = {
  id: string
  productId: string
  imageSrc: string
  imageAlt: string
}

export type Order = {
  Items: Cart[]
  address: string
  apartment: string
  cardName: string
  cardNumber: string
  city: string
  country: string
  cvc: string
  email: string
  expiration: string
  firstName: string
  lastName: string
  paymentMethod: string
  phone: string
  postalCode: string
  region: string
}
export type GoogleSheetResponse = {
  Products: Products[]
  Categories: Categories[]
  ProductImages: ProductImages[]
  ProductVariants: ProductVariants[]
}
