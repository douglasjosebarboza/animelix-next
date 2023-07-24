import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import bcrypto from "bcrypt"

export async function POST(request){
  const data = await request.json()
  const {email, password} = data

  if(!email || !password)
    return NextResponse.json({message:"Dados inválidos", status: 400})

  const isUserExists = await db.user.findUnique({
    where: {
      email: email
    }
  })

  if(isUserExists)
    return NextResponse.json({status: 400})
  
  const hashedPassword = await bcrypto.hash(password, 10)

  const user = await db.user.create({
    data: {
      email: email,
      password: hashedPassword
    }
  })

  return NextResponse.json(user)
}