import Mobile from "@/Layouts/MobileLayout"
import { Head } from "@inertiajs/react"

function RecipiePage({ recipie }) {

    const ingredients = recipie.ingredients.split('\n')
    const steps = recipie.cooking_plan.split('\n')
    console.log(ingredients)

    return (
        <Mobile>
            <Head title="Recipie"></Head>

            <main className="py-8 lg:px-5">
                <img className='h-[20em] object-cover rounded-xl' src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                <h1 className="text-3xl">{recipie.title}</h1>
                <p><span className="font-bold">Description:</span> {recipie.description}</p>
                <p className="font-bold text-lg">Ingredients:</p>
                <ol className=" list-disc">
                    {ingredients.map((ingredient) => <li>{ingredient}</li>)}
                </ol>

                <p className="font-bold text-lg">Steps: </p>
                <ol className=" list-decimal">
                    {steps.map((step) => <li>{step}</li>)}
                </ol>
            </main>
        </Mobile>
    )
}

export default RecipiePage