// api/getFileContent.ts

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

  const { fileNames } = req.body;

  try {
    const files = await prisma.file.findMany({
      where: {
        filename: { in: fileNames },
      },
    });

    const contentMap: { [key: string]: string } = {};
    files.forEach((file) => {
      contentMap[file.filename] = file.content;
    });

    res.status(200).json(contentMap);
  } catch (error) {
    console.error("Error fetching file content:", error);
    res.status(500).send("Error fetching file content.");
  }
}
