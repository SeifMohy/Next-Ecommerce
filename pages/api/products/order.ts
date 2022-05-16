// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import { Order } from 'types'
import { google } from 'googleapis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as Order

  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
    )
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })
    const sheets = google.sheets({
      auth,
      version: 'v4',
    })
    const OrderDetails = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_KEY,
      range: 'OrderDetails!A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            body.orderId,
            body.address,
            body.apartment,
            body.cardName,
            body.cardNumber,
            body.city,
            body.country,
            body.cvc,
            body.email,
            body.expiration,
            body.firstName,
            body.lastName,
            body.paymentMethod,
            body.phone,
            body.postalCode,
            body.region,
          ],
        ],
      },
    })
    const OrderItems = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_KEY,
      range: 'OrderItems!A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: 
            // [body.Items[0].id, body.Items[0].quantity]
            body.Items.map((item) => {
              return [body.orderId, item.id, item.quantity]
            })
      },
    })
    return res
      .status(200)
      .json({ OrderItems: OrderItems.data, OrderDetails: OrderDetails.data })
  } catch (error) {}
}
