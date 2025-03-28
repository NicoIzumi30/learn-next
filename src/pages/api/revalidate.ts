// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    revalidated : boolean,
    message?: string,
    myToken? : any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.query.token !== process.env.REVALIDATE_TOKEN) {
        res.status(401).json({ revalidated: false, message: 'Invalid token' })
        return;
    }
    if(req.query.data === 'product'){
        try {
            await res.revalidate("/product/static");
            return res.json({ revalidated: true, message: 'Revalidated Success' })
        }catch (err) {
            return res.status(500).send({revalidated: false, message: 'Error revalidating'})
        }
    }else{
        return res.json({ revalidated: false, message: 'Please Select Your Data' })
    }
}
