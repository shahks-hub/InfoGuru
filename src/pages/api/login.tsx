import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).send("Not Found");
    return;
  }

  const { email, password } = req.body;

  console.log(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(400).send("User not found.");
    return;
  }

  if (user.password !== password) {
    res.status(400).send("Incorrect password.");
    return;
  }

  res.status(200).send("Login successful.");
}
