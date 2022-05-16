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
    key: process.env.MAILGUN_KEY ,
  })

  mg.messages
    .create(!process.env.MAILGUN_DOMAIN, {
      from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to: ['accounts@tawwr.com'],
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
    })
    .then((msg: any) => console.log(msg)) // logs response data
    .catch((err: any) => console.log(err)) // logs any error`;

  res.status(200).json({ name: 'John Doe' })
}
