import Form from "@/components/form" 

export default function EntraPage() {
	return (
		<main className="flex items-center justify-center h-screen">
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