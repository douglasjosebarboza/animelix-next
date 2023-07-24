'use client'

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import Link from 'next/link'
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Form(props) {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmitSignIn = async (data) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    })
    
    if(res.error)
      router.push("/login")
    else
      router.push("/")
  } 
    
  const onSubmitRegister = async (data) => {
    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const response = await request.JSON
    
    if(!request.ok) 
      console.log("Error")
    else
      router.push("/login")

  } 

  const opFunc = props.functionName === "SignIn" ? onSubmitSignIn : onSubmitRegister
  
  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-blue-600 w-1/2 rounded-xl shadow-2xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/logo.png"
          alt="Logo da AnimeLix"
          width={500}
          height={500}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          {props.title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(opFunc)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Digite seu email
            </label>
            <div className="mt-2">
              <Input
                type="email"
                {...register("email", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-visible:outline-pink-600 focus-visible:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Digite sua senha
              </label>
            </div>
            <div className="mt-2">
              <Input
                type="password"
                {...register("password", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-visible:outline-pink-600 focus-visible:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
              {props.textButton}
            </Button>
          </div>
        </form>

        <div>
          <p className="mt-10 text-center text-sm text-gray-300">
            {props.textQuestion}
          </p>
          <p className="text-center">
            <Link href={`/${props.href}`}>
              <button className="font-bold leading-6 text-purple-500 hover:text-pink-600">{props.textResponse}</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}