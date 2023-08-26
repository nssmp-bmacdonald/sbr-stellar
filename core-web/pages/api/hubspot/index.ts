import { NextApiRequest, NextApiResponse } from 'next';
import { updateHSContact } from '../../../lib/hubspot';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, data } = req.body;
  const value = await updateHSContact(id, data);

  if (value) {
    return res.status(200).send('Updated hubspot account');
  } else {
    return res.status(500).send('Unable to update hubspot account');
  }
}
