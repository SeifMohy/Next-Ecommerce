import Product from "pages/product/[slug]"

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
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
}

export type Page = {
    name: string;
    href: string;
}
export type Navigation = {
  categories: Category[]
  pages: Page[]
}

//make each type alone and export
//create google sheets response type

export type Products ={
    id: string
    name: string
    slug: string
    imageAlt: string
    categoryId: string
    trending: string
    featured: string
}
export type Categories ={
    id: string
    name: string
}
export type ProductImages ={
    id: string
    productId: string
    imageSrc: string
    imageAlt: string
}
export type ProductVariants ={
    id: string
    productId: string
    color: string
    size: string
    price: string
    avaiableQty: string
}

export type GoogleSheetResponse = {
  Products: Products[] 
  Categories: Categories[]
  ProductImages: ProductImages[]
  ProductVariants: ProductVariants[]

}
