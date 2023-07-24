import Form from '@/components/form'

export default function CadastraPage() {
	return (
		<main className="flex items-center justify-center h-screen">
      <Form
        title="Crie sua conta"
        functionName="Register"
        textButton="Cadastrar"
        textQuestion="Ja tem uma conta ?"
        href="login"
        textResponse="Acesse a sua conta já"
      />
		</main>
	)
}