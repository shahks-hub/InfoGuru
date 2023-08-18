import { NextApiRequest, NextApiResponse } from "next";
import {withIronSessionApiRoute} from "iron-session/next";
import { cookieInfo } from "@/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default withIronSessionApiRoute(

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).send("Not Found");
    return;
  }

 

  const { filename, content } = JSON.parse(req.body);
  console.log(filename);
  
  
  try {
   

    await prisma.file.create({
      
       data: {
        filename,
        content,
        ownerId: req.session.user.id,
      },
    });


  
    res.status(200).send({ message: "File uploaded successfully", filename })
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
}



, cookieInfo
)
