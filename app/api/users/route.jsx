import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import bcrypto from 'bcrypt'

export async function POST(request) {
  const data = await request.json()
  const { email, password } = data

  if (!email || !password)
    return NextResponse.json({ error: 'Dados inválidos', status: 400 })

  const isUserExists = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (isUserExists)
    return NextResponse.json({ status: 400, error: 'Email já cadastrado' })
  else {
    const hashedPassword = await bcrypto.hash(password, 10)

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(user)
  }
}
