import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = req.query.id;

    try {
      const data = await prisma.todo.findMany({
        where: {
          userId: String(userId)
        },
        select: {
          id: true,
          description: true,
          userId: true,
        },

      });
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ statusCode: 500, message: error });
    }

  }
  if (req.method === "DELETE") {
    const id = req.query.id

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
      return res
        .status(401)
        .json({ message: 'Auth required' })
    }

    try {
      await prisma.todo.deleteMany({
        where: {
          id: Number(id)
        },
      });
      return res.status(200).json({ message: "Delete Success" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ statusCode: 500, message: error });
    }
  }
  if (req.method === "PUT") {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
      return res
        .status(401)
        .json({ message: 'Auth required' })
    }

    const id = req.query.id
    const { description } = req.body

    try {
      await prisma.todo.update({
        where: { id: Number(id) },
        data: {
          description,
        }
      })
      return res.status(200).json({ message: 'Task Atualizada' })
    } catch (error) {
      console.error(error);

      return res.status(400).json({ statusCode: 400, message: error });
    }
  }

  res.status(200).json({ name: "John Doe" });
}
