import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler2(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {description, userId} = req.body;
    
    try{
      await prisma.todo.create({
        data: {
          description,
          userId
        },
      });

      return res.status(200).json({ message: "Success" });

    } catch (error){
      console.error(error);

      return res.status(500).json({ statusCode: 500, message: error });
    }
  } 
}
