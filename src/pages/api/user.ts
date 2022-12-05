import type { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../lib/auth/password";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {data} = req.body;

    const userExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        email: true,
      },
    });
    try{

      if(userExist){
        return res.status(400).json({message: 'Email já existe'})
      }

      await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: await hashPassword(data.password) ,
        },
      });

      return res.status(200).json({ message: "Usuário criado" });

    } catch (error){
      console.error(error);

      return res.status(500).json({ statusCode: 500, message: error });
    }
  }
}