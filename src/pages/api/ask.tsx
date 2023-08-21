import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: "", //ADD YOUR API KEY HERE
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

  const fileContent = file.content;

  // Send the file content and the user's question to OpenAI
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: fileContent
      },
      {
        role: 'user',
        content: userQuestion
      }
    ]
  });
  console.log(response);

  if (response) {
    const responseText = response.data.choices[0].message?.content;
    res.send(responseText);
  } else {
    res.status(500).send("Error querying OpenAI");
  }
}
