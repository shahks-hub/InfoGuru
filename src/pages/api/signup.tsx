import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== 'POST') {
        res.status(404).send('Not Found')
    }
    const { name, email, password, confirmPass } = req.body;

    

   const user = await prisma.user.findUnique({
    where: {
        email
    }
   })

   if(user){
    res.status(400).json({message: "User exists."})
    return
   }

   if(password !== confirmPass) {
    res.status(400).json({message: "Passwords do not match."})
    return
   }

   await prisma.user.create({
    data: {
        name,
        email,
        password,
    }
   })

   res.status(200).json({ message: "User created." });


  }