import Mobile from "@/Layouts/MobileLayout"
import { Head } from "@inertiajs/react"

function RecipiePage({ recipie }) {
    console.log(recipie)

    const ingredients = recipie.ingredients.split('\n')
    const steps = recipie.cooking_plan.split('\n')
    console.log(ingredients)

    return (
        <Mobile>
            <Head title="Recipie"></Head>

            <main className="py-8 lg:px-5 w-full">
                <img className='h-[20em] lg:h-[30em] w-full object-contain rounded-xl' src={ JSON.parse(recipie.images_url) != null ? JSON.parse(recipie.images_url).urls[0] : 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}></img>
                <h1 className="text-3xl mt-2">{recipie.title}</h1>
                <p><span className="font-bold mb-5">Description:</span> {recipie.description}</p>
                <p className="font-bold text-lg mt-5">Ingredients:</p>
                <ol className=" list-disc">
                    {ingredients.map((ingredient) => <li>{ingredient}</li>)}
                </ol>

                <p className="font-bold text-lg mt-5">Steps: </p>
                <ol className=" list-decimal">
                    {steps.map((step) => <li>{step}</li>)}
                </ol>
            </main>
        </Mobile>
    )
}

export default RecipiePage
