import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});

const openai = new OpenAIApi(config);

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { userQuestion, fileId } = req.body;

  // Retrieve file content using fileId
  const file = await prisma.file.findUnique({
    where: {
      id: fileId
    }
  });

  if (!file) {
    res.status(404).send("File not found");
    return;
  }
   // Extract the Base64 data from the content
   const base64Data = file.content.split("base64,")[1];
   if (!base64Data) {
     res.status(400).send("Invalid content format");
     return;
   }
   const decodedContent = Buffer.from(base64Data, 'base64').toString('utf-8');
  

  // Send the file content and the user's question to OpenAI
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: decodedContent
      },
      {
        role: 'user',
        content: userQuestion
      }
    ]
  });
  

  if (response) {
    const responseText = response.data.choices[0].message?.content;
    res.send(responseText);
  } else {
    res.status(500).send("Error querying OpenAI");
  }
}
