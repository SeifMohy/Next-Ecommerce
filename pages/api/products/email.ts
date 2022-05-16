import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const formData = require('form-data')
  const Mailgun = require('mailgun.js')
  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({
    username: 'api',
    key: '13b0a340a7d366d6c0472fd2673004f5-5e7fba0f-39476433',
  })

  mg.messages
    .create("sandboxfb7e09289b35445796798c33996e8808.mailgun.org", {
      from: 'Mailgun Sandbox <postmaster@sandboxfb7e09289b35445796798c33996e8808.mailgun.org>',
      to: ['accounts@tawwr.com'],
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
    })
    .then((msg: any) => console.log(msg)) // logs response data
    .catch((err: any) => console.log(err)) // logs any error`;

  res.status(200).json({ name: 'John Doe' })
}
