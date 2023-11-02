import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const forwarded = req.headers['x-forwarded-for']
  let ip: string = ''

  if (typeof forwarded === 'string') {
    ip = forwarded.split(',')[0]
  } else if (Array.isArray(forwarded)) {
    ip = forwarded[0]
  } else {
    ip = req.connection.remoteAddress || ''
  }

  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7)
  }

  res.status(200).json({ ip })
}
