import { NextApiRequest, NextApiResponse } from 'next';

let votes: Record<string, number[]> = {}; // Should be shared, see note below

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pollId } = req.query;
  if (!votes[pollId as string]) {
    return res.status(404).json({ error: 'Poll not found' });
  }
  res.status(200).json({ votes: votes[pollId as string] });
}
