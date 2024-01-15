import type { NextApiRequest, NextApiResponse } from 'next';
 
export const config = {
  runtime: 'edge',
};
 
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.setHeader('Cache-Control', 'public, s-maxage=1');
 
  return response.status(200).json({ name: 'John Doe' });
}