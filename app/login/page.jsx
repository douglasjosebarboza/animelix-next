import Form from '@/components/form'

export default function EntraPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Form
        title="Entre na sua conta"
        functionName="SignIn"
        textButton="Acessar"
        textQuestion="Não possui um conta ?"
        href="register"
        textResponse="Crie uma já"
      />
    </main>
  )
}
