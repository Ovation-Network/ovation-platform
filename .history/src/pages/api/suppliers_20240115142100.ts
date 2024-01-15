import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '~/utils/api'
export const config = {
  runtime: 'edge',
};
 
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const suppliers = api.supplier.getSupplierContacts.useQuery();

  response.setHeader('Cache-Control', 'public, s-maxage=1');

  return response.status(200).json({ suppliers });
}