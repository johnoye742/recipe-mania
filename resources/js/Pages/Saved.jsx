import Navbar from '@/Components/Navbar'
import Recipie from '@/Components/Recipie'
import Mobile from '@/Layouts/MobileLayout'
import { Head, Link } from '@inertiajs/react'

function Saved({ collection }) {
    return (
        <Mobile page={'collection'}>
            <Head title='Collection'></Head>
            <Navbar></Navbar>

            <main>
                <h1 className='text-3xl'>Saved Recipies</h1>

                { collection.map((item) => <Recipie title={item.title} id={item.id}></Recipie>) && <p>Sorry you have not saved any recipies yet! <Link className='text-yellow-500' href={route('home')}>Browse</Link></p> }
            </main>
        </Mobile>
    )
}

export default Saved
