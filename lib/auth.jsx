import CredentialsProvider  from "@auth/core/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db"
import bcrypto from "bcrypt"

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials:{
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials

        const user = await db.user.findUnique({
          where:{
            email: email
          }
        }) 

        if(!user)
          throw new Error("Email não cadastrado")
        
        const matchPassword = await bcrypto.compare(password, user.password)

        if(!matchPassword)
          throw new Error("Senha incorreta")

        return user
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    newUser: "/register"
  }
}