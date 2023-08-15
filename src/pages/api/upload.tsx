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

  const { filename, content, ownerId } = req.body;

  try {
    await prisma.file.create({
      data: {
        fileId: filename,
        filename,
        content,
        ownerId,
      },
    });

    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
}
