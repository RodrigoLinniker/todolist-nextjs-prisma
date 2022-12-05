import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import { verifyPassword } from "../../../lib/auth/password";

import { NextApiHandler } from "next";


const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: `${process.env.GITHUB_ID}`,
        clientSecret:`${process.env.GITHUB_SECRET}`
      }),
      GoogleProvider({
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
      }),
      CredentialsProvider({
        id: "app-login",
        name: "App Login",
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials) {
       
          let maybeUser = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              image:true,
            },

          });

          if(!maybeUser){
            throw new Error("Email ou senha não existe");
          }

          if(!maybeUser.password){
            throw new Error("Email ou senha não existe");
          }
          
           const valid = await verifyPassword(
            credentials?.password as string,
            maybeUser.password as string
          ); 

          if(!valid){
            throw new Error("Email ou senha não existe");
          }
          
          return {
            id: maybeUser.id,
            email: maybeUser.email,
            name: maybeUser.name,
            image: maybeUser.image,
          } 
        }
      })
      
    ],

    callbacks: {
      jwt: async ({ user, token}) => {
        if (user) {
          token.uid = user.id 
        }

        return token;
      },
      session: async ({ session, token}) => {
        if (session?.user) {
          session.user.id = token.uid;
        }  
      
        return session;
      }, 
    },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/dashboard",
    error: "/",
  },
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, options);
export default authHandler;

