import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {withIronSessionApiRoute} from "iron-session/next";
import { cookieInfo } from "@/constants";


const prisma = new PrismaClient();

export default withIronSessionApiRoute(

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { email, password } = req.body;

  

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
(req.session as any).user = {
name : user.name, 
id: user.id,


}


await req.session.save();


  res.status(200).send("Login successful.");
}, cookieInfo );
