import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in API - /login", error);
  }
}
