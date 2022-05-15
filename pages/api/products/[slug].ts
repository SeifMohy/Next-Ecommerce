// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import { GoogleSheetResponse } from 'types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )

  extractSheets(
    {
      // your google spreadsheet key
      spreadsheetKey: process.env.SHEET_KEY,
      // your google oauth2 credentials or API_KEY
      credentials,
      // optional: names of the sheets you want to extract
      sheetsToExtract: [
        'Products',
        'Categories',
        'ProductImages',
        'ProductVariants',
      ],
    },
    function (err: any, data: GoogleSheetResponse) {
      console.log('data', data)
      const product = data.Products.find((product) => {
        return product.slug == slug
        console.log('slug', slug)
        console.log('prod', product.slug)
      })

      console.log(product)
      if (!product) {
        return res.status(404).json('Product does not exist')
      }

      const images = data.ProductImages.filter(
        (image) => image.productId === product.id
      )
      const variants = data.ProductVariants.filter(
        (variant) => variant.productId === product.id
      )
      const category = data.Categories.find(
        (category) => category.id === product.categoryId
      )

      const newProduct = {
        ...product,
        images,
        category,
        variants,
      }

      res.status(200).json({ product: newProduct })
    }
  )
}
