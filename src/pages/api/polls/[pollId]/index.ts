import { NextApiRequest, NextApiResponse } from "next";

let polls: any[] = []; // Should be shared, see note below

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pollId } = req.query;
  const poll = polls.find((p) => p.id === pollId);
  if (!poll) return res.status(404).json({ error: "Poll not found" });
  res.status(200).json(poll);
}
