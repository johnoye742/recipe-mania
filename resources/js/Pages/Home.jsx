import Mobile from '@/Layouts/MobileLayout'
import { Head } from '@inertiajs/react'
import Recipie from '@/Components/Recipie'

function Home({ user, recipies }) {
    return (
        <Mobile page={'home'} user={user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}>
            <Head title="Home"></Head>
            <main className='py-2'>
                <h1 className='text-3xl font-bold'>What recipies are you looking for today?</h1>

                <div className='grid grid-cols-2 py-5'>
                    { recipies.map((recipie) => <Recipie id={recipie.id} title={recipie.title} img={'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}></Recipie>) }
                </div>

            </main>
        </Mobile>
    )
}

export default Home
