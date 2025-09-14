import { NextApiRequest, NextApiResponse } from "next";

let votes: Record<string, number[]> = {}; // Should be shared, see note below

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pollId } = req.query;
  const { option } = req.body;
  if (!votes[pollId as string] || typeof option !== "number") {
    return res.status(400).json({ error: "Invalid vote" });
  }
  votes[pollId as string][option] += 1;
  res.status(200).json({ success: true });
}
