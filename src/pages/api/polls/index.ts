import { NextApiRequest, NextApiResponse } from "next";

let polls: any[] = [];
let votes: Record<string, number[]> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { question, options } = req.body;
    const id = String(polls.length + 1);
    polls.push({ id, question, options });
    votes[id] = Array(options.length).fill(0);
    res.status(201).json({ id });
  } else if (req.method === "GET") {
    res.status(200).json(polls);
  } else {
    res.status(405).end();
  }
}
